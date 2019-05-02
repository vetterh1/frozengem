import React from "react";
import * as log from 'loglevel';
import stringifyOnce from '../utils/stringifyOnce.js'

const logItemCharacteristicsStore = log.getLogger('logItemCharacteristicsStore');
// loglevelServerSend(logItemCharacteristicsStore); // a setLevel() MUST be run AFTER this!
logItemCharacteristicsStore.setLevel('debug');
logItemCharacteristicsStore.debug('--> entering ItemCharacteristicsStore.jsx');





const defaultCharacteristics = {
    version: 14,    
    categories: [
        {name: 'Bread', label: '', id: 'B'},
        {name: 'Vegetables', label: '', id: 'V'},
        {name: 'Soup', label: '', id: 'S'},
        {name: 'Plat', label: '', id: 'P'},
        {name: 'Meat', label: '', id: 'M'},
        {name: 'Fish', label: '', id: 'F'},
        {name: 'Desert', label: '', id: 'D'},        
        {name: 'Ice cream', label: '', id: 'I'},
    ],
    details:[
        {name: 'Homemade', label: '', id: 'DHOM', parentIds:['all'] },
        {name: 'Cooked', label: '', id: 'DCOO', parentIds:['V', 'S', 'M', 'P', 'F'] },
        {name: 'Raw', label: '', id: 'DRAW', parentIds:['V', 'S', 'M', 'P', 'F'] },
        {name: 'White', label: '', id: 'DWHI', parentIds:['B'] },
        {name: 'Grey', label: '', id: 'DGRE', parentIds:['B']},
        {name: 'Cereal', label: '', id: 'DCER', parentIds:['B']},
        {name: 'Cake', label: '', id: 'DCAK', parentIds:['D']},
        {name: 'Pie', label: '', id: 'DPIE', parentIds:['D']},
        {name: 'Vanilla', label: '', id: 'DVAN', parentIds:['D', 'I']},
        {name: 'Strawberry', label: '', id: 'DSTR', parentIds:['D', 'I']},
        {name: 'Chocolate', label: '', id: 'DCHO', parentIds:['D', 'I']},
        {name: 'Chicken', label: '', id: 'DCHI', parentIds:['S', 'M', 'P']},
        {name: 'Beef', label: '', id: 'DBEE', parentIds:['S', 'M', 'P']},
        {name: 'Pork', label: '', id: 'DPOR', parentIds:['S', 'M', 'P']},
        {name: 'Veal', label: '', id: 'DVEA', parentIds:['M', 'P']},
        {name: 'Fish', label: '', id: 'DFIS', parentIds:['S', 'P']},
        {name: 'Vegetarian', label: '', id: 'DVEG', parentIds:['S', 'P']},
    ],
    containers:[
        {name: 'Plastic box', label: 'ex: Tupperware', id: 'P'},
        {name: 'Aluminium box', label: 'ex: Doggy box', id: 'A'},
        {name: 'Plastic bag', label: 'ex: Ziplog', id: 'B'},
        {name: 'Aluminium foil', label: '', id: 'F'},
    ],  
    colors:[
        {name: 'Transparent', label: '', id: 'T', parentIds:['P'] },
        {name: 'White', label: '', id: 'W', parentIds:['P']},
        {name: 'Blue', label: '', id: 'B', parentIds:['P']},
        {name: 'Green', label: '', id: 'G', parentIds:['P']},
        {name: 'Red', label: '', id: 'R', parentIds:['P']},
        {name: 'Other', label: '', id: 'O', parentIds:['P']},
    ],
    sizes:[
        {name: '1', label: '1 serving', id: '1'},
        {name: '2+', label: '2 to 3 servings', id: '2'},
        {name: '4+', label: '4 to 5 servings', id: '4'},
        {name: '6+', label: '6 or more servings', id: '6'},
    ],  
    freezers:[
        {name: 'Kitchen', label: 'Kitchen freezer', id: 'K'},
        {name: 'Basement', label: 'Basement freezer', id: 'B'},
    ],
    locations:[
        {name: 'Top', label: 'Higher section', id: 'T'},
        {name: 'Middle', label: 'Middle section', id: 'M'},
        {name: 'Bottom', label: 'Lower section', id: 'B'},
    ]
};

export const Context = React.createContext();

export const ActionTypes = {
    // LOAD: "LOAD"
  };
  

const reducer = (state, action) => {
    // if (action.type === ActionTypes.LOAD) {
    //   return { ...state, ...defaultCharacteristics };
    // }
};


export class ItemCharacteristicsStore extends React.Component {
    state = {
        dispatch: action => {
          this.setState(state => reducer(state, action));
        },
        // load: () => this.state.dispatch({ type: ActionTypes.LOAD }),
        load: () => this.load(),
        save: () => this.save()
    };

    componentDidMount() {
        this.state.load();
        // axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
        //   .then(res => {
        //     const posts = res.data.data.children.map(obj => obj.data);
        //     this.setState({ posts });
        //   });
    }
    
    load() {
        // Get from local storage first
        const rawFromCache = localStorage.getItem('ItemCharacteristics');
        let needLocalSave = false;
        let itemCharacteristics = null;
        if(rawFromCache) {
            itemCharacteristics = JSON.parse(rawFromCache);
        }
        
        // if no local storage or older than default values, use default
        if(!rawFromCache || !itemCharacteristics || itemCharacteristics.version < defaultCharacteristics.version) {
            // if no local storage: use default values
            itemCharacteristics = {...defaultCharacteristics};
            // and save them in local storage for next time
            needLocalSave = true;
        }

        // Server query to get the latest
        // should check if version is higher 

        if(needLocalSave) {
            localStorage.setItem('ItemCharacteristics', JSON.stringify(itemCharacteristics));
        }

        this.setState(itemCharacteristics);

        console.log('ItemCharacteristicsStore: itemCharacteristics', stringifyOnce(itemCharacteristics));
    }

    save() {
        // localStorage.setItem('ItemCharacteristics', JSON.stringify(itemCharacteristics));
    }

    render() {
        const { state, props: { children } } = this;
        return <Context.Provider value={state}>{children}</Context.Provider>;
     }
}

export const ItemCharacteristicsConsumer = Context.Consumer;

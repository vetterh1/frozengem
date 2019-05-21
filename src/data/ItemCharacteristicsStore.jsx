import React from "react";
import axios from "axios";
import * as log from 'loglevel';
import config from './config'
// import stringifyOnce from '../utils/stringifyOnce.js'

const logItemCharacteristicsStore = log.getLogger('logItemCharacteristicsStore');
// loglevelServerSend(logItemCharacteristicsStore); // a setLevel() MUST be run AFTER this!
logItemCharacteristicsStore.setLevel('debug');
logItemCharacteristicsStore.debug('--> entering ItemCharacteristicsStore.jsx');




// (!) Should arrive localized from server (!)

const defaultCharacteristics = {
    version: 16,    
    categories: [
        {name: 'Bread', label: '', id2: 'B'},
        {name: 'Vegetables', label: '', id2: 'V'},
        {name: 'Soup', label: '', id2: 'S'},
        {name: 'Plat', label: '', id2: 'P'},
        {name: 'Meat', label: '', id2: 'M'},
        {name: 'Fish', label: '', id2: 'F'},
        {name: 'Desert', label: '', id2: 'D'},        
        {name: 'Ice cream', label: '', id2: 'I'},
    ],
    details:[
        {name: 'Homemade', label: '', id2: 'DHOM', parentIds:['all'] },
        {name: 'Cooked', label: '', id2: 'DCOO', parentIds:['V', 'S', 'M', 'P', 'F'] },
        {name: 'Raw', label: '', id2: 'DRAW', parentIds:['V', 'S', 'M', 'P', 'F'] },
        {name: 'White', label: '', id2: 'DWHI', parentIds:['B'] },
        {name: 'Grey', label: '', id2: 'DGRE', parentIds:['B']},
        {name: 'Cereal', label: '', id2: 'DCER', parentIds:['B']},
        {name: 'Cake', label: '', id2: 'DCAK', parentIds:['D']},
        {name: 'Pie', label: '', id2: 'DPIE', parentIds:['D']},
        {name: 'Vanilla', label: '', id2: 'DVAN', parentIds:['D', 'I']},
        {name: 'Strawberry', label: '', id2: 'DSTR', parentIds:['D', 'I']},
        {name: 'Chocolate', label: '', id2: 'DCHO', parentIds:['D', 'I']},
        {name: 'Chicken', label: '', id2: 'DCHI', parentIds:['S', 'M', 'P']},
        {name: 'Beef', label: '', id2: 'DBEE', parentIds:['S', 'M', 'P']},
        {name: 'Pork', label: '', id2: 'DPOR', parentIds:['S', 'M', 'P']},
        {name: 'Veal', label: '', id2: 'DVEA', parentIds:['M', 'P']},
        {name: 'Fish', label: '', id2: 'DFIS', parentIds:['S', 'P']},
        {name: 'Vegetarian', label: '', id2: 'DVEG', parentIds:['S', 'P']},
    ],
    containers:[
        {name: 'Plastic box', label: 'ex: Tupperware', id2: 'P'},
        {name: 'Aluminium box', label: 'ex: Doggy box', id2: 'A'},
        {name: 'Plastic bag', label: 'ex: Ziplog', id2: 'B'},
        {name: 'Aluminium foil', label: '', id2: 'F'},
    ],  
    colors:[
        {name: 'Transparent', label: '', id2: 'T', parentIds:['P'] },
        {name: 'White', label: '', id2: 'W', parentIds:['P']},
        {name: 'Blue', label: '', id2: 'B', parentIds:['P']},
        {name: 'Green', label: '', id2: 'G', parentIds:['P']},
        {name: 'Red', label: '', id2: 'R', parentIds:['P']},
        {name: 'Other', label: '', id2: 'O', parentIds:['P']},
    ],
    sizes:[
        {name: '1', label: '1 serving', id2: '1'},
        {name: '2+', label: '2 to 3 servings', id2: '2'},
        {name: '4+', label: '4 to 5 servings', id2: '4'},
        {name: '6+', label: '6 or more servings', id2: '6'},
    ],  
    freezers:[
        {name: 'Kitchen', label: 'Kitchen freezer', id2: 'K'},
        {name: 'Basement', label: 'Basement freezer', id2: 'B'},
    ],
    locations:[
        {name: 'Top', label: 'Higher section', id2: 'T'},
        {name: 'Middle', label: 'Middle section', id2: 'M'},
        {name: 'Bottom', label: 'Lower section', id2: 'B'},
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


    getServerData() {
        const boUrl = config.boUrl;
        axios.get(`${boUrl}/characteristics`, { crossdomain: true })
        .then(res => {
            console.log("characteristics version loaded from server:", res.data.version)
            if(res.data && res.data.version > this.state.version) {
                console.log("use server version!")
                // server version is more recent: use it!
                const itemCharacteristics = {...res.data};
                this.setState(itemCharacteristics);
                // and save them in local storage for next time
                localStorage.setItem('ItemCharacteristics', JSON.stringify(itemCharacteristics));
            } else {
                console.log("don't use server version!")
            }              
        })
        .catch( (error) => {
            console.log("Error while retreiving characteristics from server: ", error);
        })
    }

    componentDidMount() {
        this.state.load();
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

        if(needLocalSave) {
            localStorage.setItem('ItemCharacteristics', JSON.stringify(itemCharacteristics));
        }

        this.setState(itemCharacteristics, this.getServerData);

        // console.log('ItemCharacteristicsStore: itemCharacteristics=', stringifyOnce(itemCharacteristics));
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

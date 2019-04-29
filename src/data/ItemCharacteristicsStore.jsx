import React from "react";


const defaultCharacteristics = {
    version: 4,    
    categories: [
        {name: 'Bread', label: '', code: 'B'},
        {name: 'Vegetables', label: '', code: 'V'},
        {name: 'Soup', label: '', code: 'S'},
        {name: 'Meat', label: '', code: 'M'},
    ],
    details:[
        {name: 'White', label: '', code: 'BW'},
        {name: 'Grey', label: '', code: 'BG'},
        {name: 'Cereal', label: '', code: 'BC'},
    ],
    containers:[
        {name: 'Plastic box', label: 'ex: Tupperware', code: 'P'},
        {name: 'Aluminium box', label: 'ex: Doggy box', code: 'A'},
        {name: 'Plastic bag', label: 'ex: Ziplog', code: 'B'},
        {name: 'Aluminium foil', label: '', code: 'F'},
    ],  
    colors:[
        {name: 'Transparent', label: '', code: 'T'},
        {name: 'White', label: '', code: 'W'},
        {name: 'Blue', label: '', code: 'B'},
        {name: 'Green', label: '', code: 'G'},
        {name: 'Red', label: '', code: 'R'},
        {name: 'Other', label: '', code: 'O'},
    ],
    locations:[
        {name: 'Top', label: 'Higher section', code: 'T'},
        {name: 'Middle', label: 'Middle section', code: 'M'},
        {name: 'Bottom', label: 'Lower section', code: 'B'},
    ],  
    freezers:[
        {name: 'Kitchen', label: 'Kitchen freezer', code: 'K'},
        {name: 'Basement', label: 'Basement freezer', code: 'B'},
    ],
    sizes:[
        {name: '1', label: '1 portion', code: '1'},
        {name: '2 / 3', label: '2 to 3 portions', code: '2'},
        {name: '4 / 5', label: '4 to 5 portions', code: '4'},
        {name: '6+', label: '6 or more', code: '6'},
    ]        
};

const Context = React.createContext();

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

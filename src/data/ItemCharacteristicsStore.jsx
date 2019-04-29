import React from "react";


const defaultCharacteristics = {
    version: 5,    
    categories: [
        {name: 'Bread', label: '', id: 'B'},
        {name: 'Vegetables', label: '', id: 'V'},
        {name: 'Soup', label: '', id: 'S'},
        {name: 'Meat', label: '', id: 'M'},
    ],
    details:[
        {name: 'White', label: '', id: 'BW'},
        {name: 'Grey', label: '', id: 'BG'},
        {name: 'Cereal', label: '', id: 'BC'},
    ],
    containers:[
        {name: 'Plastic box', label: 'ex: Tupperware', id: 'P'},
        {name: 'Aluminium box', label: 'ex: Doggy box', id: 'A'},
        {name: 'Plastic bag', label: 'ex: Ziplog', id: 'B'},
        {name: 'Aluminium foil', label: '', id: 'F'},
    ],  
    colors:[
        {name: 'Transparent', label: '', id: 'T'},
        {name: 'White', label: '', id: 'W'},
        {name: 'Blue', label: '', id: 'B'},
        {name: 'Green', label: '', id: 'G'},
        {name: 'Red', label: '', id: 'R'},
        {name: 'Other', label: '', id: 'O'},
    ],
    locations:[
        {name: 'Top', label: 'Higher section', id: 'T'},
        {name: 'Middle', label: 'Middle section', id: 'M'},
        {name: 'Bottom', label: 'Lower section', id: 'B'},
    ],  
    freezers:[
        {name: 'Kitchen', label: 'Kitchen freezer', id: 'K'},
        {name: 'Basement', label: 'Basement freezer', id: 'B'},
    ],
    sizes:[
        {name: '1', label: '1 portion', id: '1'},
        {name: '2 / 3', label: '2 to 3 portions', id: '2'},
        {name: '4 / 5', label: '4 to 5 portions', id: '4'},
        {name: '6+', label: '6 or more', id: '6'},
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

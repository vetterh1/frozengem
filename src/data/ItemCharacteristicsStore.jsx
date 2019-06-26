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
    version: 19,    
    categories: [
      {name: 'Bread', i18nName: {FR: 'Pain'}, label: '', i18nLabel: {FR: ''}, id2: 'B', expiration: '1', expirationMinusPlus:{} },
      {name: 'Vegetables', i18nName: {FR: 'Légumes'}, label: '', i18nLabel: {FR: ''}, id2: 'V', expiration: '12', expirationMinusPlus:{DRAW: '-6'}},
      {name: 'Fruits', i18nName: {FR: 'Fruits'}, label: '', i18nLabel: {FR: ''}, id2: 'F', expiration: '12', expirationMinusPlus:{DRAW: '-6'}},
      {name: 'Soup', i18nName: {FR: 'Soupe'}, label: '', i18nLabel: {FR: ''}, id2: 'S', expiration: '3', expirationMinusPlus:{}},
      {name: 'Dish', i18nName: {FR: 'Plat'}, label: '', i18nLabel: {FR: ''}, id2: 'P', expiration: '3', expirationMinusPlus:{}},
      {name: 'Meat', i18nName: {FR: 'Viande'}, label: '', i18nLabel: {FR: ''}, id2: 'M', expiration: '1', expirationMinusPlus:{DCOO: '+3', DPOU: '+2', DPOR: '+2', DBEE: '+4'}},
      {name: 'Fish', i18nName: {FR: 'Poisson'}, label: '', i18nLabel: {FR: ''}, id2: 'H', expiration: '2', expirationMinusPlus:{}},
      {name: 'Desert', i18nName: {FR: 'Dessert'}, label: '', i18nLabel: {FR: ''}, id2: 'D', expiration: '2', expirationMinusPlus:{}},
      {name: 'Ice cream', i18nName: {FR: 'Glace'}, label: '', i18nLabel: {FR: ''}, id2: 'I', expiration: '4', expirationMinusPlus:{}},
    ],
    details:[
      {name: 'Homemade', i18nName: {FR: 'Fait maison'}, label: '', i18nLabel: {FR: ''}, id2: 'DHOM', parents:['all'] },
      {name: 'Cooked', i18nName: {FR: 'Cuit'}, label: '', i18nLabel: {FR: ''}, id2: 'DCOO', parents:['V', 'S', 'M', 'P', 'H', 'F'] },
      {name: 'Raw', i18nName: {FR: 'Cru'}, label: '', i18nLabel: {FR: ''}, id2: 'DRAW', parents:['V', 'S', 'M', 'P', 'H', 'F'] },
      {name: 'White', i18nName: {FR: 'Blanc'}, label: '', i18nLabel: {FR: ''}, id2: 'DWHI', parents:['B'] },
      {name: 'Grey', i18nName: {FR: 'Gris'}, label: '', i18nLabel: {FR: ''}, id2: 'DGRE', parents:['B']},
      {name: 'Cereal', i18nName: {FR: 'Céréales'}, label: '', i18nLabel: {FR: ''}, id2: 'DCER', parents:['B']},
      {name: 'Cake', i18nName: {FR: 'Gateau'}, label: '', i18nLabel: {FR: ''}, id2: 'DCAK', parents:['D']},
      {name: 'Pie', i18nName: {FR: 'Tarte'}, label: '', i18nLabel: {FR: ''}, id2: 'DPIE', parents:['D']},
      {name: 'Vanilla', i18nName: {FR: 'Vanille'}, label: '', i18nLabel: {FR: ''}, id2: 'DVAN', parents:['D', 'I']},
      {name: 'Strawberry', i18nName: {FR: 'Fraise'}, label: '', i18nLabel: {FR: ''}, id2: 'DSTR', parents:['D', 'I']},
      {name: 'Chocolate', i18nName: {FR: 'Chocolat'}, label: '', i18nLabel: {FR: ''}, id2: 'DCHO', parents:['D', 'I']},
      {name: 'Poultry', i18nName: {FR: 'Volaille'}, label: '', i18nLabel: {FR: ''}, id2: 'DPOU', parents:['S', 'M', 'P']},
      {name: 'Beef', i18nName: {FR: 'Beuf'}, label: '', i18nLabel: {FR: ''}, id2: 'DBEE', parents:['S', 'M', 'P']},
      {name: 'Pork', i18nName: {FR: 'Porc'}, label: '', i18nLabel: {FR: ''}, id2: 'DPOR', parents:['S', 'M', 'P']},
      {name: 'Veal', i18nName: {FR: 'Veau'}, label: '', i18nLabel: {FR: ''}, id2: 'DVEA', parents:['M', 'P']},
      {name: 'Fish', i18nName: {FR: 'Poisson'}, label: '', i18nLabel: {FR: ''}, id2: 'DFIS', parents:['S', 'P']},
      {name: 'Vegetarian', i18nName: {FR: 'Végétarien'}, label: '', i18nLabel: {FR: ''}, id2: 'DVEG', parents:['S', 'P']},
    ],
    containers:[
        {name: 'Plastic box', i18nName: {FR: 'Boîte en plastique'}, label: 'ex: Tupperware', i18nLabel: {FR: 'ex: Tupperware'}, id2: 'P'},
        {name: 'Aluminium box', i18nName: {FR: 'Boîte en aluminium'}, label: 'ex: Doggy box', i18nLabel: {FR: 'ex: Boîte de restaurant'}, id2: 'A'},
        {name: 'Plastic bag', i18nName: {FR: 'Sac de congélation'}, label: 'ex: Ziplog', i18nLabel: {FR: 'ex: Ziplog'}, id2: 'B'},
        {name: 'Aluminium foil', i18nName: {FR: 'Papier Aluminium'}, label: '', i18nLabel: {FR: ''}, id2: 'F'},
    ],  
    colors:[
        {name: 'Transparent', i18nName: {FR: 'Transparent'}, label: '', i18nLabel: {FR: ''}, id2: 'T', parents:['P'] },
        {name: 'White', i18nName: {FR: 'Blanc'}, label: '', i18nLabel: {FR: ''}, id2: 'W', parents:['P']},
        {name: 'Blue', i18nName: {FR: 'Bleu'}, label: '', i18nLabel: {FR: ''}, id2: 'B', parents:['P']},
        {name: 'Green', i18nName: {FR: 'Vert'}, label: '', i18nLabel: {FR: ''}, id2: 'G', parents:['P']},
        {name: 'Red', i18nName: {FR: 'Rouge'}, label: '', i18nLabel: {FR: ''}, id2: 'R', parents:['P']},
        {name: 'Other', i18nName: {FR: 'Autre'}, label: '', i18nLabel: {FR: ''}, id2: 'O', parents:['P']},
    ],
    sizes:[
        {name: '1', i18nName: {FR: '1'}, label: '1 serving', i18nLabel: {FR: '1 portion'}, id2: '1'},
        {name: '2+', i18nName: {FR: '2+'}, label: '2 to 3 servings', i18nLabel: {FR: '2 à 3 portions'}, id2: '2'},
        {name: '4+', i18nName: {FR: '4+'}, label: '4 to 5 servings', i18nLabel: {FR: '4 à 5 portions'}, id2: '4'},
        {name: '6+', i18nName: {FR: '6+'}, label: '6 or more servings', i18nLabel: {FR: '6 portions ou plus'}, id2: '6'},
    ],  
    freezers:[
        {name: 'Kitchen', i18nName: {FR: 'Cuisine'}, label: 'Kitchen freezer', i18nLabel: {FR: 'Congélateur dans la cuisine'}, id2: 'K'},
        {name: 'Basement', i18nName: {FR: 'Cave'}, label: 'Basement freezer', i18nLabel: {FR: 'Congélateur à la cave'}, id2: 'B'},
        {name: 'Other', i18nName: {FR: 'Autre'}, label: 'Other location freezer', i18nLabel: {FR: 'Congélateur à un autre endroit'}, id2: 'O'},
    ],
    locations:[
        {name: 'Top', i18nName: {FR: 'Haut'}, label: 'Higher section', i18nLabel: {FR: 'Partie supérieure'}, id2: 'T'},
        {name: 'Middle', i18nName: {FR: 'Milieu'}, label: 'Middle section', i18nLabel: {FR: 'Partie centrale'}, id2: 'M'},
        {name: 'Bottom', i18nName: {FR: 'Bas'}, label: 'Lower section', i18nLabel: {FR: 'Partie inférieure'}, id2: 'B'},
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
            // console.log("characteristics version loaded from server:", res.data.version)
            if(res.data && res.data.version > this.state.version) {
                // console.log("use server version!")
                // server version is more recent: use it!
                const itemCharacteristics = {...res.data};
                this.setState(itemCharacteristics);
                // and save them in local storage for next time
                localStorage.setItem('ItemCharacteristics', JSON.stringify(itemCharacteristics));
            } else {
                // console.log("don't use server version!")
            }              
        })
        .catch( (error) => {
            console.error("Error while retreiving characteristics from server: ", error);
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

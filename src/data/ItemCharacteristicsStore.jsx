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
    version: 25,    
    categories: [
      {name: {en: 'Bread', fr: 'Pain'}, label: {en: '', fr: ''}, id2: 'B', expiration: '1', expirationMinusPlus:{} },
      {name: {en: 'Vegetables', fr: 'Légumes'}, label: {en: '', fr: ''}, id2: 'V', expiration: '12', expirationMinusPlus:{DRAW: '-6'}},
      {name: {en: 'Fruits', fr: 'Fruits'}, label: {en: '', fr: ''}, id2: 'F', expiration: '12', expirationMinusPlus:{DRAW: '-6'}},
      {name: {en: 'Soup', fr: 'Soupe'}, label: {en: '', fr: ''}, id2: 'S', expiration: '3', expirationMinusPlus:{}},
      {name: {en: 'Dish', fr: 'Plat'}, label: {en: '', fr: ''}, id2: 'P', expiration: '3', expirationMinusPlus:{}},
      {name: {en: 'Meat', fr: 'Viande'}, label: {en: '', fr: ''}, id2: 'M', expiration: '1', expirationMinusPlus:{DCOO: '+3', DPOU: '+2', DPOR: '+2', DBEE: '+4'}},
      {name: {en: 'Fish', fr: 'Poisson'}, label: {en: '', fr: ''}, id2: 'H', expiration: '2', expirationMinusPlus:{}},
      {name: {en: 'Desert', fr: 'Dessert'}, label: {en: '', fr: ''}, id2: 'D', expiration: '2', expirationMinusPlus:{}},
      {name: {en: 'Ice cream', fr: 'Glace'}, label: {en: '', fr: ''}, id2: 'I', expiration: '4', expirationMinusPlus:{}},
    ],
    details:[
      {name: {en: 'Homemade', fr: 'Fait maison'}, label: {en: '', fr: ''}, id2: 'DHOM', parents:['all'] },
      {name: {en: 'Cooked', fr: 'Cuit'}, label: {en: '', fr: ''}, id2: 'DCOO', parents:['V', 'S', 'M', 'P', 'H', 'F'] },
      {name: {en: 'Raw', fr: 'Cru'}, label: {en: '', fr: ''}, id2: 'DRAW', parents:['V', 'S', 'M', 'P', 'H', 'F'] },
      {name: {en: 'White', fr: 'Blanc'}, label: {en: '', fr: ''}, id2: 'DWHI', parents:['B'] },
      {name: {en: 'Grey', fr: 'Gris'}, label: {en: '', fr: ''}, id2: 'DGRE', parents:['B']},
      {name: {en: 'Cereal', fr: 'Céréales'}, label: {en: '', fr: ''}, id2: 'DCER', parents:['B']},
      {name: {en: 'Cake', fr: 'Gateau'}, label: {en: '', fr: ''}, id2: 'DCAK', parents:['D']},
      {name: {en: 'Pie', fr: 'Tarte'}, label: {en: '', fr: ''}, id2: 'DPIE', parents:['D']},
      {name: {en: 'Vanilla', fr: 'Vanille'}, label: {en: '', fr: ''}, id2: 'DVAN', parents:['D', 'I']},
      {name: {en: 'Strawberry', fr: 'Fraise'}, label: {en: '', fr: ''}, id2: 'DSTR', parents:['D', 'I']},
      {name: {en: 'Chocolate', fr: 'Chocolat'}, label: {en: '', fr: ''}, id2: 'DCHO', parents:['D', 'I']},
      {name: {en: 'Poultry', fr: 'Volaille'}, label: {en: '', fr: ''}, id2: 'DPOU', parents:['S', 'M', 'P']},
      {name: {en: 'Beef', fr: 'Beuf'}, label: {en: '', fr: ''}, id2: 'DBEE', parents:['S', 'M', 'P']},
      {name: {en: 'Pork', fr: 'Porc'}, label: {en: '', fr: ''}, id2: 'DPOR', parents:['S', 'M', 'P']},
      {name: {en: 'Veal', fr: 'Veau'}, label: {en: '', fr: ''}, id2: 'DVEA', parents:['M', 'P']},
      {name: {en: 'Fish', fr: 'Poisson'}, label: {en: '', fr: ''}, id2: 'DFIS', parents:['S', 'P']},
      {name: {en: 'Vegetarian', fr: 'Végétarien'}, label: {en: '', fr: ''}, id2: 'DVEG', parents:['S', 'P']},
    ],
    containers:[
        {name: {en: 'Plastic box', fr: 'Boîte en plastique'}, label: {en: 'ex: Tupperware', fr: 'ex: Tupperware'}, id2: 'P'},
        {name: {en: 'Aluminium box', fr: 'Boîte en aluminium'}, label: {en: 'ex: Doggy box', fr: 'ex: Boîte de restaurant'}, id2: 'A'},
        {name: {en: 'Plastic bag', fr: 'Sac de congélation'}, label: {en: 'ex: Ziplog', fr: 'ex: Ziplog'}, id2: 'B'},
        {name: {en: 'Paper bag', fr: 'Sac en papier'}, label: {en: 'ex: bread bag', fr: 'ex: Sachet de pain'}, id2: 'S'},
        {name: {en: 'Aluminium foil', fr: 'Papier Aluminium'}, label: {en: '', fr: ''}, id2: 'F'},
    ],  
    colors:[
        {name: {en: 'Transparent', fr: 'Transparent'}, label: {en: '', fr: ''}, id2: 'T', parents:['P'] },
        {name: {en: 'White', fr: 'Blanc'}, label: {en: '', fr: ''}, id2: 'W', parents:['P', 'S']},
        {name: {en: 'Blue', fr: 'Bleu'}, label: {en: '', fr: ''}, id2: 'B', parents:['P']},
        {name: {en: 'Green', fr: 'Vert'}, label: {en: '', fr: ''}, id2: 'G', parents:['P']},
        {name: {en: 'Red', fr: 'Rouge'}, label: {en: '', fr: ''}, id2: 'R', parents:['P']},
        {name: {en: 'Brown', fr: 'Brun'}, label: {en: '', fr: ''}, id2: 'N', parents:['P', 'S']},
        {name: {en: 'Other', fr: 'Autre'}, label: {en: '', fr: ''}, id2: 'O', parents:['P', 'S']},
    ],
    sizes:[
        {name: {en: '1', fr: '1'}, label: {en: '1 serving', fr: '1 portion'}, id2: '1'},
        {name: {en: '+2', fr: '2+'}, label: {en: '2 to 3 servings', fr: '2 à 3 portions'}, id2: '2'},
        {name: {en: '+4', fr: '4+'}, label: {en: '4 to 5 servings', fr: '4 à 5 portions'}, id2: '4'},
        {name: {en: '+6', fr: '6+'}, label: {en: '6 or more servings', fr: '6 portions ou plus'}, id2: '6'},
    ],  
    freezers:[
        {name: {en: 'Kitchen', fr: 'Cuisine'}, label: {en: 'Kitchen freezer', fr: 'Congélateur dans la cuisine'}, id2: 'K'},
        {name: {en: 'Basement', fr: 'Cave'}, label: {en: 'Basement freezer', fr: 'Congélateur à la cave'}, id2: 'B'},
        {name: {en: 'Other', fr: 'Autre'}, label: {en: 'Other freezer location', fr: 'Congélateur à un autre endroit'}, id2: 'O'},
    ],
    locations:[
        {name: {en: 'Top', fr: 'Haut'}, label: {en: 'Higher section', fr: 'Partie supérieure'}, id2: 'T'},
        {name: {en: 'Middle', fr: 'Milieu'}, label: {en: 'Middle section', fr: 'Partie centrale'}, id2: 'M'},
        {name: {en: 'Bottom', fr: 'Bas'}, label: {en: 'Lower section', fr: 'Partie inférieure'}, id2: 'B'},
    ]
};

export const Context = React.createContext();


export class ItemCharacteristicsStore extends React.Component {
    state = {
        itemCharacteristics: null,
        load: () => this.load(),
        getCategoryName: (category, language) => this.getCategoryName(category, language),
        getSizeLabel: (size, language) => this.getSizeLabel(size, language),
        getDetailsNamesArray: (detailsArray, language) => this.getDetailsNamesArray(detailsArray, language),
        computeExpiration: (category, details) => this.computeExpiration(category, details),
        computeExpirationLevel: (date) => this.computeExpirationLevel(date),
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


    getCategoryName(category, language) {
        // Get the categories. They contain the name information
        const { categories } = this.state;
        const foundCategory = categories.find(aCategory => aCategory.id2 === category);
        if(foundCategory)
            return foundCategory.name[language];
        else
            return null;
    }

    getSizeLabel(size, language) {
        // Get the sizes. They contain the label information
        const { sizes } = this.state;
        const sizeInString = size.toString();
        const foundSize = sizes.find(aSize => aSize.id2 === sizeInString);
        if(foundSize)
            return foundSize.label[language];
        else
            return null;
    }

    getDetailsNamesArray(detailsArray, language) {
        if(!detailsArray) return null;
        // Get the details. They contain the label information
        const { details } = this.state;
        return detailsArray.map(aPassedDetail => {
            const foundDetail = details.find(aDetail => aDetail.id2 === aPassedDetail)
            if(foundDetail)
                return foundDetail.name[language];
            else
                return null;
        })
       
    }


    computeExpiration(category, details) {
        console.log('computeExpiration: category=', category, " - details=", details);
        console.log('computeExpiration: this.state=', this.state);
        if(!category || !details) return null;

        // Get the categories. They contain the expiration information
        const { categories } = this.state;

        // Find the expiration & expiration exceptions for this category
        const aCategory = categories.find(aCategory => aCategory.id2 === category);
        const {expiration, expirationMinusPlus} = aCategory;
        console.log('computeExpiration: expiration=', expiration, " - expirationMinusPlus=", expirationMinusPlus);

        // Find the expiration by taking the category expiration value
        // then + or - the exceptions
        let expirationInMonth = parseInt(expiration);
        details.forEach(detail => {
        const variation = expirationMinusPlus[detail];
        console.log('computeExpiration: variation=', variation);

        if(variation) {
            const intVariation = parseInt(variation);
            expirationInMonth += intVariation
            console.log('computeExpiration: intVariation=', intVariation, " - expirationInMonth=", expirationInMonth);
        }
        });

        console.log("computeExpiration: resulting expirationInMonth=" + expirationInMonth);
        return expirationInMonth;
    }



    computeExpirationLevel(date) {
        const nowInMs = Date.now();
        const oneMonthInMs = 1 * 30 * 24 * 60 * 60 * 1000;
        if( date < nowInMs ) return ExpirationLevel.EXPIRATION_PASSED;
        if( date < nowInMs + 1 * oneMonthInMs ) return ExpirationLevel.EXPIRATION_NEXT_30_DAYS;
        if( date < nowInMs + 3 * oneMonthInMs ) return ExpirationLevel.EXPIRATION_WITHIN_3_MONTHS;
        return ExpirationLevel.EXPIRATION_LATER;
    }



    render() {
        const { state, props: { children } } = this;
        return <Context.Provider value={state}>{children}</Context.Provider>;
     }
}

export const ItemCharacteristicsConsumer = Context.Consumer;


export const ExpirationLevel = {
    EXPIRATION_PASSED: 0,
    EXPIRATION_NEXT_30_DAYS: 1,
    EXPIRATION_WITHIN_3_MONTHS: 2,
    EXPIRATION_LATER: 3,
};

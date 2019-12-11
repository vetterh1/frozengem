import * as ACTIONS from "../_constants/action-types";


const initialState = { // define initial state - an empty items list
  shouldUpdate: true,
  isFetching: false,
  isSaving: false,
  isUpdating: false,
  isDeleting: false,
  isValid: false,
  error: null,

  version: 35,    
  categories: [
    {name: {en: 'Bread', fr: 'Pain'}, label: {en: '', fr: ''}, id2: 'B', expiration: '1', expirationMinusPlus:{} },
    {name: {en: 'Vegetables', fr: 'Légumes'}, label: {en: '', fr: ''}, id2: 'V',  expiration: '12', expirationMinusPlus:{DRAW: '-6'}},
    {name: {en: 'Cheese', fr: 'Fromage'}, label: {en: '', fr: ''}, id2: 'R',  expiration: '12', expirationMinusPlus:{DRAW: '-6'}},
    {name: {en: 'Fruits', fr: 'Fruits'}, label: {en: '', fr: ''}, id2: 'F', expiration: '12', expirationMinusPlus:{DRAW: '-6'}},
    {name: {en: 'Soup', fr: 'Soupe'}, label: {en: '', fr: ''}, id2: 'S', expiration: '3', expirationMinusPlus:{}},
    {name: {en: 'Dish', fr: 'Plat'}, label: {en: '', fr: ''}, id2: 'P',  expiration: '3', expirationMinusPlus:{}},
    {name: {en: 'Meat', fr: 'Viande'}, label: {en: '', fr: ''}, id2: 'M', expiration: '1', expirationMinusPlus:{DCOO: '+3', DPOU: '+2', DPOR: '+2', DBEE: '+4'}},
    {name: {en: 'Fish', fr: 'Poisson'}, label: {en: '', fr: ''}, id2: 'H',  expiration: '2', expirationMinusPlus:{}},
    {name: {en: 'Dessert', fr: 'Dessert'}, label: {en: '', fr: ''}, id2: 'D', expiration: '2', expirationMinusPlus:{}},
    {name: {en: 'Ice cream', fr: 'Glace'}, label: {en: '', fr: ''}, id2: 'I', expiration: '4', expirationMinusPlus:{}},
  ],
  details:[
    {name: {en: 'Homemade', fr: 'Fait maison'}, label: {en: '', fr: ''}, id2: 'DHOM', parents:['all'] },
    {name: {en: 'Commercial product', fr: 'Produit commercial'}, label: {en: '', fr: ''}, id2: 'DCOM', parents:['all'] },
    {name: {en: 'Cooked', fr: 'Cuit'}, label: {en: '', fr: ''}, id2: 'DCOO', parents:['V', 'S', 'M', 'P', 'H', 'F'] },
    {name: {en: 'Raw', fr: 'Cru'}, label: {en: '', fr: ''}, id2: 'DRAW', parents:['R', 'V', 'S', 'M', 'P', 'H', 'F'] },
    {name: {en: 'Organic', fr: 'Bio'}, label: {en: '', fr: ''}, id2: 'DBIO', parents:['all'] },
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
    {name: {en: 'Vegan', fr: 'Végétalien'}, label: {en: '', fr: ''}, id2: 'DVEN', parents:['S', 'P', 'D', 'I']},
    {name: {en: 'Gluten free', fr: 'Sans gluten'}, label: {en: '', fr: ''}, id2: 'DGLU', parents:['B', 'S', 'P', 'D', 'I']},
    {name: {en: 'Dairy free', fr: 'Sans produits laitiers'}, label: {en: '', fr: ''}, id2: 'DDAI', parents:['S', 'P', 'D', 'I']},
    {name: {en: 'Egg free', fr: 'Sans oeufs'}, label: {en: '', fr: ''}, id2: 'DEGG', parents:['S', 'P', 'D', 'I']},
    {name: {en: 'Nut free', fr: 'Sans noix / fruits à coque'}, label: {en: '', fr: ''}, id2: 'DNUT', parents:['S', 'P', 'D', 'I']},
  ],
  containers:[
      {name: {en: 'Commercial box', fr: 'Emballage commercial'}, label: {en: 'ex: Picard', fr: 'ex: Picard'}, id2: 'C'},
      {name: {en: 'Plastic box', fr: 'Boîte en plastique'}, label: {en: 'ex: Tupperware', fr: 'ex: Tupperware'}, id2: 'P'},
      {name: {en: 'Aluminium box', fr: 'Boîte en aluminium'}, label: {en: 'ex: Doggy box', fr: 'ex: Boîte de restaurant'}, id2: 'A'},
      {name: {en: 'Plastic bag', fr: 'Sac de congélation'}, label: {en: 'ex: Ziplog', fr: 'ex: Ziplog'}, id2: 'B'},
      {name: {en: 'Paper bag', fr: 'Sac en papier'}, label: {en: 'ex: bread bag', fr: 'ex: Sachet de pain'}, id2: 'S'},
      {name: {en: 'Aluminium foil', fr: 'Papier Aluminium'}, label: {en: '', fr: ''}, id2: 'F'},
  ],  
  colors:[
      {name: {en: 'Transparent', fr: 'Transparent'}, label: {en: '', fr: ''}, id2: 'T', parents:['P', 'C'] },
      {name: {en: 'White', fr: 'Blanc'}, label: {en: '', fr: ''}, id2: 'W', parents:['P', 'C', 'S']},
      {name: {en: 'Blue', fr: 'Bleu'}, label: {en: '', fr: ''}, id2: 'B', parents:['P', 'C']},
      {name: {en: 'Green', fr: 'Vert'}, label: {en: '', fr: ''}, id2: 'G', parents:['P', 'C']},
      {name: {en: 'Red', fr: 'Rouge'}, label: {en: '', fr: ''}, id2: 'R', parents:['P', 'C']},
      {name: {en: 'Brown', fr: 'Brun'}, label: {en: '', fr: ''}, id2: 'N', parents:['P', 'C', 'S']},
      {name: {en: 'Other', fr: 'Autre'}, label: {en: '', fr: ''}, id2: 'O', parents:['P', 'C', 'S']},
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


export function characteristics(state = initialState, action) {
  switch (action.type) {

  //
  // Fetch characteristics from Server & local storage to Redux store (in Action)
  //

  case ACTIONS.FETCH_CHARACTERISTICS_REQUEST:
    return {
      ...state,
      shouldUpdate: false,
      isFetching: true, 
      isValid: false,
      error: null,
    };

  case ACTIONS.FETCH_CHARACTERISTICS_SUCCESS:
      return {
        shouldUpdate: false,
        isFetching: false,
        isValid: true,
        error: null,
        ...action.characteristics
      };

  // Cancel if characteristics version on server / local storage <= default characteristics
  case ACTIONS.FETCH_CHARACTERISTICS_CANCELLED:
      return {
        ...state,
        shouldUpdate: false,
        isFetching: false,
        isValid: true,
        error: null,
      };
      
  case ACTIONS.FETCH_CHARACTERISTICS_FAILURE:
    return {
      shouldUpdate: false,
      isFetching: false,
      isValid: false,
      error: action.error,
    };

  default: return state;
  }
};
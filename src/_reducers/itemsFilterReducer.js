import * as ACTIONS from "_constants/action-types";

const initialState = { // define initial state - an empty items list
  filter: 'all',
};

export function itemsFilter (state = initialState, action) {
  switch (action.type) {
    
    case ACTIONS.FILTER_ITEMS:
      return {
        ...state,
        filter: action.filter
      };
  
    default: return state;
  }
};
import { ADD_ITEM } from "../constants/action-types";


const initialState = {
    items: []
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === ADD_ITEM) {
        return {...state, items: state.items.concat(action.payload)};
    }
    return state;
  };
  
  export default rootReducer;
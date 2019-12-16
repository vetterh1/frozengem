import * as ACTIONS from "../_constants/action-types";

const initialState = { // define initial state - an empty items list
  list: [],
  shouldUpdate: true,
  isFetching: false,
  isSaving: false,
  isUpdating: false,
  isDeleting: false,
  isValid: false,
  error: null,
};

export function items (state = initialState, action) {
  switch (action.type) {

  //
  // Add items
  //

  case ACTIONS.FETCH_ITEMS_REQUEST:
    return {
      list:[],
      shouldUpdate: false,
      isFetching: true, 
      isValid: false,
      error: null
    };

  case ACTIONS.FETCH_ITEMS_SUCCESS:
    return {
      list: action.items,
      shouldUpdate: false,
      isFetching: false,
      isValid: true,
      error: null,
    };
      
  case ACTIONS.FETCH_ITEMS_FAILURE:
    return {
      list: [],
      shouldUpdate: false,
      isFetching: false,
      isValid: false,
      error: action.error,
    };

  
    
  //
  // Add or update an item in the store
  //

  case ACTIONS.ADD_OR_UPDATE_ITEM_REQUEST: 
    return {
      ...state,
      isUpdating: true,
      error: null,
    };  

  case ACTIONS.ADD_OR_UPDATE_ITEM_SUCCESS: 
    let newItems = [];
    const foundIndex = state.list.findIndex(item => item.id === action.item.id);
    if(foundIndex >= 0)
      newItems = state.list.map(item => (item.id === action.item.id) ? action.item : item);
    else
      newItems = [...state.list, action.item];
    const newState = { ...state, isUpdating: false, error: null, list: newItems };
    // console.log('items (ADD_OR_UPDATE_ITEM_SUCCESS) - ',  action.item.id, foundIndex, newState);
    return newState;

  case ACTIONS.ADD_OR_UPDATE_ITEM_FAILURE: 
    return {
      ...state,
      isUpdating: false,
      error: action.error,
    };  

  // //
  // // Save item to Server (in Action) and update Redux store with new item (in Reducer)
  // //

  // case REQUEST_SAVE_ITEM: return Object.assign({}, state, { isSaving: true, error: null });
  // case SAVE_ITEM_OK: {
  //   // Add the new item to the redux store so we don't need to reload from server to access it
  //   const newItems = [action.item, ...state.list];
  //   const newState = { ...state, isSaving: false, error: null, list: newItems, defaultItem: action.item.id };
  //   console.log('items (SAVE_ITEM_OK) - newState=', newState);
  //   return newState;
  // }
  // case SAVE_ITEM_KO: return Object.assign({}, state, { isSaving: false, error: action.error });



  // //
  // // Delete item on Server (in Action) and update Redux store by deleting the item (in Reducer)
  // // Then update all the marks previously attached the removed item
  // // and attach them to a backup item
  // //

  // case REQUEST_DELETE_ITEM: return Object.assign({}, state, { isDeleting: true, error: null });
  // case DELETE_ITEM_OK: {
  //   // Deletes the item in the redux store so we don't need to reload from server to have a list without it
  //   const newItems = state.list.filter((item) => { /* console.log('map:', item.id, action.id); */ return item.id !== action.id; });
  //   const newState = { ...state, isDeleting: false, error: null, list: newItems };
  //   console.log('items (DELETE_ITEM_OK) - id, newState=', action.id, newState);
  //   return newState;
  // }
  // case DELETE_ITEM_KO: return Object.assign({}, state, { isDeleting: false, error: action.error });



    default: return state;
  }
};
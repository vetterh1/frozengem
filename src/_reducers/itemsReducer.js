import * as ACTIONS from "../_constants/action-types";


const initialState = { // define initial state - an empty items list
  items: [],
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
  // Fetch items from Server to Redux store (in Action)
  //

  case ACTIONS.FETCH_ITEMS_REQUEST:
    return {
      shouldUpdate: false,
      isFetching: true, 
      isValid: false,
      error: null
    };

  case ACTIONS.FETCH_ITEMS_SUCCESS:
      return {
        shouldUpdate: false,
        isFetching: false,
        isValid: true,
        error: null,
        items: action.items ? action.items : []
      };
      
  case ACTIONS.FETCH_ITEMS_FAILURE:
    return {
      shouldUpdate: false,
      isFetching: false,
      isValid: false,
      error: action.error,
      items: []
    };

  // //
  // // Save item to Server (in Action) and update Redux store with new item (in Reducer)
  // //

  // case REQUEST_SAVE_ITEM: return Object.assign({}, state, { isSaving: true, error: null });
  // case SAVE_ITEM_OK: {
  //   // Add the new item to the redux store so we don't need to reload from server to access it
  //   const newItems = [action.item, ...state.items];
  //   const newState = { ...state, isSaving: false, error: null, items: newItems, defaultItem: action.item.id };
  //   console.log('items (SAVE_ITEM_OK) - newState=', newState);
  //   return newState;
  // }
  // case SAVE_ITEM_KO: return Object.assign({}, state, { isSaving: false, error: action.error });


  // //
  // // Update item to Server (in Action) and update Redux store with updated item (in Reducer)
  // //

  // case REQUEST_UPDATE_ITEM: return Object.assign({}, state, { isUpdating: true, error: null });
  // case UPDATE_ITEM_OK: {
  //   // Update the item in the redux store so we don't need to reload from server to have its update state
  //   const newItems = state.items.map((item) => { return (item.id === action.item.id) ? action.item : item; });
  //   const newState = { ...state, isUpdating: false, error: null, items: newItems };
  //   console.log('items (UPDATE_ITEM_OK) - newState=', newState);
  //   return newState;
  // }
  // case UPDATE_ITEM_KO: return Object.assign({}, state, { isUpdating: false, error: action.error });


  // //
  // // Delete item on Server (in Action) and update Redux store by deleting the item (in Reducer)
  // // Then update all the marks previously attached the removed item
  // // and attach them to a backup item
  // //

  // case REQUEST_DELETE_ITEM: return Object.assign({}, state, { isDeleting: true, error: null });
  // case DELETE_ITEM_OK: {
  //   // Deletes the item in the redux store so we don't need to reload from server to have a list without it
  //   const newItems = state.items.filter((item) => { /* console.log('map:', item.id, action.id); */ return item.id !== action.id; });
  //   const newState = { ...state, isDeleting: false, error: null, items: newItems };
  //   console.log('items (DELETE_ITEM_OK) - id, newState=', action.id, newState);
  //   return newState;
  // }
  // case DELETE_ITEM_KO: return Object.assign({}, state, { isDeleting: false, error: action.error });



  default: return state;
  }
};
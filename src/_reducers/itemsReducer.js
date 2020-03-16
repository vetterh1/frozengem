import * as ACTIONS from "../_constants/action-types";

const initialState = {
  // define initial state - an empty items list
  list: [],
  shouldUpdate: true,
  isFetching: false,
  isSaving: false,
  isUpdating: false,
  isDeleting: false,
  isValid: false,
  error: null
};

export function items(state = initialState, action) {
  switch (action.type) {
    //
    // Add items
    //

    case ACTIONS.FETCH_ITEMS_REQUEST:
      return {
        list: [],
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
        error: null
      };

    case ACTIONS.FETCH_ITEMS_FAILURE:
      return {
        list: [],
        shouldUpdate: false,
        isFetching: false,
        isValid: false,
        error: action.error
      };

    //
    // Add or update an item in the store
    //

    case ACTIONS.ADD_OR_UPDATE_ITEM_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null
      };

    case ACTIONS.ADD_OR_UPDATE_ITEM_SUCCESS:
      let newItems = [];
      const foundIndex = state.list.findIndex(
        item => item.id === action.item.id
      );
      if (foundIndex >= 0)
        newItems = state.list.map(item =>
          item.id === action.item.id ? action.item : item
        );
      else newItems = [...state.list, action.item];
      const newState = {
        ...state,
        isUpdating: false,
        error: null,
        list: newItems
      };
      return newState;

    case ACTIONS.ADD_OR_UPDATE_ITEM_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error
      };

    //
    // Duplicate an item in the store
    //

    case ACTIONS.DUPLICATE_ITEM_REQUEST:
      return {
        ...state,
        isUpdating: true,
        error: null
      };

    case ACTIONS.DUPLICATE_ITEM_SUCCESS:
      const itemsWithDuplicate = [...state.list, action.item];
      const newStateWithDuplicate = {
        ...state,
        isUpdating: false,
        error: null,
        list: itemsWithDuplicate
      };
      return newStateWithDuplicate;

    case ACTIONS.DUPLICATE_ITEM_FAILURE:
      return {
        ...state,
        isUpdating: false,
        error: action.error
      };

    default:
      return state;
  }
}

import * as ACTIONS from "../_constants/action-types";
import { itemsServices } from '../_services/itemsServices';
import { notifierActions } from './notifierActions';

export const itemsActions = {
  fetchItems,
  updateAllItemsUtilityFields,
  // updateItemUtilityFields,
};

         



//
// Fetch items from Server to Redux store (in Action)
//

function fetchItems() {
  return async (dispatch, getState) => {
      dispatch({ type: ACTIONS.FETCH_ITEMS_REQUEST });

      const {language} = getState().user;
      const characteristics = getState().characteristics;

      itemsServices.fetchItems(language, characteristics)
          .then(
              items => {
                  // Add items to redux store
                  dispatch({ type: ACTIONS.FETCH_ITEMS_SUCCESS, items });

                  // navigate to the home route
                  // history.push('/');

                  return items;
              },
              error => {
                  dispatch({ type: ACTIONS.FETCH_ITEMS_FAILURE, error: error.toString() });

                  // Error message
                  const unauthorized = error.response && error.response.status === 401;
                  const message = unauthorized ? 'unauthorized' : 'items.error';
                  dispatch(notifierActions.addIntlNotifier(message, 'error'));                  
              }
          );
  };
}


function updateAllItemsUtilityFields() {
  return (dispatch, getState) => {
    const {language} = getState().user;
    const characteristics = getState().characteristics;
    const list = getState().items.list;
    const removed = getState().items.removed;
    const items = [...list, ...removed];

    const updatedItems = itemsServices.computeAllItemsUtilityFields(items, language, characteristics)

    // Replace existing items by these ones in the redux store
    dispatch({ type: ACTIONS.FETCH_ITEMS_SUCCESS, items: updatedItems });
  };
}

/*
TODO add update functions & reducer

function updateItemUtilityFields(item) {
  return async (dispatch, getState) => {
    const {language} = getState().user;
    const characteristics = getState().characteristics;

    itemsServices.computeAllItemsUtilityFields(item, language, characteristics)
        .then(
            item => {
                // Update item in redux store
                dispatch({ type: ACTIONS.UPDATE_ITEM_SUCCESS, item });

                // navigate to the home route
                // history.push('/');

                return item;
            }
        );
  };
}
*/
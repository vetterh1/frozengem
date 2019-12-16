import * as ACTIONS from "../_constants/action-types";
import { itemsServices } from '../_services/itemsServices';
import { notifierActions } from './notifierActions';

export const itemsActions = {
  fetchItems,
  addItem,
  updateItem,
  savePicture,
  removeItem,
  updateAllItemsUtilityFields,
  // updateItemUtilityFields,
};

         



//
// Fetch items from Server to Redux store (in Action)
//

function fetchItems() {
  return async (dispatch, getState) => {
      dispatch({ type: ACTIONS.FETCH_ITEMS_REQUEST });

      const user = getState().user;
      const characteristics = getState().characteristics;

      itemsServices.fetchItemsFromServer(user, characteristics)
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





//
// Save item on Server & store
//

function addItem(item) {
  return async (dispatch, getState) => {
      dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_REQUEST });

      const user = getState().user;
      const characteristics = getState().characteristics;

      itemsServices.addItemToServer(item, user)
          .then(
              item => {
                  // Update fields
                  itemsServices.computeItemUtilityFields(item, user.language, characteristics);

                  // Add items to redux store
                  dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_SUCCESS, item });
                  return item;
              },
              error => {
                  dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_FAILURE, error: error.toString() });

                  // Error message
                  const unauthorized = error.response && error.response.status === 401;
                  const message = unauthorized ? 'unauthorized' : 'items.error';
                  dispatch(notifierActions.addIntlNotifier(message, 'error'));                  
              }
          );
  };
}



//
// Update item on Server & store
//

function updateItem(id, updates) {
  return async (dispatch, getState) => {
      dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_REQUEST });

      const user = getState().user;
      const characteristics = getState().characteristics;

      itemsServices.updateItemToServer(id, updates, user)
          .then(
              item => {
                  // Update fields
                  itemsServices.computeItemUtilityFields(item, user.language, characteristics);

                  // Add items to redux store
                  dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_SUCCESS, item });
                  return item;
              },
              error => {
                  dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_FAILURE, error: error.toString() });

                  // Error message
                  const unauthorized = error.response && error.response.status === 401;
                  const message = unauthorized ? 'unauthorized' : 'items.error';
                  dispatch(notifierActions.addIntlNotifier(message, 'error'));                  
              }
          );
  };
}




//
// Remove item on Server & store
//

function removeItem(id, size) {
  return async (dispatch, getState) => {
      dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_REQUEST });

      const user = getState().user;
      const characteristics = getState().characteristics;

      itemsServices.removeItemOnServer(id, user, size)
          .then(
              item => {
                  // Update fields
                  itemsServices.computeItemUtilityFields(item, user.language, characteristics);

                  // Add items to redux store
                  dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_SUCCESS, item });
                  return item;
              },
              error => {
                  dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_FAILURE, error: error.toString() });

                  // Error message
                  const unauthorized = error.response && error.response.status === 401;
                  const message = unauthorized ? 'unauthorized' : 'items.error';
                  dispatch(notifierActions.addIntlNotifier(message, 'error'));                  
              }
          );
  };
}



function savePicture (id, pictureData, thumbnailData) {
  return async (dispatch, getState) => {
    dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_REQUEST });

    const user = getState().user;
    const characteristics = getState().characteristics;

    itemsServices.updatePictureItemToServer(id, pictureData, thumbnailData, user)
        .then(
            item => {
                // Update fields
                itemsServices.computeItemUtilityFields(item, user.language, characteristics);

                // Add items to redux store
                dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_SUCCESS, item });
                return item;
            },
            error => {
                dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_FAILURE, error: error.toString() });

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
    const items = getState().items.list;

    const updatedItems = itemsServices.computeAllItemsUtilityFields(items, language, characteristics)

    // Replace existing items by these ones in the redux store
    dispatch({ type: ACTIONS.FETCH_ITEMS_SUCCESS, items: updatedItems });
  };
}

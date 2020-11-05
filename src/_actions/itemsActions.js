import * as ACTIONS from "_constants/action-types";
import { itemsServices } from '_services/itemsServices';
import { notifierActions } from '_actions/notifierActions';

export const itemsActions = {
  fetchItems,
  addItem,
  updateItem,
  savePicture,
  removeItem,
  updateAllItemsUtilityFields,
  // updateItemUtilityFields,
  duplicateItem,
};

         



//
// Fetch items from Server to Redux store (in Action)
//

function fetchItems() {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ACTIONS.FETCH_ITEMS_REQUEST });

            const user = getState().user;
            const characteristics = getState().characteristics;

            const items = await itemsServices.fetchItemsFromServer(user, characteristics);

            // Add items to redux store
            dispatch({ type: ACTIONS.FETCH_ITEMS_SUCCESS, items });

            return items;
        } catch (error) {

            dispatch({ type: ACTIONS.FETCH_ITEMS_FAILURE, error: error.toString() });

            // Error message
            const unauthorized = error.response && error.response.status === 401;
            const message = unauthorized ? 'unauthorized' : 'items.error';
            dispatch(notifierActions.addIntlNotifier(message, 'error'));                  
        };
    }
}





//
// Save item on Server & store
//

function addItem(item) {
    return async (dispatch, getState) => {

        console.debug('addItem - 1 ', item);
        
        try {
            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_REQUEST });

            const user = getState().user;
            const characteristics = getState().characteristics;
            
            const savedItem = await itemsServices.addItemToServer(item, user);
            console.debug('addItem - 2 ', savedItem);

            // Update fields
            itemsServices.computeItemUtilityFields(savedItem, user.language, characteristics);

            // Add items to redux store
            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_SUCCESS, item: savedItem });
            return savedItem;

        } catch (error) {
            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_FAILURE, error: error.toString() });

            // Error message
            const unauthorized = error.response && error.response.status === 401;
            const message = unauthorized ? 'unauthorized' : 'items.error';
            dispatch(notifierActions.addIntlNotifier(message, 'error'));  
            return null;     
        }
    };
}



//
// Update item on Server & store
//

function updateItem(id, updates) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_REQUEST });

            const user = getState().user;
            const characteristics = getState().characteristics;

            let item = await itemsServices.updateItemToServer(id, updates, user);

            // Update fields
            itemsServices.computeItemUtilityFields(item, user.language, characteristics);

            // Add items to redux store
            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_SUCCESS, item });
            return item;

        } catch (error) {

            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_FAILURE, error: error.toString() });

            // Error message
            const unauthorized = error.response && error.response.status === 401;
            const message = unauthorized ? 'unauthorized' : 'items.error';
            dispatch(notifierActions.addIntlNotifier(message, 'error'));                  
        }
    }
}



//
// Duplicate item on Server & store
//

function duplicateItem(id) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ACTIONS.DUPLICATE_ITEM_REQUEST });

            const user = getState().user;
            const characteristics = getState().characteristics;

            let duplicatedItem = await itemsServices.duplicateItemOnServer(id, user);

            // Update fields
            itemsServices.computeItemUtilityFields(duplicatedItem, user.language, characteristics);

            // Add items to redux store
            dispatch({ type: ACTIONS.DUPLICATE_ITEM_SUCCESS, item: duplicatedItem });

            // Success message
            dispatch(notifierActions.addIntlNotifier('item.duplicate.success', 'info'));                  
            return duplicatedItem;

        } catch (error) {

            dispatch({ type: ACTIONS.DUPLICATE_ITEM_FAILURE, error: error.toString() });

            // Error message
            const unauthorized = error.response && error.response.status === 401;
            const message = unauthorized ? 'unauthorized' : 'item.duplicate.error';
            dispatch(notifierActions.addIntlNotifier(message, 'error'));                  
        }
    }
}





//
// Remove item on Server & store
//

function removeItem(id, size) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_REQUEST });

            const user = getState().user;
            const characteristics = getState().characteristics;

            let item = await itemsServices.removeItemOnServer(id, user, size);
            console.debug('removeItem 1: ', item);

            // Update fields
            itemsServices.computeItemUtilityFields(item, user.language, characteristics);
            console.debug('removeItem 2: ', item);

            // Add items to redux store
            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_SUCCESS, item });

            // Success message
            const message = (!size || size === '0') ? 'item.remove.success' : 'item.sizeChange.success';
            dispatch(notifierActions.addIntlNotifier(message, 'success'));                  
            return item;
        } catch (error) {
            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_FAILURE, error: error.toString() });

            // Error message
            const unauthorized = error.response && error.response.status === 401;
            const message = unauthorized ? 'unauthorized' : 'items.error';
            dispatch(notifierActions.addIntlNotifier(message, 'error'));                  
        }
    };
}



function savePicture (id, pictureData) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_REQUEST });

            const user = getState().user;
            const characteristics = getState().characteristics;

            let item = await itemsServices.updatePictureItemToServer(id, pictureData, user);

            // Update fields
            itemsServices.computeItemUtilityFields(item, user.language, characteristics);

            // Add items to redux store
            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_SUCCESS, item });
            return item;

        } catch (error) {

            dispatch({ type: ACTIONS.ADD_OR_UPDATE_ITEM_FAILURE, error: error.toString() });

            // Error message
            const unauthorized = error.response && error.response.status === 401;
            const message = unauthorized ? 'unauthorized' : 'items.error';
            dispatch(notifierActions.addIntlNotifier(message, 'error'));                  
        }
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

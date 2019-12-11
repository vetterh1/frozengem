import * as ACTIONS from "../_constants/action-types";
import { characteristicsServices } from '../_services/characteristicsServices';
// import { user } from './userReducer';
import { notifierActions } from './notifierActions';

export const characteristicsActions = {
  fetchCharacteristics,
};

         

//
// Fetch characteristics from Server to Redux store (in Action)
//

function fetchCharacteristics() {
  return async dispatch => {
      dispatch({ type: ACTIONS.FETCH_CHARACTERISTICS_REQUEST });

      // Get from local storage first
      let needLocalSave = false;
      const rawFromCache = localStorage.getItem('characteristics');
      let characteristics = null;
      if(rawFromCache)
        characteristics = JSON.parse(rawFromCache);
      else
        needLocalSave = true;
      
      // Then fetch from server
      characteristicsServices.fetchCharacteristics()
          .then(
              serverCharacteristics => {

                  // Is server version more recent than local storage?
                  // Or no local storage...
                  if((serverCharacteristics && characteristics && serverCharacteristics.version > characteristics.version)
                   || !characteristics) {
                    // Use it and set to save
                    characteristics = serverCharacteristics;
                    needLocalSave = true;
                  }

                  // Save locally if needed (not yet saved or older than server)
                  if(needLocalSave) {
                    localStorage.setItem('characteristics', JSON.stringify(characteristics));
                  }

                  // Add user info & characteristics to redux store
                  dispatch({ type: ACTIONS.FETCH_CHARACTERISTICS_SUCCESS, characteristics });

                  // Success message
                  // dispatch(notifierActions.addIntlNotifier('fetchCharacteristics.success', 'success'));

                  // navigate to the home route
                  // history.push('/');

                  return characteristics;
              },
              error => {
                  dispatch({ type: ACTIONS.FETCH_CHARACTERISTICS_FAILURE, error: error.toString() });

                  // Error message
                  const unauthorized = error.response && error.response.status === 401;
                  const message = unauthorized ? 'unauthorized' : 'characteristics.error';
                  dispatch(notifierActions.addIntlNotifier(message, 'error'));
              }
          );
  };
}
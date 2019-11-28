import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';
import { notifier } from './notifierReducer';

const combinedReducer = combineReducers({
  // languageInfo: languageInfoReducer,
  items: itemsReducer,
  authentication,
  registration,
  notifier,
});

export default combinedReducer;

import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import { user } from './userReducer';
import { registration } from './registrationReducer';
import { notifier } from './notifierReducer';

const combinedReducer = combineReducers({
  // languageInfo: languageInfoReducer,
  items: itemsReducer,
  user,
  registration,
  notifier,
});

export default combinedReducer;

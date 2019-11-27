import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';
import { authentication } from './authenticationReducer';
import { registration } from './registrationReducer';

const combinedReducer = combineReducers({
  // languageInfo: languageInfoReducer,
  items: itemsReducer,
  authentication,
  registration,
});

export default combinedReducer;

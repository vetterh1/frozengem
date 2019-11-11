import { combineReducers } from 'redux';
import itemsReducer from './itemsReducer';

const combinedReducer = combineReducers({
  // languageInfo: languageInfoReducer,
  items: itemsReducer,
});

export default combinedReducer;

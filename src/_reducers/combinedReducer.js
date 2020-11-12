import { combineReducers } from 'redux';
import { characteristics } from '_reducers/characteristicsReducer';
import { items } from '_reducers/itemsReducer';
import { itemsFilter } from '_reducers/itemsFilterReducer';
import { user } from '_reducers/userReducer';
import { notifier } from '_reducers/notifierReducer';

const combinedReducer = combineReducers({
  // languageInfo: languageInfoReducer,
  characteristics,
  items,
  itemsFilter,
  user,
  notifier,
});

export default combinedReducer;

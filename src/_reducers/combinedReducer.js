import { combineReducers } from 'redux';
import { characteristics } from './characteristicsReducer';
import { items } from './itemsReducer';
import { itemsFilter } from './itemsFilterReducer';
import { user } from './userReducer';
import { notifier } from './notifierReducer';

const combinedReducer = combineReducers({
  // languageInfo: languageInfoReducer,
  characteristics,
  items,
  itemsFilter,
  user,
  notifier,
});

export default combinedReducer;

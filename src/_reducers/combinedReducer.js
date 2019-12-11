import { combineReducers } from 'redux';
import { characteristics } from './characteristicsReducer';
import { items } from './itemsReducer';
import { user } from './userReducer';
import { registration } from './registrationReducer';
import { notifier } from './notifierReducer';

const combinedReducer = combineReducers({
  // languageInfo: languageInfoReducer,
  characteristics,
  items,
  user,
  registration,
  notifier,
});

export default combinedReducer;

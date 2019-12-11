import * as ACTIONS from "../_constants/action-types";
import { itemsServices } from '../_services/itemsServices';
import { notifierActions } from './notifierActions';

export const itemsFilterActions = {
  filterItems,
};

       
//
// record the selected filter
//


function filterItems(filter) {
  return {
      type: ACTIONS.FILTER_ITEMS,
      filter,
  };
};

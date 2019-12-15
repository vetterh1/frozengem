import * as ACTIONS from "../_constants/action-types";


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

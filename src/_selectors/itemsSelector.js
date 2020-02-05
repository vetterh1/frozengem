import { createSelector } from 'reselect'
// import {countFilteredArray} from '../utils/countFilteredArray'

//
// Get required data from redux state
// Here: the current filter and the list of items
//

const getItemsFilter = state => state ? state.itemsFilter.filter : null;
const getItems = state => state ? state.items.list : null;
const getCategories = state => state ? state.characteristics.categories : null;




//
// Utility function that filters the items list 
// depending on the filter parameter.
// There is no sorting here, by design!
//

const _getFilteredList = (filter, list) => {
  if(!filter || !list) return null;
  switch (filter) {
      case 'latest': {
        const nowInMs = Date.now();
        const tenDaysInMs = 10 * 24 * 60 * 60 * 1000;
        // const oneMonthInMs = 1 * 30 * 24 * 60 * 60 * 1000;
        return list
          .filter(item => !item.removed && item.createdAt > nowInMs - tenDaysInMs);
      }

      case 'all': {
        return list
          .filter(item => !item.removed);
      }

      case 'removed': {
        return list
          .filter(item => item.removed);
      }        

      case 'incomplete': {
        return list
          .filter(item => !item.removed && !item.__isComplete);
      }        

      default:
        return list
          .filter(item => !item.removed && item.category === filter);
  }
}


// 
// Selector returning a reduced list of items
// depending on the current filter (stored in redux state)
//

export const getVisibleItems = createSelector(
  [getItemsFilter, getItems],
  (filter, list) => {
    const filteredList = _getFilteredList(filter, list);
    switch (filter) {
        case 'latest':
          return filteredList.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1);

        case 'removed': 
        case 'incomplete': 
            return filteredList.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1);

        case 'all': 
        default:
          return filteredList.sort((a, b) => (a.expirationDate > b.expirationDate) ? 1 : -1);
    }
  }
)

// 
// Selector returning an object with all the filters and 
// the associated item count
//

export const filterCounts = createSelector(
  [getItems, getCategories],
  (list, categories) => {
    if(!list) return null;
    const counts = {};
    counts.all = _getFilteredList('all', list).length;
    counts.latest = _getFilteredList('latest', list).length;
    counts.removed = _getFilteredList('removed', list).length;
    counts.incomplete = _getFilteredList('incomplete', list).length;
    categories.forEach(oneCategory => {
      counts[oneCategory.id2] = _getFilteredList(oneCategory.id2, list).length;
    });
    return counts;
  }
)

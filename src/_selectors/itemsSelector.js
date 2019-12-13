import { createSelector } from 'reselect'

const getItemsFilter = state => state.itemsFilter.filter;
const getItems = (state) => state.items.list;
const getRemovedItems = (state) => state.items.removed;

export const getVisibleItems = createSelector(
  [getItemsFilter, getItems, getRemovedItems],
  (filter, list, removed) => {
    switch (filter) {
        case 'latest': {
            const nowInMs = Date.now();
            const tenDaysInMs = 10 * 24 * 60 * 60 * 1000;
            // const oneMonthInMs = 1 * 30 * 24 * 60 * 60 * 1000;
            return list.filter(item => item.updatedAt > nowInMs - tenDaysInMs)
                      .sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1);
        }

        case 'all': {
            return list
              .sort((a, b) => (a.expirationDate > b.expirationDate) ? 1 : -1);
        }

        case 'removed': {
            return removed
              .sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1);
        }        

        default:
            return list
              .filter(item => item.category === filter)
              .sort((a, b) => (a.expirationDate > b.expirationDate) ? 1 : -1);
    }
  }
)


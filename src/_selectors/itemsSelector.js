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
            const oneWeekInMs = 1 * 7 * 24 * 60 * 60 * 1000;
            // const oneMonthInMs = 1 * 30 * 24 * 60 * 60 * 1000;
            const filter1 = list.filter(item => item.updatedAt > nowInMs - oneWeekInMs);
            return filter1.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1)
        }

        case 'all': {
            return list
        }

        case 'removed': {
            return removed;
        }        

        default:
            return list.filter(item => item.category === filter);
    }
  }
)


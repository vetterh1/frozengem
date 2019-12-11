import { createSelector } from 'reselect'

const getItemsFilter = state => state.itemsFilter.filter;
const getItems = (state, props) => state.items.list;

export const getVisibleItems = createSelector(
  [getItemsFilter, getItems],
  (filter, list) => {
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
            // TODO removed items should be retreived in the same list as items and deleted on the server when > 6 months
            return null;
        }        

        default:
            return list.filter(item => item.category === filter);
    }
  }
)


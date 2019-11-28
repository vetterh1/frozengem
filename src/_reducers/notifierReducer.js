import { ADD_NOTIFIER, CLOSE_NOTIFIER, REMOVE_NOTIFIER } from "../_constants/action-types";

const initialState = { notifications: [] };

export function notifier(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFIER:
        return {
            notifications: [
                ...state.notifications,
                {
                    key: action.key,
                    ...action.notification,
                },
            ],
        };

    case CLOSE_NOTIFIER:
        return {
            notifications: state.notifications.map(notification => (
                (action.dismissAll || notification.key === action.key)
                    ? { ...notification, dismissed: true }
                    : { ...notification }
            )),
        }

    case REMOVE_NOTIFIER:
        return {
            notifications: state.notifications.filter(
                notification => notification.key !== action.key,
            ),
        };

    default:
        return state;
  }
}
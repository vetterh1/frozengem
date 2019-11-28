import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from "../_constants/action-types";

const initialState = { notifications: [] };

export function notifier(state = initialState, action) {
  switch (action.type) {
    case ENQUEUE_SNACKBAR:
        return {
            notifications: [
                ...state.notifications,
                {
                    key: action.key,
                    ...action.notification,
                },
            ],
        };

    case CLOSE_SNACKBAR:
        return {
            notifications: state.notifications.map(notification => (
                (action.dismissAll || notification.key === action.key)
                    ? { ...notification, dismissed: true }
                    : { ...notification }
            )),
        }

    case REMOVE_SNACKBAR:
        return {
            notifications: state.notifications.filter(
                notification => notification.key !== action.key,
            ),
        };

    default:
        return state;
  }
}
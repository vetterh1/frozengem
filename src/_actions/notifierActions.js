import { ADD_NOTIFIER, CLOSE_NOTIFIER, REMOVE_NOTIFIER } from "../_constants/action-types";

export const notifierActions = {
    addNotifier,
    closeNotifier,
    removeNotifier,
};

function addNotifier(notification) {
    const key = notification.options && notification.options.key;

    return {
        type: ADD_NOTIFIER,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

function closeNotifier(key) {
    return {
        type: CLOSE_NOTIFIER,
        dismissAll: !key, // dismiss all if no key has been defined
        key,
    };
}

function removeNotifier(key) {
    return {
        type: REMOVE_NOTIFIER,
        key,
    };
}

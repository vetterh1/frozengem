import * as ACTIONS from "_constants/action-types";

export const notifierActions = {
    addIntlNotifier,
    addNotifier,
    closeNotifier,
    removeNotifier,
};


function addIntlNotifier(intlMessage, variant, variables) {
    return {
        type: ACTIONS.ADD_INTL_NOTIFIER,
        notification: {
            intlMessage,
            variant,
            variables,
            key: new Date().getTime() + Math.random(),
        },
    };
};

function addNotifier(notification) {
    const key = notification.options && notification.options.key;

    return {
        type: ACTIONS.ADD_NOTIFIER,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};

function closeNotifier(key) {
    return {
        type: ACTIONS.CLOSE_NOTIFIER,
        dismissAll: !key, // dismiss all if no key has been defined
        key,
    };
}

function removeNotifier(key) {
    return {
        type: ACTIONS.REMOVE_NOTIFIER,
        key,
    };
}

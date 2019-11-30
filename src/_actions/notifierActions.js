import { ADD_NOTIFIER, ADD_INTL_NOTIFIER, CLOSE_NOTIFIER, REMOVE_NOTIFIER } from "../_constants/action-types";

export const notifierActions = {
    addIntlNotifier,
    addNotifier,
    closeNotifier,
    removeNotifier,
};


/*
   addIntlNotifier({
        message: this.props.intl.formatMessage(messages.success), 
        options: {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      });
*/

function addIntlNotifier(intlMessage, variant, variables) {
    return {
        type: ADD_INTL_NOTIFIER,
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

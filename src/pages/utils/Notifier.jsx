/* eslint-disable react/prop-types */
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from "react-intl";
import { withSnackbar } from 'notistack';
import { notifierActions } from '_actions/notifierActions';

class Notifier extends Component {
    displayed = [];

    stateDisplayed = (id) => {
        this.displayed = [...this.displayed, id];
    };


    removeDisplayed = (id) => {
        this.displayed = this.displayed.filter(key => id !== key)
    }

    componentDidUpdate() {
        const { notifications = [], intl } = this.props;

        notifications.forEach(({ key, message, intlMessage = null, variant = null, variables = {}, options = {}, dismissed = false }) => {
            if (dismissed) {
                this.props.closeSnackbar(key)
                return
            }

            // Do nothing if snackbar is already displayed
            if (this.displayed.includes(key)) return;

            // If intl, need to get the string 1st
            let finalMessage = intlMessage ? intl.formatMessage({id: intlMessage}, variables) : message;
            options = {
                ...options, 
                variant, 
                anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, 
                onClick: () => {this.props.closeSnackbar(key);}
            };

            // Display snackbar using notistack
            this.props.enqueueSnackbar(finalMessage, {
                key,
                ...options,
                onClose: (event, reason, key) => {
                    if (options.onClose) {
                        options.onClose(event, reason, key);
                    }
                },
                onExited: (event, key) => {
                    this.props.removeNotifier(key);
                    this.removeDisplayed(key)
                }
            });

            // Keep track of snackbars that we've displayed
            this.stateDisplayed(key);
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => ({
    notifications: state.notifier.notifications,
});


const mapDispatchToProps = dispatch => bindActionCreators({ removeNotifier: notifierActions.removeNotifier }, dispatch);

export default withSnackbar(injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notifier)));

/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { notifierActions } from '../../_actions/notifierActions';

class Notifier extends Component {
    displayed = [];

    stateDisplayed = (id) => {
        this.displayed = [...this.displayed, id];
    };


    removeDisplayed = (id) => {
        this.displayed = this.displayed.filter(key => id !== key)
    }

    componentDidUpdate() {
        const { notifications = [] } = this.props;

        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                this.props.closeSnackbar(key)
                return
            }
            // Do nothing if snackbar is already displayed
            if (this.displayed.includes(key)) return;
            // Display snackbar using notistack
            this.props.enqueueSnackbar(message, {
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

export default withSnackbar(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notifier));

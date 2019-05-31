import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import { injectIntl } from "react-intl";
import { defineMessages } from 'react-intl.macro';
import { withSnackbar } from 'notistack';
import UserInfo from './UserInfo';



const messages = defineMessages({ 
  logout: {
    id: 'logout.ok',
    defaultMessage: 'You are now disconnected...',
    description: 'You are now disconnected...',
  }
});



class Logout extends Component {

  static propTypes = {
    userInfo: PropTypes.instanceOf(UserInfo).isRequired,
  }

  componentDidMount() {
    this.props.enqueueSnackbar(
      this.props.intl.formatMessage(messages.logout), 
      {variant: 'info', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
    );
    this.props.userInfo.logout();
  }

  render() {
    return (
      <Redirect to='/' />
    );
  }
}

export default injectIntl(withSnackbar(Logout));
import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { userActions } from '../_actions/userActions';
import { notifierActions } from '../_actions/notifierActions';

class Logout extends Component {

  componentDidMount() {
    const { logout, addIntlNotifier } = this.props;
    addIntlNotifier('logout.ok', 'info');
    logout();
  }

  render() {
    console.log('[>>> Logout ------>>>----- / >>>] Reason: logout');
    return (<Redirect to='/' />);
  }
}

const mapDispatchToProps = {
  logout: userActions.logout,
  addIntlNotifier: notifierActions.addIntlNotifier,
};

export default connect(null, mapDispatchToProps)(Logout);



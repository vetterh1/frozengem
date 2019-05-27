import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import Auth from './Auth';

class Logout extends Component {

  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  componentDidMount() {
    this.props.auth.logout();
  }

  render() {
    return (
      <Redirect to='/' />
    );
  }
}

export default Logout;
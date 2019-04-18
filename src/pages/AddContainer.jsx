/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/img-has-alt */
/* eslint-disable no-class-assign */
/* eslint-disable react/forbid-prop-types */

import * as log from 'loglevel';
import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../auth/Auth';
import LoginBanner from '../auth/LoginBanner';


const logAddContainer = log.getLogger('logAddContainer');
// loglevelServerSend(logAddContainer); // a setLevel() MUST be run AFTER this!
logAddContainer.setLevel('debug');
logAddContainer.debug('--> entering AddContainer.jsx');


class AddContainer extends React.Component {
  static propTypes = {
    // Injected by redux-store connect:
    auth: PropTypes.instanceOf(Auth).isRequired,

  }

  constructor(props) {
    super(props);
  }



  onLogin() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    if (!isAuthenticated()) return (<LoginBanner auth={this.props.auth} />);

    return (
      <p>Add Container</p>
    );
  }
}

export default AddContainer;

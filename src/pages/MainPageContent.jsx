/* eslint-disable class-methods-use-this */
/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Auth from '../auth/Auth';
import LoginBanner from '../auth/LoginBanner';

class MainPageContent extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  render() {
    const greyWhenNoAuth = this.props.auth.isAuthenticated() ? '' : 'auth-required';

    return (
      <div>
        main content
      </div>
    );
  }
}

export default MainPageContent;
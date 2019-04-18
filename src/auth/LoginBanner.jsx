/* eslint-disable react/prefer-stateless-function */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["responseFacebook"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import Auth from './Auth';

class LoginBanner extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
    showWelcomeBlob: PropTypes.bool,
  }

  onLogin() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      return null;
      // return (
      //   <div className="jumbotron">
      //     <div className="container">
      //       <Profile auth={this.props.auth} />
      //     </div>
      //   </div>
      // );
    }
    return (
      <div className="jumbotron">
      loginbanner
      </div>
    );
  }
}
LoginBanner.defaultProps = { showWelcomeBlob: false };
export default LoginBanner;

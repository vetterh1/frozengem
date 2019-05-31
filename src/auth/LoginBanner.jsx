/* eslint-disable react/prefer-stateless-function */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["responseFacebook"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import UserInfo from './Auth';

class LoginBanner extends React.Component {
  static propTypes = {
    userInfo: PropTypes.instanceOf(UserInfo).isRequired,
    showWelcomeBlob: PropTypes.bool,
  }

  onLogin() {
    this.props.userInfo.login();
  }

  render() {
    const { isAuthenticated } = this.props.userInfo;
    if (isAuthenticated()) {
      return null;
      // return (
      //   <div className="jumbotron">
      //     <div className="container">
      //       <Profile userInfo={this.props.userInfo} />
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

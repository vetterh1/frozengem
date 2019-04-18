/* eslint-disable react/prefer-stateless-function */
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["responseFacebook"] }] */

import React from 'react';
import PropTypes from 'prop-types';
import Auth from './Auth';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = {
};


class LoginInBar extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
    classes: PropTypes.object.isRequired,
  }

  onLogin() {
    this.props.auth.login();
  }

  onLogout() {
    this.props.auth.logout();
  }

  // TODO: add User info when logged in

//  <a href="javascript:void(0)" onClick={clickHandler} className = "nav-link">Your Label</a>


  render() {
    const { isAuthenticated } = this.props.auth;
    return ( 
      <div>
        {!isAuthenticated() && (<Button color="inherit" onClick={this.onLogin.bind(this)}>login</Button>)}
        {isAuthenticated() && (<Button color="inherit" onClick={this.onLogout.bind(this)}>logout</Button>)}
      </div>

      // <NavItem>
      //   {!isAuthenticated() && (
      //     <a href="javascript:void(0)" onClick={this.onLogin.bind(this)} className = "nav-link">
      //       <FormattedMessage id="login.login_signin" />
      //     </a>
      //   )}
      //   {isAuthenticated() && (
      //     <a href="javascript:void(0)" onClick={this.onLogout.bind(this)} className = "nav-link">
      //       <FormattedMessage id="login.logout" />
      //     </a>
      //   )}
      // </NavItem>
    );
  }
}

export default withStyles(styles)(LoginInBar);

/*
      <NavItem>
        <LoginInBar auth={this.props.auth} />
      </NavItem>
language="en_US"
scope="public_profile,email"
responseHandler={this.responseFacebook}
xfbml={true}
version="v2.5"
class="facebook-login"
buttonText="Login With Facebook"/>
*/

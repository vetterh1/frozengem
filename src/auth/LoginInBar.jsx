
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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

  // onLogout() {
  //   this.props.auth.logout();
  // }

  render() {
    const { isAuthenticated } = this.props.auth;
    return ( 
      <div>
        {!isAuthenticated() && (<Button color="inherit"  component={Link} to="/login">login</Button>)}
        {isAuthenticated() && (<Button color="inherit"  component={Link} to="/logout">logout</Button>)}
      </div>
    );
  }
}

export default withStyles(styles)(LoginInBar);
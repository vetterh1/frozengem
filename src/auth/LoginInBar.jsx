
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
};



class LoginInBar extends React.Component {
  static propTypes = {
    userInfo: PropTypes.instanceOf(UserInfo).isRequired,
    classes: PropTypes.object.isRequired,
  }

  onLogin() {
    this.props.userInfo.login();
  }

  // onLogout() {
  //   this.props.userInfo.logout();
  // }

  render() {
    const { isAuthenticated } = this.props.userInfo;
    return ( 
      <div>
        {!isAuthenticated() && (<Button color="inherit"  component={Link} to="/login">login</Button>)}
        {isAuthenticated() && (<Button color="inherit"  component={Link} to="/logout">logout</Button>)}
      </div>
    );
  }
}

export default withStyles(styles)(LoginInBar);
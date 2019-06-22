
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withUserInfo } from './withUserInfo';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
};






function MenuProfile({homeCode}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (

    <div>
      <IconButton
        aria-label="Account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Your home code: {homeCode}</MenuItem>
        <MenuItem component={Link} to="/logout">Logout</MenuItem>
      </Menu>
    </div>
  );
}









class LoginInBar extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }

  onLogin() {
    this.props.userInfo.login();
  }

  // onLogout() {
  //   this.props.userInfo.logout();
  // }




  render() {
    const { isAuthenticated, getHome } = this.props.userInfo;
    return ( 
      <div>
        { !isAuthenticated() && (<Button color="inherit"  component={Link} to="/login">login</Button>) }
        {/* { isAuthenticated() && (<Button color="inherit"  component={Link} to="/logout">logout</Button>) } */}


        { isAuthenticated() && <MenuProfile homeCode={getHome()} />}

      </div>
    );
  }
}

export default withUserInfo(withStyles(styles)(LoginInBar));

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withUserInfo } from './withUserInfo';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const styles = {
};


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));




function MenuProfile({homeCode}) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  // function copyToClipboard(text) {
  //   let dummy = document.createElement("input");
  //   document.body.appendChild(dummy);
  //   dummy.setAttribute('value', text);
  //   dummy.select();
  //   document.execCommand("copy");
  //   document.body.removeChild(dummy);
  // }

  // function handleCopy() {
  //   copyToClipboard(homeCode);
  //   handleClose();
  // }

    function onCopy(code) {
      enqueueSnackbar(
        `${code} copied to clipboard`, 
        {variant: 'info', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      );
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
        <MenuItem onClick={handleClose}>
          Your home code: 
          <CopyToClipboard
            text={homeCode}
            onCopy={() => onCopy(homeCode)}
          >
            <Button variant="outlined" component="span" size="small"  className={classes.button} >
            {homeCode}
            </Button>
          </CopyToClipboard>
        </MenuItem>        
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
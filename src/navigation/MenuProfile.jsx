/* eslint-disable react-hooks/rules-of-hooks */ 
import React from 'react';

import { connect } from 'react-redux';
import { userActions } from '../_actions/userActions';
import { notifierActions } from '../_actions/notifierActions';

import { Link } from 'react-router-dom';
import { injectIntl, FormattedMessage } from "react-intl";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ButtonWithValidation from '../pages/utils/ButtonWithValidation'
import { NavigationStyle } from "./configNavigation";
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonNoUppercaseChange: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
  root: {
    paddingLeft: theme.spacing(4),
    color: '#F00',
  },
  select: {
    padding: theme.spacing(1),
  }
}));


const intMenuProfile = ({homeCode, language, density, navigationStyle, setLanguage, setDensity, setNavigationStyle, leaveHome, addIntlNotifier, intl}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  
  function onCopy(code) {
    addIntlNotifier('menu_profile.home_clipboard', 'info', {code: code});
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
        <MenuItem>
          <FormattedMessage id="menu_profile.density" />
          <Select
            native
            variant='outlined'
            // className="classes.select"
            classes={{select: classes.select, root: classes.root}}
            value={density}
            onChange={(event) => { setDensity(event.target.value); handleClose()}}
          >
          <option value={1}>{intl.formatMessage({id: 'menu_profile.density.1'})}</option>
          <option value={2}>{intl.formatMessage({id: 'menu_profile.density.2'})}</option>
          <option value={3}>{intl.formatMessage({id: 'menu_profile.density.3'})}</option>
        </Select>
        </MenuItem>


        {homeCode && <MenuItem onClick={handleClose}>
          <FormattedMessage id="menu_profile.your_code" />
          <CopyToClipboard
            text={homeCode}
            onCopy={() => onCopy(homeCode)}
          >
            <Button variant="outlined" component="span" size="small"  className={classes.buttonNoUppercaseChange} >
            {homeCode}
            </Button>
          </CopyToClipboard>
        </MenuItem>}  

        {language === "fr" && 
          <MenuItem onClick={() => { setLanguage("en"); handleClose()}}>Switch to English</MenuItem>
        }
        {language === "en" &&
          <MenuItem onClick={() => { setLanguage("fr"); handleClose()}}>Afficher en Français</MenuItem>
        }     

        {navigationStyle === NavigationStyle.NAVIGATION_TOOLBAR && 
          <MenuItem onClick={() => {setNavigationStyle(NavigationStyle.NAVIGATION_BOTTOMNAV); handleClose()}}>Switch to bottom navigation</MenuItem>
        }
        {navigationStyle === NavigationStyle.NAVIGATION_BOTTOMNAV &&
          <MenuItem onClick={() => {setNavigationStyle(NavigationStyle.NAVIGATION_TOOLBAR); handleClose()}}>Switch to top navigation</MenuItem>
        }        

        {homeCode && <MenuItem>
          <ButtonWithValidation 
            btnLabel={intl.formatMessage({id: 'menu_profile.leavehome'})}
            modalTitle={intl.formatMessage({id: 'menu_profile.leavehome'})}
            modalText={intl.formatMessage({id: 'menu_profile.leaveMessage'})}
            okLabel={intl.formatMessage({id: 'menu_profile.leaveOkLabel'})}
            cancelLabel={intl.formatMessage({id: 'button.cancel'})}
            onOk={leaveHome}
          />
        </MenuItem>}

        <MenuItem component={Link} to="/logout"><FormattedMessage id="menu_profile.logout" /></MenuItem>
      </Menu>
    </div>
  );
}





function mapStateToProps(state) {
  const { user: { home, language, density, navigationStyle } } = state;
  return {
    homeCode: home,
    language,
    density,
    navigationStyle
  };
}


const mapDispatchToProps = {
  setLanguage: userActions.setLanguage,
  setDensity: userActions.setDensity,
  setNavigationStyle: userActions.setNavigationStyle,
  leaveHome: userActions.leaveHome,
  login: userActions.login,
  addIntlNotifier: notifierActions.addIntlNotifier,
};


const connectedMenuProfile = connect(mapStateToProps, mapDispatchToProps)(intMenuProfile);
export const MenuProfile = injectIntl(connectedMenuProfile);

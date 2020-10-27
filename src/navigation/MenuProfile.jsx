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
import Switch from '@material-ui/core/Switch';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ButtonWithValidation from '../pages/utils/ButtonWithValidation'
import { NavigationStyle } from "./configNavigation";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewStreamIcon from '@material-ui/icons/ViewStream';        


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonNoUppercaseChange: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
  rootToggle: {
    paddingLeft: theme.spacing(1),
  },
  buttonToggle: {
    color: theme.palette.text.primary,
    padding: theme.spacing(1)
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

  const enableGtmString = localStorage.getItem('enableGtm');
  const enableGtm = !enableGtmString || enableGtmString === "1";

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



           
        <MenuItem>
          <FormattedMessage id="menu_profile.density" />

          <ToggleButtonGroup
            value={density.toString()}
            exclusive
            size="small" 
            onChange={(event, density) => { setDensity(parseInt(density)); handleClose()}}
            // className="classes.select"
            classes={{grouped: classes.buttonToggle, root: classes.rootToggle}}
          >
            <ToggleButton value="1" aria-label="left aligned"            >
              <ViewComfyIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="2" aria-label="centered">
              <ViewModuleIcon fontSize="small" />
            </ToggleButton>
            <ToggleButton value="3" aria-label="right aligned">
              <ViewStreamIcon fontSize="small" />
            </ToggleButton>

          </ToggleButtonGroup>

        </MenuItem>
    

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


        <MenuItem disabled={true}>&nbsp;</MenuItem>
        <MenuItem disabled={true}><FormattedMessage id="menu_profile.developer" /></MenuItem>

        <MenuItem>
          <FormattedMessage id="menu_profile.enableGtm" />
          <Switch
            checked={enableGtm}
            onChange={(event) => {localStorage.setItem("enableGtm", event.target.checked ? 1 : 0); handleClose()}}
          />
        </MenuItem>

        {navigationStyle === NavigationStyle.NAVIGATION_TOOLBAR && 
          <MenuItem onClick={() => {setNavigationStyle(NavigationStyle.NAVIGATION_BOTTOMNAV); handleClose()}}>Switch to bottom navigation</MenuItem>
        }
        {navigationStyle === NavigationStyle.NAVIGATION_BOTTOMNAV &&
          <MenuItem onClick={() => {setNavigationStyle(NavigationStyle.NAVIGATION_TOOLBAR); handleClose()}}>Switch to top navigation</MenuItem>
        }    
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

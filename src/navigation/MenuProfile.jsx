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


const intMenuProfile = ({homeCode, language, density, enableGtm, navigationStyle, setLanguage, setDensity, setEnableGtm, setNavigationStyle, leaveHome, addIntlNotifier, intl}) => {
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

          <ToggleButtonGroup
            value={density.toString()}
            exclusive
            size="small" 
            onChange={(event, density) => { setDensity(density); handleClose()}}
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

        <MenuItem>
          <FormattedMessage id="menu_profile.enableGtm" />
          <Switch
            checked={enableGtm === 1}
            onChange={(event) => { console.log(event.target.checked); setEnableGtm(event.target.checked ? 1 : 0); handleClose()}}
          />
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
  const { user: { home, language, density, enableGtm, navigationStyle } } = state;
  return {
    homeCode: home,
    language,
    density,
    enableGtm,
    navigationStyle
  };
}


const mapDispatchToProps = {
  setLanguage: userActions.setLanguage,
  setDensity: userActions.setDensity,
  setEnableGtm: userActions.setEnableGtm,
  setNavigationStyle: userActions.setNavigationStyle,
  leaveHome: userActions.leaveHome,
  login: userActions.login,
  addIntlNotifier: notifierActions.addIntlNotifier,
};


const connectedMenuProfile = connect(mapStateToProps, mapDispatchToProps)(intMenuProfile);
export const MenuProfile = injectIntl(connectedMenuProfile);

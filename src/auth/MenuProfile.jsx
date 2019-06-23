
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSnackbar } from 'notistack';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import { injectIntl } from "react-intl";
import { defineMessages, FormattedMessage } from 'react-intl.macro';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';



const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));


const messages = defineMessages({ 
  clipboard: {
    id: 'menu_profile.home_clipboard',
    defaultMessage: '{code} copied to clipboard',
    description: 'clip',
  }
});



const intMenuProfile = ({homeCode, language, setLanguage, intl}) => {
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


  function onCopy(code) {
    enqueueSnackbar(
      intl.formatMessage(messages.clipboard, {code: code}), 
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
          <FormattedMessage id="menu_profile.your_code" defaultMessage="Your home code:" />
          <CopyToClipboard
            text={homeCode}
            onCopy={() => onCopy(homeCode)}
          >
            <Button variant="outlined" component="span" size="small"  className={classes.button} >
            {homeCode}
            </Button>
          </CopyToClipboard>
        </MenuItem>   

        {language === "fr" && 
          <MenuItem onClick={e => setLanguage("en")}>Switch to English</MenuItem>
        }
        {language === "en" &&
          <MenuItem onClick={e => setLanguage("fr")}>Afficher en Français</MenuItem>
        }        

        <MenuItem component={Link} to="/logout"><FormattedMessage id="menu_profile.logout" defaultMessage="Logout" /></MenuItem>
      </Menu>
    </div>
  );
}

export const MenuProfile = injectIntl(intMenuProfile);

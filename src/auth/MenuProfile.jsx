
import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl, defineMessages, FormattedMessage } from "react-intl";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ButtonWithValidation from '../pages/utils/ButtonWithValidation'


const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonNoUppercaseChange: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
}));

const messages = defineMessages({ 
  clipboard: {
    id: 'menu_profile.home_clipboard',
    defaultMessage: '{code} copied to clipboard',
    description: 'clip',
  },
  leaveBtn: {
    id: 'menu_profile.leavehome',
    defaultMessage: 'Leave current home',
  },
  leaveMessage: {
    id: 'menu_profile.leaveMessage',
    defaultMessage: 'Do you really want to Leave the current home',
  },
  leaveOkLabel: {
    id: 'menu_profile.leaveOkLabel',
    defaultMessage: 'Leave',
  },
  buttonCancel: {
    id: 'button.cancel',
    defaultMessage: 'cancel',
  },
});


const intMenuProfile = ({homeCode, language, setLanguage, leaveHome, intl}) => {
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
        {homeCode && <MenuItem onClick={handleClose}>
          <FormattedMessage id="menu_profile.your_code" defaultMessage="Your home code:" />
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
          <MenuItem onClick={e => setLanguage("en")}>Switch to English</MenuItem>
        }
        {language === "en" &&
          <MenuItem onClick={e => setLanguage("fr")}>Afficher en Français</MenuItem>
        }        

        {homeCode && <MenuItem>
          <ButtonWithValidation 
            btnLabel={intl.formatMessage(messages.leaveBtn)}
            modalTitle={intl.formatMessage(messages.leaveBtn)}
            modalText={intl.formatMessage(messages.leaveMessage)}
            okLabel={intl.formatMessage(messages.leaveOkLabel)}
            cancelLabel={intl.formatMessage(messages.buttonCancel)}
            onOk={leaveHome}
          />
        </MenuItem>}

        <MenuItem component={Link} to="/logout"><FormattedMessage id="menu_profile.logout" defaultMessage="Logout" /></MenuItem>
      </Menu>
    </div>
  );
}

export const MenuProfile = injectIntl(intMenuProfile);

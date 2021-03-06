import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { injectIntl } from "react-intl";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ViewListIcon from '@material-ui/icons/ViewList';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const MenuNav = ({location, intl}) => {
console.log('menunav location', location);

  const classes = useStyles();

  return (
    <nav>
      <IconButton
        aria-label={intl.formatMessage({id:'action.list'})}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        className={classes.margin} component={Link} to="/"
        color="inherit"
        disabled={location.pathname === '/'} 
      >
        <ViewListIcon />
      </IconButton>
      <IconButton
        aria-label={intl.formatMessage({id:'action.add'})}
        aria-controls="menu-appbar"
        aria-haspopup="true"
        className={classes.margin} component={Link} to="/add"
        color="inherit"
        disabled={location.pathname === '/add'} 
      >
        <SaveAltIcon />
      </IconButton>
    </nav>
  );
}

export default  withRouter(injectIntl(MenuNav));

import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { injectIntl, defineMessages } from "react-intl";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Fab from '@material-ui/core/Fab';
import { NavigationMessages } from "./configNavigation";


const messages = defineMessages(NavigationMessages);


/* eslint-disable no-dupe-keys */
const useStyles = makeStyles(theme => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },  
}));

const FloatingNav = ({intl}) => {

  const classes = useStyles();

  return (
    <Fab size="small" color="primary" aria-label={intl.formatMessage(messages.add)} className={classes.fab} component={Link} to="/add">
      <SaveAltIcon />
    </Fab>
  );
}

export default withRouter(injectIntl(FloatingNav));



// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import SearchIcon from '@material-ui/icons/Search';
// import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
// import ViewList from '@material-ui/icons/ViewList';
// import { getIcon } from "../data/Icons";
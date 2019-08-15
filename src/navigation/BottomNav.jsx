import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { injectIntl, defineMessages } from "react-intl";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
// import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import ViewList from '@material-ui/icons/ViewList';
import SaveAlt from '@material-ui/icons/SaveAlt';
import { getIcon } from "../data/Icons";


const messages = defineMessages({
  add: {
    id: 'action.add',
    defaultMessage: 'Add',
    description: 'Add',
  },
  remove: {
    id: 'action.remove',
    defaultMessage: 'Remove',
    description: 'Remove',
  },
  search: {
    id: 'action.search',
    defaultMessage: 'Search',
    description: 'Search',
  },
  list: {
    id: 'action.list',
    defaultMessage: 'List',
    description: 'List',
  },
});


/* eslint-disable no-dupe-keys */
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: '-webkit-sticky', /* Safari */  
    position: 'sticky', 
    bottom: 0,
    zIndex: 10,
    paddingTop: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
}));

function BottomNav({location, intl}) {

  console.log( "BottomNav location:", location);

  const classes = useStyles();
  const [value, setValue] = React.useState(location ? location.pathname : "/");

  // External update (from router)
  if(location && location.pathname !== value)
    setValue(location.pathname);

  // Manual update (from user)
  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root} showLabels>
      <BottomNavigationAction label={intl.formatMessage(messages.list)} value="/" icon={<ViewList />} component={Link} to="/" />
      <BottomNavigationAction label={intl.formatMessage(messages.add)} value="/add" icon={<SaveAlt />} component={Link} to="/add" />
      {/* <BottomNavigationAction label={intl.formatMessage(messages.remove)} value="/remove" icon={getIcon("remove")} component={Link} to="/remove" />
      <BottomNavigationAction label={intl.formatMessage(messages.search)} value="/search" icon={<SearchIcon />} component={Link} to="/search" /> */}
    </BottomNavigation>
  );
}

export default withRouter(injectIntl(BottomNav));
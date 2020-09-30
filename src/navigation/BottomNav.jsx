import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { injectIntl } from "react-intl";
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ViewList from '@material-ui/icons/ViewList';
import SaveAlt from '@material-ui/icons/SaveAlt';
import SearchIcon from '@material-ui/icons/Search';
import CropFreeIcon from '@material-ui/icons/CropFree';

/* eslint-disable no-dupe-keys */
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    position: '-webkit-sticky', /* Safari */  
    position: 'sticky', 
    bottom: 0,
    backgroundColor: theme.transparency ? "transparent" : theme.palette.primary.light,
    backdropFilter: theme.transparency ? "blur(10px) contrast(0.2) brightness(1.8)" : null,
    color: theme.palette.text.primary,
    zIndex: 10,
    paddingTop: theme.spacing(1),
  },
}));

const BottomNav = ({location, intl}) => {

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
      <BottomNavigationAction disabled={location.pathname === '/dashboard'} label={intl.formatMessage({id: "action.list"})} value="/dashboard" icon={<ViewList />} component={Link} to="/dashboard" className={classes.root} />
      <BottomNavigationAction disabled={location.pathname === '/add'} label={intl.formatMessage({id: "action.add"})} value="/add" icon={<SaveAlt />} component={Link} to="/add" className={classes.root} />
      <BottomNavigationAction disabled={location.pathname === '/addFromBarcode'} label={intl.formatMessage({id: "action.addFromBarcode"})} value="/addFromBarcode" icon={<CropFreeIcon />} component={Link} to="/addFromBarcode" className={classes.root} />
      <BottomNavigationAction disabled={location.pathname === '/search'} label={intl.formatMessage({id: "action.search"})} value="/search" icon={<SearchIcon />} component={Link} to="/search" className={classes.root} />
    </BottomNavigation>
  );
}

export default withRouter(injectIntl(BottomNav));




// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import SearchIcon from '@material-ui/icons/Search';
// import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
// import { getIcon } from "../data/Icons";
// <BottomNavigationAction label={intl.formatMessage(messages.remove)} value="/remove" icon={getIcon("remove")} component={Link} to="/remove" />
// <BottomNavigationAction label={intl.formatMessage(messages.search)} value="/search" icon={<SearchIcon />} component={Link} to="/search" />

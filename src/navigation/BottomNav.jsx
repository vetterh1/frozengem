import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { injectIntl } from "react-intl";
import { defineMessages } from 'react-intl.macro';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';


const messages = defineMessages({
  add: {
    id: 'action.add',
    defaultMessage: 'Add',
    description: 'Add',
  },
  retreive: {
    id: 'action.retreive',
    defaultMessage: 'Retreive',
    description: 'Retreive',
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
const useStyles = makeStyles({
  root: {
    width: '100%',
    position: '-webkit-sticky', /* Safari */  
    position: 'sticky', 
    bottom: 0,
  },
});

function BottomNav({intl}) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root} showLabels>
      <BottomNavigationAction label={intl.formatMessage(messages.add)} icon={<AddCircleOutlineIcon />}  component={Link} to="/add" />
      <BottomNavigationAction label={intl.formatMessage(messages.retreive)} icon={<RemoveCircleOutlineIcon />} />
      <BottomNavigationAction label={intl.formatMessage(messages.search)}  icon={<SearchIcon />} />
      <BottomNavigationAction label={intl.formatMessage(messages.list)}  icon={<ViewHeadlineIcon />} />
    </BottomNavigation>
  );
}

export default injectIntl(BottomNav);
import React from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { injectIntl } from "react-intl";
import Fab from '@material-ui/core/Fab';
import SaveAltIcon from '@material-ui/icons/SaveAlt';

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
    <Fab size="small" color="primary" aria-label={intl.formatMessage({id:"action.add"})} className={classes.fab} component={Link} to="/add">
      <SaveAltIcon />
    </Fab>
  );
}

export default injectIntl(FloatingNav);
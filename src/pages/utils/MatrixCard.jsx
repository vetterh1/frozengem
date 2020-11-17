// React
import React from 'react';
import PropTypes from "prop-types";
// HOC
import { makeStyles } from '@material-ui/core/styles';
// Utilities
import clsx from "clsx";



const useStyles = makeStyles(theme => ({

  button: {
    border: `1px solid ${theme.palette.button.border}`,
    cursor: 'pointer',
    marginBottom: (density) => theme.spacing(density),
    padding: (density) => theme.spacing(density),

    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 250,
      maxWidth: 250,
    },
  },

  selected: {
    border: `3px solid ${theme.palette.button.border}`,
  }

  /*
  layout: {

    cursor: 'pointer',
    margin: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 250,
      maxWidth: 250,
    },
  },
  selected: {
    backgroundColor: theme.palette.matrixCard.selected,
    // boxShadow: '3px 3px 6px 2px rgba(0, 0, 0, 0.5), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
  },
  avatar: {
    backgroundColor: theme.palette.matrixCard.backgroundColor,
  }
  */

}));

const MatrixCard = ({density, onClick, selected, name, label, icon = null}) => {
  
  const classes = useStyles(density);

  
  return (
    <div 
      className={clsx(
        classes.button,
        selected && classes.selected  
      )}
      onClick={onClick} 
      selected={selected}
    >
      {name} {selected}
    </div>
  );
}

MatrixCard.propTypes = {
  // Props from caller:
  density: PropTypes.oneOf([1, 2, 3]),
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.object, 
};


export default MatrixCard;

/*
 <Card 
        className={clsx(classes.layout, {[classes.selected]: selected})} 
        onClick={onClick} 
        raised={selected}
      >
        <CardHeader
          avatar={
            <Avatar 
            className={classes.avatar} 
              aria-label="-"
            >
              {icon || "?" }
            </Avatar>
          }
          title={name}
          subheader={label}
        />
      </Card>
    */
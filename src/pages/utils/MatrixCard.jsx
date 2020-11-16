import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';


const styles = theme => ({
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

});

const intMatrixCard = ({onClick, selected, name, label, icon = null, classes}) => {
  

  
  return (
    <>
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
    </>
  );
}
export default withStyles(styles)(intMatrixCard);


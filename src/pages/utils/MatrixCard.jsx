import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import { B, V, F, S, M, H, D, I } from "../../data/Icons";
import Fastfood from '@material-ui/icons/Fastfood';


const useStyles = makeStyles({
  root: {
    borderRadius: 3,
    border: 0,
    color: 'white',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
  elevation8: {
    boxshadow: '3px 3px 6px 2px rgba(0, 0, 0, 0.5), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)'
  }
});


const styles = theme => ({
  layout: {

    margin: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 200,
      maxWidth: 200,
    },

  },


});





const intMatrixCard = ({onClick, selected, id, name, label, classes}) => {
  


  const icons = {
    "B": <B fontSize="default" />,
    "V": <V fontSize="default" />,
    "F": <F fontSize="default" />,
    "S": <S fontSize="default" />,
    "P": <Fastfood fontSize="default" />,
    "M": <M fontSize="default" />,
    "H": <H fontSize="default" />,
    "D": <D fontSize="default" />,
    "I": <I fontSize="default" />,
  }

  
  const classes2 = useStyles();

  return (
    <>
      <Card className={classes.layout} onClick={onClick} raised={selected}
      // classes={{
      //   root: classes2.root,
      //   elevation8: classes2.elevation8
      // }}
      >
        <CardHeader
          avatar={ icons[id] &&
            <Avatar aria-label="Recipe">
              {icons[id]}
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


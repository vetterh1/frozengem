import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import { B, V, F, S, M, H, D, I } from "../../data/Icons";
import Fastfood from '@material-ui/icons/Fastfood';


const styles = theme => ({
  layout: {

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
  }

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

  
  return (
    <>
      <Card 
        className={clsx(classes.layout, {[classes.selected]: selected})} 
        onClick={onClick} 
        raised={selected}
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


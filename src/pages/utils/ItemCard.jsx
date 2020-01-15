/* eslint-disable react-hooks/rules-of-hooks */ 
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import ItemImage from './ItemImage';





const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 350,
      maxWidth: 350,
    },

    marginBottom: theme.spacing(1),
},

  cardAlwaysVisible: {
    display: 'flex',
    flexDirection: 'row',
},

  cardLeft: {
    display: 'flex',
    flexGrow: 0,

    width: '100px',

    alignSelf: 'center',
    textAlign: 'center',
  },
  
  cardCenter: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,

    padding: 0,
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
   },

   cardContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,

    padding: 0,
   },

  cardMain: {
    display: 'flex',
    flexDirection: 'column',
  },
  
  cardActions: {
    display: 'flex',
    flexDirection: 'row',

    padding: 0,
    marginTop: theme.spacing(1),

    justifyContent: 'space-between'
  },

  cardActionsMain: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
  },

  cardActionsItem: {
    marginRight: theme.spacing(1),
  },

  cardIcons: {
    display: 'flex',
    flexDirection: 'column',
  },

  cardRight: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,

    width: '85px',
    minWidth: '85px',
    maxWidth: '85px',

    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,

    justifyContent: 'center',
    textAlign: 'center',

    borderRadius: '3px',
  },

  expanded: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    padding: 0,
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expandedOpen: {
    transform: 'rotate(180deg)',
  },

  details: {
    marginRight: theme.spacing(1),
  },

  button: {
    margin: theme.spacing(1),
  },  

  input: {
    display: 'none',
  },  

});





const intItemCard = ({item, classes, theme}) => {

  console.debug('[--- FC ---] Functional component: ItemCard -  item: ', item.id);

  const [toDetails, setToDetails] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);
  const [timestampClickAway, setSimestampClickAway] = React.useState(0);

  // const handleExpanded = () => { setExpanded(prev => !prev); }
  const handleClickAway = () => { setExpanded(false); setSimestampClickAway(Date.now())};
  
  const handleClickForDetails = (e) => { setToDetails(true); e.stopPropagation(); }

  if (toDetails === true) {
    // use Redirect push to keep the history (without the push, it replaces the url and does not keep the previous page)
    return <Redirect push to={`/details/${item.id}`} />
  }

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>

        <Card className={classes.card} >
          <div className={classes.cardAlwaysVisible}>
            <div className={classes.cardLeft}>
              <ItemImage item={item} thumbnailSize={100} timestampClickAway={timestampClickAway} />
            </div>
            <div className={classes.cardCenter} onClick={handleClickForDetails}>
              <CardContent className={classes.cardContent} >
                <div className={classes.cardMain} >
                  <Typography variant="h6">
                    {item.__nameOrCategory}
                  </Typography>
                  <Typography color="textSecondary">
                    {item.__sizeInText}
                  </Typography>
                  {/* <div  className={classes.cardActionLine}>

                  </div> */}
                </div>
                <div className={classes.cardIcons} >
                </div>
              </CardContent>

            </div>

            <div className={classes.cardRight} 
              style={{backgroundColor: theme.palette.itemCard.cardBackgroundColor[item.__cardBackgroundColor]}}
              onClick={handleClickForDetails}
            >
                <Typography variant="h4" component="div">
                  {item.__monthExpirationAsText}
                </Typography>              
                <Typography  component="div" gutterBottom>
                  {item.__yearExpiration}
                </Typography>
            </div>
          </div>

        </Card>

      </ClickAwayListener>
    </>
  );
}


intItemCard.propTypes = {
  // Props from caller
  item: PropTypes.object.isRequired,
  
  // Props from other HOC
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}



export default withStyles(styles, { withTheme: true })(intItemCard);
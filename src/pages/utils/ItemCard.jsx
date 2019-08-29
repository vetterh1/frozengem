import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withUserInfo } from '../../with/withUserInfo';
import { withItemCharacteristics } from '../../with/withItemCharacteristics';
// import { injectIntl, defineMessages } from "react-intl";
import { injectIntl } from "react-intl";

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Collapse from '@material-ui/core/Collapse';

import ItemImage from './ItemImage';

// import clsx from 'clsx';
// import IconButton from '@material-ui/core/IconButton';
// import CardActions from '@material-ui/core/CardActions';

// import Avatar from '@material-ui/core/Avatar';
// import CardHeader from '@material-ui/core/CardHeader';

// import PanToolIcon from '@material-ui/icons/PanTool';
// import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
// import TimerIcon from '@material-ui/icons/Timer';
// import DoneIcon from '@material-ui/icons/Done';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import { getIcon } from "../../data/Icons";

// import PictureSelection from './PictureSelection';
// import ButtonToModal from './ButtonToModal'
// import CharacteristicsSelection from './CharacteristicsSelection';




// const messages = defineMessages({ 
//   cameraReplace: {
//     id: 'camera.replace',
//     defaultMessage: 'Retake picture',
//   },  
//   cameraAdd: {
//     id: 'camera.add',
//     defaultMessage: 'Add picture',
//   },
//   remove: {
//     id: 'action.remove',
//     defaultMessage: 'Remove',
//   },
//   removeNothing: {
//     id: 'item.remove.nothing',
//     defaultMessage: 'Nothing',
//   },
//   removeFromFreezer: {
//     id: 'item.remove.from_freezer',
//     defaultMessage: 'Remove this item from your freezer',
//   },
//   cancel: {
//     id: 'button.cancel',
//     defaultMessage: 'Cancel',
//   },
//   titleRemove: {
//     id: 'item.remove.modal.title',
//     defaultMessage: 'How much quantity is left?',
//   },  
// });



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

    justifyContent: 'top',
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





const intItemCard = ({item, onSavePicture, onRemoveItem, onShowDetails, classes, intl, userInfo, itemCharacteristics, theme}) => {
  // console.debug('[--- FC ---] Functional component: ItemCard -  item: ', item.id);

  const [expanded, setExpanded] = React.useState(false);
  const [timestampClickAway, setSimestampClickAway] = React.useState(0);

  // const handleExpanded = () => { setExpanded(prev => !prev); }
  const handleClickAway = () => { setExpanded(false); setSimestampClickAway(Date.now())};
  
  const handleClickForDetails = (e) => { onShowDetails(item); e.stopPropagation(); }

  
  // const handleClickRemove = ({ size }) => {
  //   console.log("ItemCard.handleClickRemove: ", item.id);
  //   onRemoveItem(item, size);
  //   return null;
  // };

  // const handleSavePicture = (pictureData, thumbnailData) => {
  //   console.log("ItemCard.handeSavePicture: ", item.id);
  //   onSavePicture(item, pictureData, thumbnailData);
  // };



  // const zero = {
  //   id2: "0", 
  //   label: {en: intl.formatMessage(messages.removeFromFreezer), fr: intl.formatMessage(messages.removeFromFreezer)}, 
  //   name: {en: intl.formatMessage(messages.removeNothing), fr: intl.formatMessage(messages.removeNothing)},
  // };
  // const sizes = [zero, ...itemCharacteristics.sizes];

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
                  <Typography variant="body2" component="h2">
                    {item.__nameOrCategory}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Size: {item.__sizeInText}
                  </Typography>
                  {/* <div  className={classes.cardActionLine}>

                  </div> */}
                </div>
                <div className={classes.cardIcons} >
                </div>
              </CardContent>
              {/* <CardActions disableSpacing size="small" className={classes.cardActions}>
                <div className={classes.cardActionsMain}>
                  <div className={classes.cardActionsItem}>
                    <ButtonToModal 
                      iconOnlyButton
                      btnLabel={intl.formatMessage(messages.remove)}
                      btnIcon={getIcon("remove")} 
                      cancelLabel={intl.formatMessage(messages.cancel)}
                      onOk={null}
                    >
                      <CharacteristicsSelection
                        name='size'
                        title={intl.formatMessage(messages.titleRemove)}
                        handleChange={handleClickRemove}
                        items={sizes}
                        preselectedItems={item.size}
                      />
                    </ButtonToModal>
                  </div>
                  <div className={classes.cardActionsItem}>
                    <PictureSelection 
                          itemId={item.id}
                          iconOnlyButton
                          onPicture={handleSavePicture}
                          label={intl.formatMessage(imageExists ? messages.cameraReplace : messages.cameraAdd)}
                    />
                  </div>
                </div>
                <IconButton
                  className={clsx(classes.expanded, {
                    [classes.expandedOpen]: expanded,
                  })}
                  onClick={handleExpanded}
                  aria-expanded={expanded}
                  aria-label="Show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions> */}
            </div>
            <div className={classes.cardRight} style={{backgroundColor: item.__cardBackgroundColor}}>
                <Typography variant="body1" component="div">
                  {item.__yearExpiration}
                </Typography>
                <Typography variant="h5" component="div">
                  {item.__monthExpirationAsText}
                </Typography>              
            </div>
          </div>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <>
              <CardContent>
                {item.__detailsNames && <Typography paragraph>Details: {item.__detailsNames}</Typography>}
                <Typography paragraph>Code: {item.code}</Typography>
              </CardContent>
            </>
          </Collapse>

        </Card>

      </ClickAwayListener>
    </>
  );
}
export default injectIntl(withSnackbar(withUserInfo(withItemCharacteristics(withStyles(styles, { withTheme: true })(intItemCard)))));
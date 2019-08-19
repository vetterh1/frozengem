import React from 'react';
import {Months} from '../../i18n/i18nDates';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withUserInfo } from '../../with/withUserInfo';
import { withItemCharacteristics } from '../../with/withItemCharacteristics';
import { ExpirationLevel } from "../../data/ItemCharacteristicsStore";
import { injectIntl, defineMessages } from "react-intl";

import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Avatar from '@material-ui/core/Avatar';
// import CardHeader from '@material-ui/core/CardHeader';
// import Collapse from '@material-ui/core/Collapse';

import PanToolIcon from '@material-ui/icons/PanTool';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import TimerIcon from '@material-ui/icons/Timer';
import DoneIcon from '@material-ui/icons/Done';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import { getIcon } from "../../data/Icons";

import PictureSelection from './PictureSelection';
import ItemImage from './ItemImage';
import ButtonToModal from './ButtonToModal'
import CharacteristicsSelection from './CharacteristicsSelection';




const messages = defineMessages({ 
  cameraReplace: {
    id: 'camera.replace',
    defaultMessage: 'Retake picture',
  },  
  cameraAdd: {
    id: 'camera.add',
    defaultMessage: 'Add picture',
  },
  remove: {
    id: 'action.remove',
    defaultMessage: 'Remove',
  },
  removeNothing: {
    id: 'item.remove.nothing',
    defaultMessage: 'Nothing',
  },
  removeFromFreezer: {
    id: 'item.remove.from_freezer',
    defaultMessage: 'Remove this item from your freezer',
  },
  cancel: {
    id: 'button.cancel',
    defaultMessage: 'Cancel',
  },
  expirationMessagePassed: {
    id: 'expiration.message.passed',
    defaultMessage: 'Expired!',
  },
  expirationMessageNext_30_days: {
    id: 'expiration.message.next_30_days',
    defaultMessage: 'Expires in a few days!',
  },
  expirationMessageWithin_3_months: {
    id: 'expiration.message.within_3_months',
    defaultMessage: 'Expires withing 3 months',
  },
  expirationMessageLater: {
    id: 'expiration.message.later',
    defaultMessage: 'Expires in more than 3 months',
  },
  titleRemove: {
    id: 'item.remove.modal.title',
    defaultMessage: 'How much quantity is left?',
  },  
});



const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'row',

    marginBottom: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 350,
      maxWidth: 350,
    },

  },

  cardCenter: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    padding: 0,
  },

  cardContent: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    padding: 0,
   },

  cardMain: {
    display: 'flex',
    flexDirection: 'column',
  },
  
  cardActions: {
    padding: 0,
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'row',
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
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    justifyContent: 'top',
    textAlign: 'center',
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





const intItemCard = ({item, onSavePicture, onRemoveItem, classes, intl, userInfo, itemCharacteristics, theme}) => {
  // console.debug('[--- FC ---] Functional component: ItemCard -  item: ', item.id);

  const [expanded, setExpanded] = React.useState(false);
  const [timestampClickAway, setSimestampClickAway] = React.useState(0);

  const handleExpanded = () => { setExpanded(prev => !prev); }
  const handleClickAway = () => { setExpanded(false); setSimestampClickAway(Date.now())};
  
  const handleClickRemove = ({ size }) => {
    console.log("ItemCard.handleClickRemove: ", item.id);
    onRemoveItem(item, size);
    return null;
  };

  const handleSavePicture = (pictureData, thumbnailData) => {
    console.log("ItemCard.handeSavePicture: ", item.id);
    onSavePicture(item, pictureData, thumbnailData);
  };



  const expirationLevel = itemCharacteristics.computeExpirationLevel(item.expirationDate);
  let avatarBackgroundColor;
  let cardBackgroundColor;
  let iconExpiration;
  let expirationText;
  switch (expirationLevel) {
    case ExpirationLevel.EXPIRATION_PASSED:
      avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.expired;
      cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.expired;
      iconExpiration = <PanToolIcon />;
      expirationText = messages.expirationMessagePassed;
      break;
    case ExpirationLevel.EXPIRATION_NEXT_30_DAYS:
      avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.next_30_days;
      cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.next_30_days;
      iconExpiration = <PriorityHighIcon />;
      expirationText = messages.expirationMessageNext_30_days;
      break;
    case ExpirationLevel.EXPIRATION_WITHIN_3_MONTHS:
      avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.within_3_months;
      cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.within_3_months;
      iconExpiration = <TimerIcon />;
      expirationText = messages.expirationMessageWithin_3_months;
      break;
    default:
      avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.later;
      cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.later;
      iconExpiration = <DoneIcon />;
      expirationText = messages.expirationMessageLater;
      break;
  } 

  const name = item.name && item.name.length > 0 ? item.name : itemCharacteristics.getCategoryName(item.category, userInfo.language);
  const size = itemCharacteristics.getSizeLabel(item.size, userInfo.language);
  // const detailsNamesArray = itemCharacteristics.getDetailsNamesArray(item.detailsArray, userInfo.language);
  // const detailsNames = detailsNamesArray ? detailsNamesArray.join( ', ') : null;
  const imageExists = item.pictureName || item.thumbnailName;

  const expirationAsDate = new Date(item.expirationDate);
  const yearExpiration = expirationAsDate.getFullYear();
  const monthExpiration = expirationAsDate.getMonth();
  const monthAsText = Months[userInfo.language][monthExpiration];

  const zero = {
    id2: "0", 
    label: {en: intl.formatMessage(messages.removeFromFreezer), fr: intl.formatMessage(messages.removeFromFreezer)}, 
    name: {en: intl.formatMessage(messages.removeNothing), fr: intl.formatMessage(messages.removeNothing)},
  };
  const sizes = [zero, ...itemCharacteristics.sizes];

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>

        <Card className={classes.card} >
          <ItemImage item={item} thumbnailSize={90} timestampClickAway={timestampClickAway} />
          <div className={classes.cardCenter}>
            <CardContent className={classes.cardContent} >
              <div className={classes.cardMain} >
                <Typography variant="body2" component="h2">
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Size: {size}
                </Typography>
                {/* <div  className={classes.cardActionLine}>

                </div> */}
              </div>
              <div className={classes.cardIcons} >
              </div>
            </CardContent>
            <CardActions disableSpacing size="small" className={classes.cardActions}>
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
            </CardActions>
          </div>
          <div className={classes.cardRight} style={{backgroundColor: cardBackgroundColor}}>
              <Typography variant="body1" component="div">
                {yearExpiration}
              </Typography>
              <Typography variant="h5" component="div">
                {monthAsText}
              </Typography>              
          </div>
          </Card>

      </ClickAwayListener>
    </>
  );
}
export default injectIntl(withSnackbar(withUserInfo(withItemCharacteristics(withStyles(styles, { withTheme: true })(intItemCard)))));

/*


        <Card className={classes.layout} style={{backgroundColor: cardBackgroundColor}}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" style={{backgroundColor: avatarBackgroundColor}}>
                {iconExpiration}
              </Avatar>
            }
            title={title}
            subheader={intl.formatMessage(expirationText)}
          />
          <ItemImage item={item} timestampClickAway={timestampClickAway} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Size: {size}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ButtonToModal 
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
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <>
              <CardContent>
                {detailsNames && <Typography paragraph>Details: {detailsNames}</Typography>}
              </CardContent>
              <CardActions>
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon />
                </IconButton>      
                <PictureSelection 
                  iconOnlyButton
                  onPicture={handleSavePicture}
                  label={intl.formatMessage(imageExists ? messages.cameraReplace : messages.cameraAdd)}
                />
              </CardActions>
            </>
          </Collapse>
        </Card>


*/
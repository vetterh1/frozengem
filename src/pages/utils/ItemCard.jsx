import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { withSnackbar } from 'notistack';
import { withUserInfo } from '../../auth/withUserInfo';
import { withItemCharacteristics } from '../../auth/withItemCharacteristics';
import { ExpirationLevel } from "../../data/ItemCharacteristicsStore";


import { injectIntl, defineMessages } from "react-intl";
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';


import PanToolIcon from '@material-ui/icons/PanTool';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import TimerIcon from '@material-ui/icons/Timer';
import DoneIcon from '@material-ui/icons/Done';


import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { getIcon } from "../../data/Icons";

import config from '../../data/config'
import PictureSelection from './PictureSelection';


import ButtonToModal from './ButtonToModal'
import CharacteristicsSelection from './CharacteristicsSelection';




const messages = defineMessages({ 
  removeError: {
    id: 'item.remove.error',
    defaultMessage: 'Sorry, removing this item failed. Please try again...',
  },  
  removeSuccess: {
    id: 'item.remove.success',
    defaultMessage: 'Item removed!',
  },
  cameraError: {
    id: 'camera.error',
    defaultMessage: 'Sorry, saving this picture failed. Please try again...',
  },  
  cameraSuccess: {
    id: 'camera.success',
    defaultMessage: 'Picture saved!',
  },
  cameraReplace: {
    id: 'camera.replace',
    defaultMessage: 'Retake picture',
  },  
  cameraAdd: {
    id: 'camera.add',
    defaultMessage: 'Add picture',
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
  layout: {

    margin: theme.spacing(1),

    [theme.breakpoints.down('xs')]: {
      minWidth: '100%',
      maxWidth: '100%',
    },
    [theme.breakpoints.up('sm')]: {
      minWidth: 350,
      maxWidth: 350,
    },

  },
  media: {
    minHeight: 150,
  },
  mediaOpen: {
    minHeight: 400,
  },  
  expanded: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
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
  console.debug('[--- FC ---] Functional component: ItemCard -  item: ', item.id);

  const [expanded, setExpanded] = React.useState(false);
  const [expandedMedia, setExpandedMedia] = React.useState(false);


  const handleExpanded = () => {
    setExpanded(prev => !prev);
  }

  const handleExpandedMedia = () => {
    setExpandedMedia(prev => !prev);
  }

  const handleClickAway = () => {
    setExpanded(false);
    setExpandedMedia(false);
  };


  
  const handleClickRemove = ({ size }) => {
    onRemoveItem(item, size);
  };

  
  
  const handleSavePicture = (pictureData, thumbnailData) => {
    onSavePicture(item, pictureData, thumbnailData);
  };





  const expirationLevel = itemCharacteristics.computeExpirationLevel(item.expirationDate);
  console.log('exp level:', expirationLevel);
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

  const name = item.name ? item.name : itemCharacteristics.getCategoryName(item.category, userInfo.language);
  const title = name;
  
  // const d = new Date(item.expirationDate);
  // const expiration = `Expires ${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;

  const size = itemCharacteristics.getSizeLabel(item.size, userInfo.language);

  const detailsNamesArray = itemCharacteristics.getDetailsNamesArray(item.detailsArray, userInfo.language);
  const detailsNames = detailsNamesArray ? detailsNamesArray.join( ', ') : null;

  const thumbnailsOrPictures = expandedMedia ? item.pictureName : item.thumbnailName;

  const zero = {id2: "0", label: {en: "Remove this item from your freezer", fr: "Retirer ce produit de votre congélateur"}, name: {en: "Nothing", fr: "Rien"}};
  const sizes = [zero, ...itemCharacteristics.sizes];
  

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>

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
          {thumbnailsOrPictures && 
            <CardActionArea onClick={handleExpandedMedia} disableRipple={true}>
              <CardMedia
                className={expandedMedia ? classes.mediaOpen : classes.media}
                image={`${config.staticUrl}/static/pictures/items/${thumbnailsOrPictures}`}
                title={item.name}
              />
            </CardActionArea>
          }          
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Size: {size}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* <IconButton aria-label="Remove" onClick={handleClickRemove}>
              {getIcon("remove")}
            </IconButton> */}

            <ButtonToModal 
              btnLabel="Remove"
              btnIcon={getIcon("remove")} 
              cancelLabel="Cancel"
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
                  label={intl.formatMessage(thumbnailsOrPictures ? messages.cameraReplace : messages.cameraAdd)}
                />
              </CardActions>
            </>
          </Collapse>
        </Card>

      </ClickAwayListener>
    </>
  );
}
export default injectIntl(withSnackbar(withUserInfo(withItemCharacteristics(withStyles(styles, { withTheme: true })(intItemCard)))));


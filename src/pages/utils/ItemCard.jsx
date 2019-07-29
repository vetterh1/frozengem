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

import { red } from '@material-ui/core/colors';
import { orange } from '@material-ui/core/colors';
import { blue } from '@material-ui/core/colors';
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
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import config from '../../data/config'
import PictureSelection from './PictureSelection';


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
});



const styles = theme => ({
  layout: {
    minWidth: 350,
    maxWidth: 350,
    margin: theme.spacing(2),
  },
  media: {
    minHeight: 150,
    minWidth: 350,
  },
  mediaOpen: {
    minHeight: 400,
    minWidth: 350,
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





const intItemCard = ({item, onSavePicture, onRemoveItem, classes, intl, userInfo, itemCharacteristics}) => {
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



  const handleClickRemove = () => {
    onRemoveItem(item);
  };

  
  
  const handleSavePicture = (pictureData, thumbnailData) => {
    onSavePicture(item, pictureData, thumbnailData);
  };





    const expirationLevel = itemCharacteristics.computeExpirationLevel(item.expirationDate);
    console.log('exp level:', expirationLevel);
    let backgroundColor = blue[200];
    let iconExpiration = <DoneIcon />;
    switch (expirationLevel) {
      case ExpirationLevel.EXPIRATION_PASSED:
        backgroundColor = red['A700'];
        iconExpiration = <PanToolIcon />;
        break;
      case ExpirationLevel.EXPIRATION_NEXT_30_DAYS:
        backgroundColor = red[500];
        iconExpiration = <PriorityHighIcon />;
        break;
      default:
        backgroundColor = orange[500];
        iconExpiration = <TimerIcon />;
        break;
    } 

  const name = item.name ? item.name : itemCharacteristics.getCategoryName(item.category, userInfo.language);
  const title = name;
  
  const d = new Date(item.expirationDate);
  const expiration = `Expires ${d.getUTCMonth() + 1}/${d.getUTCFullYear()}`;

  const size = itemCharacteristics.getSizeLabel(item.size, userInfo.language);

  const detailsNamesArray = itemCharacteristics.getDetailsNamesArray(item.detailsArray, userInfo.language);
  const detailsNames = detailsNamesArray ? detailsNamesArray.join( ', ') : null;

  const thumbnailsOrPictures = expandedMedia ? item.pictureName : item.thumbnailName;


  

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>

        <Card className={classes.layout}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar} style={{backgroundColor: backgroundColor}}>
                {iconExpiration}
              </Avatar>
            }
            title={title}
            subheader={expiration}
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
            <IconButton aria-label="Remove" onClick={handleClickRemove}>
              <RemoveCircleOutlineIcon />
            </IconButton>
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
                  iconButton
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
export default injectIntl(withSnackbar(withUserInfo(withItemCharacteristics(withStyles(styles)(intItemCard)))));


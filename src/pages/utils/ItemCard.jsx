import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { withItems } from '../../auth/withItems';
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
import ShareIcon from '@material-ui/icons/Share';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import config from '../../data/config'


// import WebcamCapture from './WebcamCapture';
import PictureSelection from './PictureSelection';


const messages = defineMessages({ 
  error: {
    id: 'camera.error',
    defaultMessage: 'Sorry, saving this picture failed. Please try again...',
  },  
  success: {
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





const intItemCard = ({item, onItemChange, classes, intl,items, userInfo, enqueueSnackbar, itemCharacteristics}) => {
  console.debug('[--- FC ---] Functional component: ItemCard -  item: ', item.id);


  const [expanded, setExpanded] = React.useState(false);
  const [expandedMedia, setExpandedMedia] = React.useState(false);
  // const [cameraDialogState, setCameraDialogState] = React.useState(false);


  

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


  // const handleAddPicture = () => {
  //   setCameraDialogState(true);
  // }

  
  // Set the received value in the state 
  // (replacing any existing one)
  const savePicture = async (pictureData, thumbnailData) => {

    // setCameraDialogState(false);

    try {
      const { updatePictureItemToServer } = items;
      const itemUpdated = await updatePictureItemToServer(item.id , pictureData, thumbnailData, userInfo);
      onItemChange(itemUpdated);
      enqueueSnackbar(
        intl.formatMessage(messages.success), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      ); 
      // console.log('itemUpdated: ', itemUpdated);
    } catch (error) {
      console.error('AddWizard.handleChange error: ' , error);
      enqueueSnackbar(
        intl.formatMessage(messages.error), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      ); 
    }
  }







  // const closeCameraDialog = () => {
  // console.log('closeCameraDialog');
  // setCameraDialogState(false);
  // }



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
    <React.Fragment>

    

      <ClickAwayListener onClickAway={handleClickAway}>



        <Card className={classes.layout}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar} style={{backgroundColor: backgroundColor}}>
                {iconExpiration}
              </Avatar>
            }
            // action={
            //   <IconButton aria-label="Settings">
            //     <MoreVertIcon />
            //   </IconButton>
            // }
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
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
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

                <PictureSelection 
                  onPicture={savePicture}
                  label={intl.formatMessage(thumbnailsOrPictures ? messages.cameraReplace : messages.cameraAdd)}
                />

              </CardActions>
            </>
          </Collapse>
        </Card>


      </ClickAwayListener>




    </React.Fragment>
      );
}
export default injectIntl(withSnackbar(withUserInfo(withItemCharacteristics(withItems(withStyles(styles)(intItemCard))))));


/*
      <WebcamCapture
        open={cameraDialogState}
        onClose={() => closeCameraDialog()}
        savePicture={(data) => savePicture(data)}
      />



                <Button onClick={() => handleAddPicture()} size="small" color="primary">
                  {!item.picture && <FormattedMessage id="camera.add" defaultMessage="Add picture" />}
                  {item.picture && <FormattedMessage id="camera.replace" defaultMessage="Retake picture" />}
                </Button>

                <input
                  accept="image/x-png,image/jpeg,image/gif"
                  className={classes.input}
                  id="button-choose-picture"
                  type="file"
                  onChange={onInputChange}
                />
                <label htmlFor="button-choose-picture">
                  <Button component="span"size="small" color="primary" className={classes.button}>
                    Upload
                  </Button>
                </label>

*/

// <ClickAwayListener onClickAway={handleClickAway}>
// <Card className={classes.layout} raised={expandedView}>
//   <CardActionArea onClick={handleexpandedView} disableRipple={true}>
//     {item.picture && <CardMedia
//       className={classes.media}
//       // image={`${config.staticUrl}/static/thumbnails/items/${item.id}.jpg&updatedAt=${item.updatedAt}`}
//       image={`${config.staticUrl}/static/thumbnails/items/${item.id}.jpg`}
//       title={item.name}
//     /> }
//     <CardContent>
//       <Typography gutterBottom variant="h5" component="h2">
//         {item.name && item.name}
//         {!item.name && item.category}
//       </Typography>
//       <Typography variant="body2" color="textSecondary" component="p">
//         Expires: {item.expirationDate}
//       </Typography>
//       { expandedView &&
//         <Typography variant="body2" color="textSecondary" component="p">
//           Last update: {item.updatedAt}
//         </Typography>
//       }
//     </CardContent>
//   </CardActionArea>
//   { expandedView &&
//     <CardActions>
//       <Button onClick={() => handleAddPicture()} size="small" color="primary">
//         {!item.picture && <FormattedMessage id="camera.add" defaultMessage="Add picture" />}
//         {item.picture && <FormattedMessage id="camera.replace" defaultMessage="Retake picture" />}
//       </Button>
//     </CardActions>
//   }
// </Card>
// </ClickAwayListener>




import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { withItems } from '../../auth/withItems';
import { withSnackbar } from 'notistack';
import { withUserInfo } from '../../auth/withUserInfo';
import { withItemCharacteristics } from '../../auth/withItemCharacteristics';

import { injectIntl, FormattedMessage, defineMessages } from "react-intl";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import config from '../../data/config'


import WebcamCapture from './WebcamCapture';


const messages = defineMessages({ 
  error: {
    id: 'camera.error',
    defaultMessage: 'Sorry, saving this picture failed. Please try again...',
  },
});



const styles = theme => ({
  layout: {
    maxWidth: 445,
    margin: theme.spacing(2),
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  largeIcon: {
    width: 48,
    height: 48,
    marginBottom: theme.spacing(2),
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  media: {
    minHeight: 200,
    minWidth: 350,
  },  
});





const intItemCard = ({item, onItemChange, classes, intl,items, userInfo, enqueueSnackbar}) => {
  console.debug('[--- FC ---] Functional component: ItemCard -  item: ', item.id);


  const [extendedView, setExtendedView] = React.useState(false);
  const [cameraDialogState, setCameraDialogState] = React.useState(false);


  

  const handleExtendedView = () => {
    setExtendedView(prev => !prev);
  }

  const handleClickAway = () => {
    setExtendedView(false);
  };


  const handleAddPicture = () => {
    setCameraDialogState(true);
  }

  
  // Set the received value in the state 
  // (replacing any existing one)
  const onPicture = async (data) => {

    setCameraDialogState(false);

    try {
      const { updatePictureItemToServer } = items;
      const itemUpdated = await updatePictureItemToServer(item.id , data, userInfo);
      onItemChange(itemUpdated);
      // console.log('itemUpdated: ', itemUpdated);
    } catch (error) {
      console.error('AddWizard.handleChange error: ' , error);
      enqueueSnackbar(
        intl.formatMessage(messages.error), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      ); 
    }
  }



  const closeCameraDialog = () => {
  console.log('closeCameraDialog');
  setCameraDialogState(false);
  }

  return (
    <React.Fragment>

      <WebcamCapture
        open={cameraDialogState}
        onClose={() => closeCameraDialog()}
        onPicture={(data) => onPicture(data)}
      />

      <ClickAwayListener onClickAway={handleClickAway}>
        <Card className={classes.layout} raised={extendedView}>
          <CardActionArea onClick={handleExtendedView}>
            {item.picture && <CardMedia
              className={classes.media}
              // image={`${config.staticUrl}/static/thumbnails/items/${item.id}.jpg&updatedAt=${item.updatedAt}`}
              image={`${config.staticUrl}/static/thumbnails/items/${item.id}.jpg`}
              title={item.name}
            /> }
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name && item.name}
                {!item.name && item.category}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Expires: {item.expirationDate}
              </Typography>
              { extendedView &&
                <Typography variant="body2" color="textSecondary" component="p">
                  Last update: {item.updatedAt}
                </Typography>
              }
            </CardContent>
          </CardActionArea>
          { extendedView &&
            <CardActions>
              <Button onClick={() => handleAddPicture()} size="small" color="primary">
                {!item.picture && <FormattedMessage id="camera.add" defaultMessage="Add picture" />}
                {item.picture && <FormattedMessage id="camera.replace" defaultMessage="Retake picture" />}
              </Button>
            </CardActions>
          }
        </Card>
      </ClickAwayListener>

{/* 

      <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {item.category}
        </Typography>
        <Typography variant="h5" component="h2">
          {item.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {item.details}
        </Typography>
        <Typography variant="body2" component="p">
          {item.code}
        </Typography>
        { item.picture === true &&
          <Avatar alt={item.name} src={`${config.staticUrl}/static/thumbnails/items/${item.id}.jpg`} className={classes.bigAvatar} />
        }
      </CardContent>
      <CardActions>
        <Button onClick={() => handleAddPicture()} size="small"><FormattedMessage id="camera.add" defaultMessage="Add picture" /></Button>
      </CardActions>
      </Card>
 */}


    </React.Fragment>
      );
}
export default injectIntl(withSnackbar(withUserInfo(withItemCharacteristics(withItems(withStyles(styles)(intItemCard))))));

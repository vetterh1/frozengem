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

import config from '../../data/config'


import WebcamCapture from './WebcamCapture';


const messages = defineMessages({ 
  error: {
    id: 'item.update_picture.error',
    defaultMessage: 'Sorry, saving this picture failed. Please try again...',
  },
});



const styles = theme => ({
  layout: {
    width: 'auto',
    padding: `${theme.spacing(2)}px 0`,
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
});





const intItemCard = ({item, onItemChange, classes, intl,items, userInfo, enqueueSnackbar}) => {
  const [cameraDialogState, setCameraDialogState] = React.useState(false);

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
      console.log('itemUpdated: ', itemUpdated);
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
    <React.Fragment>>

      <WebcamCapture
        open={cameraDialogState}
        onClose={() => closeCameraDialog()}
        onPicture={(data) => onPicture(data)}
      />

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
    </React.Fragment>
      );
}
export default injectIntl(withSnackbar(withUserInfo(withItemCharacteristics(withItems(withStyles(styles)(intItemCard))))));

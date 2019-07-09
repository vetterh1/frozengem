
import React from 'react';
import { injectIntl, defineMessages } from "react-intl";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { withStyles } from '@material-ui/core/styles';
import Webcam from "react-webcam";



const messages = defineMessages({ 
    title: {
      id: 'camera.title',
      defaultMessage: 'Take a picture!',
    }
  });
  

const styles = theme => ({
    layout: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    margin: {
        marginTop: theme.spacing(1),
      },
    center: {
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },    
  });
  
  
  

const WebcamCapture = ({open, onPicture, onClose, classes, intl}) => {
    let webcam = React.createRef();

    const capture = () => {
      const imageSrc = webcam.current.getScreenshot();
    //   console.log('catpure:', imageSrc);
      onPicture(imageSrc);
    };
  

    const videoConstraints = {
    width: 600,
    height: 800,
    facingMode: "environment"
    };
  
    const title = intl.formatMessage(messages.title);

    return (
        <Dialog fullScreen open={open} onClose={onClose} >
            <DialogTitle id="customized-dialog-title" onClose={onClose}>
                {title}
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>                
            </DialogTitle>
            <DialogContent dividers>
                <Webcam
                    audio={false}
                    height={'80%'}
                    ref={webcam}
                    screenshotFormat="image/jpeg"
                    width={'100%'}
                    videoConstraints={videoConstraints}
                />
            </DialogContent>
            <DialogActions className={classes.center}>
                <Fab 
                    onClick={capture} 
                    color="primary" 
                    aria-label={title} 
                >
                    <CameraAltIcon />
                </Fab>
            </DialogActions>              

        </Dialog>
    );
}
  
export default injectIntl(withStyles(styles)(WebcamCapture));
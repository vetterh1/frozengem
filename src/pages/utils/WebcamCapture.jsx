
import React from 'react';
import Fab from '@material-ui/core/Fab';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { withStyles } from '@material-ui/core/styles';
import Webcam from "react-webcam";


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
  });
  
  
  

const WebcamCapture = ({onClick, classes}) => {
    let webcam = React.createRef();

    const capture = () => {
      const imageSrc = webcam.current.getScreenshot();
      console.log('catpure:', imageSrc);
      onClick(imageSrc);
    };
  

    const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "environment"
    };
  
    return (
        <div className={classes.layout}>

                <Webcam
                    audio={false}
                    height={'100%'}
                    ref={webcam}
                    screenshotFormat="image/jpeg"
                    width={'100%'}
                    videoConstraints={videoConstraints}
                />
                <Fab 
                    onClick={capture} 
                    color="secondary" 
                    aria-label="Take picture" 
                    className={classes.margin}>
                    <CameraAltIcon />
                </Fab>
        </div>          

    );
}
  
export default withStyles(styles)(WebcamCapture);
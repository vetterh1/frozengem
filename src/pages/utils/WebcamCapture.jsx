
import React from 'react';
import Webcam from "react-webcam";



const WebcamCapture = ({onClick}) => {
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
        <div>
            <Webcam
            audio={false}
            height={350}
            ref={webcam}
            screenshotFormat="image/jpeg"
            width={350}
            videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
        </div>
    );
}
  
export default WebcamCapture;
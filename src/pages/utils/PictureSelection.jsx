
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import readAsDataURLAsync from '../../utils/readAsDataURLAsync';
import stringifyOnce from '../../utils/stringifyOnce.js'
import canvasToBlobAsync from '../../utils/canvasToBlobAsync.js'
import createImageAsync from '../../utils/createImageAsync.js'
import sizeInMB from '../../utils/sizeInMB'



const styles = theme => ({
    button: {
      margin: theme.spacing(1),
    },  
    input: {
      display: 'none',
    },  
  });
  
  const PictureSelection = ({label, onPicture, classes}) => {


    const resizePicture = async (img, MAX_WIDTH = 800, MAX_HEIGHT = 800) => {

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var width = img.width;
        var height = img.height;

        console.log(`resizePicture: image width=${width}, height=${height}`);


        if (width > height) {
            if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        console.log(`resizePicture: canvas width=${canvas.width}, height=${canvas.height}`);

        return await canvasToBlobAsync(canvas);
    }


    const onInputChange = async (e) => {
        if(e.target.files.length < 1) return null;

        // Read the raw image data
        const file = e.target.files[0];
        const fileContent = await readAsDataURLAsync(file);
        console.log(`file: `, file, ` (length: ${sizeInMB(fileContent.length)})`);

        // Create an <img> with it (full size)
        const img = await createImageAsync(fileContent);
        console.log(`resizePicture: 0 image width=${img.width}, height=${img.height}`);

        // Resize the image and get is as binary data
        const resizedPictureBlob = await resizePicture(img);
        console.log(`after resize: length: ${sizeInMB(resizedPictureBlob.size)}`);

        // Resize again for thumbnail and get is as binary data
        const resizedThumbnailBlob = await resizePicture(img, 400, 400);
        console.log(`thumbnail after resize: length: ${sizeInMB(resizedThumbnailBlob.size)}`);

        // Call the props when it's done for saving
        onPicture(resizedPictureBlob, resizedThumbnailBlob);    
    };


  
  
    return (
        <>
            <input
                accept="image/x-png,image/jpeg,image/gif"
                className={classes.input}
                id="button-choose-picture"
                type="file"
                onChange={onInputChange}
            />
            <label htmlFor="button-choose-picture">
                <Button component="span"size="small" color="primary" className={classes.button}>
                    {label}
                </Button>
            </label>
        </>
    );
}
  
export default withStyles(styles)(PictureSelection);
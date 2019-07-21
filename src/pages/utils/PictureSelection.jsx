
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import readAsDataURLAsync from '../../utils/readAsDataURLAsync';
// import stringifyOnce from '../../utils/stringifyOnce.js'
import canvasToBlobAsync from '../../utils/canvasToBlobAsync.js'
import createImageAsync from '../../utils/createImageAsync.js'
import sizeInMB from '../../utils/sizeInMB'
import getExifTagsAsync from '../../utils/getExifTagsAsync'


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

        const exifTags = await getExifTagsAsync(img);
        console.log(`resizePicture: exifTags=`, exifTags);

        const orientation = exifTags.Orientation;
        if ([5, 6, 7, 8].indexOf(orientation) > -1) {
            canvas.width = img.height;
            canvas.height = img.width;
          } else {
            canvas.width = img.width;
            canvas.height = img.height;
          }


        var ctx = canvas.getContext("2d");


        switch (orientation) {
            case 2:
              ctx.transform(-1, 0, 0, 1, img.width, 0);
              break;
            case 3:
              ctx.transform(-1, 0, 0, -1, img.width, img.height);
              break;
            case 4:
              ctx.transform(1, 0, 0, -1, 0, img.height);
              break;
            case 5:
              ctx.transform(0, 1, 1, 0, 0, 0);
              break;
            case 6:
              ctx.transform(0, 1, -1, 0, img.height, 0);
              break;
            case 7:
              ctx.transform(0, -1, -1, 0, img.height, img.width);
              break;
            case 8:
              ctx.transform(0, -1, 1, 0, 0, img.width);
              break;
            default:
              ctx.transform(1, 0, 0, 1, 0, 0);
          }
    
          ctx.drawImage(img, 0, 0, img.width, img.height);

/*



        ctx.drawImage(img, 0, 0);

        var width = canvas.width;
        var height = canvas.height;

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
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
*/
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
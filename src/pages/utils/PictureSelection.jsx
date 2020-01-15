
import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import readAsDataURLAsync from '../../utils/readAsDataURLAsync';
// import stringifyOnce from '../../utils/stringifyOnce.js'
import canvasToBlobAsync from '../../utils/canvasToBlobAsync.js'
import createImageAsync from '../../utils/createImageAsync.js'
// import sizeInMB from '../../utils/sizeInMB'
import getExifTagsAsync from '../../utils/getExifTagsAsync'


const styles = theme => ({
    button : {
      padding: theme.spacing(2),
      // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    }, 
    buttonContentFlexVertical : {
      display: 'flex',
      flexDirection: 'column',
    },  
    buttonIconOnly: {
      padding: 0,
    },
    leftIcon: {
      marginRight: theme.spacing(1),
    },
    hiddenInput: {
      display: 'none',
    },  
  });
  
  const PictureSelection = ({itemId, label, iconOnlyButton, hugeIcon, onPicture, className, classes}) => {


    const resizePicture = async (img, MAX_WIDTH = 800, MAX_HEIGHT = 800) => {

      var canvas = document.createElement("canvas");

      const exifTags = await getExifTagsAsync(img);
      // console.log(`resizePicture: exifTags=`, exifTags);

      const orientation = exifTags.Orientation;
      let turn = ([5, 6, 7, 8].indexOf(orientation) > -1);
      let w = img.width;
      let h = img.height;
      if(turn) {
          w = img.height;
          h = img.width;
      }

      if (w > h) {
          if (w > MAX_WIDTH) {
            h *= MAX_WIDTH / w;
            w = MAX_WIDTH;
          }
      } else {
          if (h > MAX_HEIGHT) {
            w *= MAX_HEIGHT / h;
            h = MAX_HEIGHT;
          }
      }

      canvas.width = w;
      canvas.height = h;

      // const msg2 = `resizePicture: to... w=${w}, h=${h}, o=${orientation}`;
      // console.log(msg2);
      // alert(msg2);

      var ctx = canvas.getContext("2d");


      switch (orientation) {
          case 2:
            ctx.transform(-1, 0, 0, 1, canvas.width, 0);
            break;
          case 3:
            ctx.transform(-1, 0, 0, -1, canvas.width, canvas.height);
            break;
          case 4:
            ctx.transform(1, 0, 0, -1, 0, canvas.height);
            break;
          case 5:
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
          case 6:
            ctx.transform(0, 1, -1, 0, canvas.width, 0);
            break;
          case 7:
            ctx.transform(0, -1, -1, 0, canvas.height, canvas.width);
            break;
          case 8:
            ctx.transform(0, -1, 1, 0, 0, canvas.width);
            break;
          default:
            ctx.transform(1, 0, 0, 1, 0, 0);
        }
  
        ctx.drawImage(img, 0, 0, turn ? h : w, turn ? w : h);


      return await canvasToBlobAsync(canvas);
  }








    const onInputChange = async (e) => {
        if(e.target.files.length < 1) return null;

        // Read the raw image data
        const file = e.target.files[0];
        const fileContent = await readAsDataURLAsync(file);
        // console.log(`file: `, file, ` (length: ${sizeInMB(fileContent.length)})`);

        // Create an <img> with it (full size)
        const img = await createImageAsync(fileContent);
        // console.log(`resizePicture: 0 image width=${img.width}, height=${img.height}`);

        // Resize the image and get is as binary data
        const resizedPictureBlob = await resizePicture(img);
        // console.log(`after resize: length: ${sizeInMB(resizedPictureBlob.size)}`);

        // Resize again for thumbnail and get is as binary data
        const resizedThumbnailBlob = await resizePicture(img, 400, 400);
        // console.log(`thumbnail after resize: length: ${sizeInMB(resizedThumbnailBlob.size)}`);

        // Call the props when it's done for saving
        onPicture(resizedPictureBlob, resizedThumbnailBlob);    
    };


    const iconStyle = hugeIcon ? { fontSize: 96 } : {};
    const specialClasses = (hugeIcon && !iconOnlyButton) ? {label: classes.buttonContentFlexVertical} : {};
    const idInput = `input-${itemId}`

    return (
        <>
          <input
              accept="image/x-png,image/jpeg,image/gif"
              className={classes.hiddenInput}
              id={idInput}
              type="file"
              onChange={onInputChange}
          />
          <label htmlFor={idInput}>
            <>
              { !iconOnlyButton &&
                <Button component="span" size="small" color="primary" className={classes.button} classes={specialClasses}>
                  <PhotoCameraIcon  className={classes.leftIcon} style={iconStyle} />
                  <span>{label}</span>
                </Button>
              }
              { iconOnlyButton &&
                <IconButton component="span"  color="primary" aria-label={label} className={clsx(classes.buttonIconOnly, className)}>
                  <PhotoCameraIcon style={iconStyle} />
                </IconButton> 
              }              
            </>
          </label>
        </>
    );
}
  
export default withStyles(styles)(PictureSelection);
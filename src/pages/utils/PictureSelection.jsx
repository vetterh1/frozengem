
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import readAsDataURLAsync from '../../utils/readAsDataURLAsync';
import stringifyOnce from '../../utils/stringifyOnce.js'



const styles = theme => ({
    button: {
      margin: theme.spacing(1),
    },  
    input: {
      display: 'none',
    },  
  });
  
  const PictureSelection = ({label, onPicture, classes}) => {


    const resizePicture = (img) => {

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        var MAX_WIDTH = 500;
        var MAX_HEIGHT = 500;
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

        return canvas.toDataURL("image/png");
    }


    const onInputChange = async (e) => {
        if(e.target.files.length < 1) return null;
        const file = e.target.files[0];
        const fileContent = await readAsDataURLAsync(file);
        console.log(`file: `, file, ` (length: ${Math.round((fileContent.length / 1024 / 1024) * 100) / 100}MB)`);
        // console.log('fileContent', fileContent)

        // var img = document.querySelector('img');
        var img = new Image();

        img.onload = function () {
            console.log(`resizePicture: 0 image width=${img.width}, height=${img.height}`);

            const resizedPicture = resizePicture(img);
    
            console.log(`after resize: length: ${Math.round((resizedPicture.length / 1024 / 1024) * 100) / 100}MB`);
            // console.log('resizedPicture', resizedPicture)

            // Call the props when it's done...
            onPicture(resizedPicture);    
        };

        // var img = document.createElement("img");
        img.src = fileContent;
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
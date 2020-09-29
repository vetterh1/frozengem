import React from "react";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import readAsDataURLAsync from "../../utils/readAsDataURLAsync";
// import stringifyOnce from '../../utils/stringifyOnce.js'
import canvasToBlobAsync from "../../utils/canvasToBlobAsync.js";
import createImageAsync from "../../utils/createImageAsync.js";
// import sizeInMB from '../../utils/sizeInMB'
import getExifTagsAsync from "../../utils/getExifTagsAsync";
import { gtmPush } from "../../utils/gtmPush";

const styles = (theme) => ({
  button: {
    padding: theme.spacing(2),
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  },
  buttonContentFlexVertical: {
    display: "flex",
    flexDirection: "column",
  },
  buttonIconOnly: {
    padding: 0,
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  hiddenInput: {
    display: "none",
  },
});

const PictureSelection = ({
  itemId,
  label,
  iconOnlyButton = true,
  iconStyle = {},
  labelUnderIcon = false,
  onPicture,
  className,
  classes,
}) => {

  console.debug("PictureSelection.init: itemId, className, iconOnlyButton = ", itemId, className, iconOnlyButton);

/*
  const resizePicture = async (img, quality = 0.7, MAX_WIDTH = 1200, MAX_HEIGHT = 1200) => {
    var canvas = document.createElement("canvas");

    const exifTags = await getExifTagsAsync(img);
    // alert(`resizePicture: w=${img.width} h=${img.height} exifTags=${stringifyOnce(exifTags)}`);

    // ----- S9 & iPad -----
    // 000°: 6 (portrait std)
    // 090°: 3 (landscape left)
    // 180°: 8 (portrait upside down)
    // 270°: 1 (landscape right)
    
    
    const orientation = exifTags.Orientation;
    let turn = [5, 6, 7, 8].indexOf(orientation) > -1;
    let w = img.width;
    let h = img.height;
    if (turn) {
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

    return await canvasToBlobAsync(canvas, quality);
  };
*/



  const resizePicture2 = async (img, quality = 0.7, MAX_WIDTH = 1000, MAX_HEIGHT = 1000) => {
    var canvas = document.createElement("canvas");

    const exifTags = await getExifTagsAsync(img);
    // alert(`resizePicture: w=${img.width} h=${img.height} exifTags=${stringifyOnce(exifTags)}`);

    // ----- S9 & iPad -----
    // 000°: 6 (portrait std)
    // 090°: 3 (landscape left)
    // 180°: 8 (portrait upside down)
    // 270°: 1 (landscape right)

    //
    // Rule (ex with F)
    //
    // 1        2       3      4         5            6           7          8
    //
    // 888888  888888      88  88      8888888888  88                  88  8888888888
    // 88          88      88  88      88  88      88  88          88  88      88  88
    // 8888      8888    8888  8888    88          8888888888  8888888888          88
    // 88          88      88  88
    // 88          88  888888  888888

    // !!! It means Samsung & Apple consider orientation 1 being with the phone
    // in LANSCAPE mode (physically) !!!
    
    let orientation = exifTags.Orientation;

    // Get width & height
    // and invert them if landscape
    // as we want to store portrait images
    // (mobile 1st!)
    let w = img.width;
    let h = img.height;
    const portrait = w <= h;

    // So we change the orientation to follow the "rule" (normal portrait = 1 and not 6)
    if(portrait)
      orientation = orientation - 5;
    else
      orientation = orientation + 5;

    if (!portrait) {
      w = img.height;
      h = img.width;
    }

    // Scale down if too big
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

    // Canvas will always be in portrait mode
    // and scale to the max width/height if necessary
    canvas.width = w;
    canvas.height = h;

    // const msg2 = `portrait= ${portrait}, orientation=${orientation}, w=${w}, h=${h}`;
    // console.log(msg2);
    // alert(msg2);

    var ctx = canvas.getContext("2d");

    switch (orientation) {
      case 3:
        ctx.transform(-1, 0, 0, -1, canvas.width, canvas.height);
        break;
      case 6:
        ctx.transform(0, 1, -1, 0, canvas.width, 0);
        break;
      case 8:
        ctx.transform(0, -1, 1, 0, 0, canvas.height);
        break;
      default:
        ctx.transform(1, 0, 0, 1, 0, 0);
    }

    ctx.drawImage(img, 0, 0, portrait ? w : h, portrait ? h : w);


    return await canvasToBlobAsync(canvas, quality);
  };







  const onInputChange = async (e) => {
    console.debug("onInputChange", e);
    if (e.target.files.length < 1) {
      gtmPush({
        event: "Details",
        action: "CameraCancel",
      });
      return null;
    }

    // Read the raw image data
    const file = e.target.files[0];
    const fileContent = await readAsDataURLAsync(file);
    // console.log(`file: `, file, ` (length: ${sizeInMB(fileContent.length)})`);

    // Create an <img> with it (full size)
    const img = await createImageAsync(fileContent);
    // console.log(`resizePicture: 0 image width=${img.width}, height=${img.height}`);

    // Resize the image and get is as binary data
    // const resizedPictureBlob = await resizePicture(img, 0.85);
    const resizedPictureBlob = await resizePicture2(img, 0.80);
    // console.log(`after resize: length: ${sizeInMB(resizedPictureBlob.size)}`);

    // Resize again for thumbnail and get is as binary data
    // const resizedThumbnailBlob = await resizePicture(img, 0.45, 600, 600);
    const resizedThumbnailBlob = await resizePicture2(img, 0.45, 600, 600);
    // console.log(`thumbnail after resize: length: ${sizeInMB(resizedThumbnailBlob.size)}`);

    // Call the props when it's done for saving
    onPicture(resizedPictureBlob, resizedThumbnailBlob);

    gtmPush({
      event: "Details",
      action: "CameraChange",
    });
  };

  function _handleClickOpen(e) {
    // e.stopPropagation();  Don't stop propagation as this is just to push a gtm tag
    gtmPush({
      event: "Details",
      action: "CameraOpen",
    });
  }

  const specialClasses = labelUnderIcon
    ? { label: classes.buttonContentFlexVertical }
    : {};
  const idInput = `input-${itemId}`;

  return (
    <>
      <input
        accept="image/x-png,image/jpeg,image/gif"
        className={classes.hiddenInput}
        id={idInput}
        type="file"
        onChange={onInputChange}
      />
      <label htmlFor={idInput} id={`label-for-${idInput}`}>
        <>
          {!iconOnlyButton && (
            <Button
              id={`button-for-${idInput}`}
              component="span"
              size="small"
              color="primary"
              className={classes.button}
              classes={specialClasses}
              onClick={_handleClickOpen}
            >
              <PhotoCameraIcon className={classes.leftIcon} style={iconStyle} />
              <span>{label}</span>
            </Button>
          )}
          {iconOnlyButton && (
            <IconButton
              id={`button-for-${idInput}`}
              component="span"
              color="primary"
              aria-label={label}
              className={clsx(classes.buttonIconOnly, className)}
              onClick={_handleClickOpen}
            >
              <PhotoCameraIcon style={iconStyle} />
            </IconButton>
          )}
        </>
      </label>
    </>
  );
};

export default withStyles(styles)(PictureSelection);

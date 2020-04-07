import React from "react";
import { withStyles } from "@material-ui/core/styles";
import DialogMinimalHugeMiddleBtn from "./DialogMinimalHugeMiddleBtn";
import PictureSelection from "./PictureSelection";
import { gtmPush } from "../../utils/gtmPush";
// import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
// import ButtonToModal from "./ButtonToModal";
// import { IconRemove } from "../../data/Icons";



const styles = () => ({
  button: {
    display: "flex"
  },
});



const PictureModalSelection = ({
  onPicture,
  onCancel,
  open,
  classes,
}) => {


  function handleClose() {
    gtmPush({
      event: "Details",
      action: "CameraCancel",
    });

    onCancel();
  }



  return (
    <DialogMinimalHugeMiddleBtn
      id="details_choose_picture"
      idTitle="camera.add"
      idSubtitle="camera.add.subtitle"
      idCancel="button.later"
      idOk="item.remove.confirmation.ok"
      handleButtonClick={onPicture}
      handleClose={handleClose}
      open={open}
      button={
        <PictureSelection
          onPicture={onPicture}
          className={classes.button}
          iconStyle={{ fontSize: 72 }}
        />  
      }
    >
      {/* <PictureSelection
        className={clsx(
          classes.details_image_camera,
          (!item || !item.pictureName) && "stitched",
          "cam_icon"
        )}
        itemId={item ? item.id : null}
        iconOnlyButton
        onPicture={_handleSavePicture}
        label={intl.formatMessage({
          id: item && item.__imageExists ? "camera.replace" : "camera.add"
        })}
      />     */}
    </DialogMinimalHugeMiddleBtn>
  );
};

export default withStyles(styles)(PictureModalSelection);

/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CardMedia } from "@material-ui/core";
import config from "../../data/config";
import { getIconComponent } from "../../data/Icons";

const useStyles = makeStyles({
  media: { borderRadius: "3px" }, // a style rule

  details_image_close: {
    position: "fixed",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "5px",
    color: "white",
    zIndex: "2001"
  }
});

const ItemImage = ({ item, forceThumbnail = false, style = null }) => {
  if (!style)
    style = {
      height: "150px",
      width: "150px"
    };

  const imageExists = item.pictureName || item.thumbnailName;

  // No image, display the category icon instead!
  if (!imageExists) {
    const styleIcon = {
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      ...style
    };

    const IconCategory = getIconComponent("category" + item.category);
    return (
      <div style={styleIcon}>
        <IconCategory fontSize="large" />
      </div>
    );
  }

  const [expanded, setExpanded] = React.useState(false);
  const handleExpanded = () => {
    // window.scrollTo(0, 0);
    setExpanded(prev => !prev);
  };
  // const thumbnailsOrPictures = expanded ? item.pictureName : item.thumbnailName;
  const thumbnailsOrPictures = expanded || !forceThumbnail ? item.pictureName : item.thumbnailName;

  if (expanded) {
    style = {
      position: "fixed",
      top: "0px",
      left: "0px",
      height: "100vh",
      width: "100%",
      zIndex: "2000"
    };
  }

  const classes = useStyles();

  return (
    <>
      <CardMedia
        onClick={handleExpanded}
        style={style}
        image={`${config.staticUrl}/static/pictures/items/${thumbnailsOrPictures}`}
        title={item.description}
        className={classes.media}
      />
      {expanded && (
        <Button
          onClick={handleExpanded}
          color="primary"
          className={classes.details_image_close}
        >
          X
        </Button>
      )}
    </>
  );
};

ItemImage.propTypes = {
  item: PropTypes.object.isRequired,
  style: PropTypes.object
};

export default ItemImage;

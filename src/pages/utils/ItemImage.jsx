/* eslint-disable react-hooks/rules-of-hooks */ 
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Button, CardMedia } from "@material-ui/core";
import config from '../../data/config'
import { getIcon } from "../../data/Icons";


const regularHeight = '150px';
const expandedHeight = '100%';


const useStyles = makeStyles({
  media: {borderRadius: '3px'}, // a style rule

  details_image_close: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "5px",
    color: "white",
    zIndex: '2001',      
  },  
});


const ItemImage = ({item, thumbnailSize = null, timestampClickAway = 0}) => {

  const imageExists = item.pictureName || item.thumbnailName;
  
  // No image, display the category icon instead!
  if(!imageExists) {
    return (
      <div>
        {getIcon("category"+item.category)}
      </div>
    )
  }

  const [expanded, setExpanded] = React.useState(false);
  const handleExpanded = () => { setExpanded(prev => !prev); }

  // If user clicks away from parent, close this image:
  const [previousTimestampClickAway, setPreviousTimestampClickAway] = React.useState(timestampClickAway);
  if(timestampClickAway !== 0 && timestampClickAway !== previousTimestampClickAway) {
    setPreviousTimestampClickAway(timestampClickAway);
    setExpanded(false);
  }

  const thumbnailsOrPictures = expanded ? item.pictureName : item.thumbnailName;

  
  let style = {};
  if(thumbnailSize) {
    const stringSize = `${thumbnailSize}px`;
    if(expanded){
      style = {
        position: 'absolute',
        top: '0px',
        left: '0px',
        height: '100%',
        width: '100%',
        zIndex: '2000',      
      };
    } else {
      style = {
        height: stringSize,
        width: stringSize,
      };
    }
  } else {
    style = {
      minHeight: expanded ? expandedHeight : regularHeight
    };
  }

  const classes = useStyles();

   
  return (
    <>
      <CardMedia
        onClick={handleExpanded}
        style={style}
        image={`${config.staticUrl}/static/pictures/items/${thumbnailsOrPictures}`}
        title={item.name}
        className={classes.media}
      />
      { expanded && 
        <Button
          onClick={handleExpanded}
          color="primary"
          className={classes.details_image_close}
        >
          X
        </Button>
      }
    </>
  );
}

ItemImage.propTypes = {
  item: PropTypes.object.isRequired,
  thumbnailSize: PropTypes.number,
  timestampClickAway: PropTypes.number,
}


export default ItemImage;
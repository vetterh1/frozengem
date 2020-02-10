/* eslint-disable react-hooks/rules-of-hooks */ 
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardMedia } from "@material-ui/core";
import config from '../../data/config'
import { getIcon } from "../../data/Icons";

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


const ItemImage = ({item, style = null}) => {

  const imageExists = item.pictureName || item.thumbnailName;
  
  // No image, display the category icon instead!
  if(!imageExists) {
    return (
      <div>
        {getIcon("category"+item.category)}
      </div>
    )
  }

  if(!style)
    style = {
      height: "150px",
      width: "150px",
    };

  const [expanded, setExpanded] = React.useState(false);
  const handleExpanded = () => { setExpanded(prev => !prev); }
  const thumbnailsOrPictures = expanded ? item.pictureName : item.thumbnailName;

  if(expanded){
    style = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      height: "100vh",
      width: "100vw",
      zIndex: '2000',      
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
  style: PropTypes.object,
}


export default ItemImage;
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import config from '../../data/config'
import { getIcon } from "../../data/Icons";


const regularHeight = '150px';
const expandedHeight = '400px';


const useStyles = makeStyles({
  media: {borderRadius: '3px'}, // a style rule
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
    style = {
      height: expanded ? expandedHeight : stringSize,
      width: expanded ? expandedHeight : stringSize,
    };
  } else {
    style = {
      minHeight: expanded ? expandedHeight : regularHeight
    };
  }

  const classes = useStyles();

   
  return (
    <CardActionArea
      style={style}
      onClick={handleExpanded}
      disableRipple={true}
    >
      <CardMedia
        style={style}
        image={`${config.staticUrl}/static/pictures/items/${thumbnailsOrPictures}`}
        title={item.name}
        className={classes.media}
      />
    </CardActionArea>
  );
}

ItemImage.propTypes = {
  item: PropTypes.object.isRequired,
  thumbnailSize: PropTypes.number,
  timestampClickAway: PropTypes.number,
}


export default ItemImage;
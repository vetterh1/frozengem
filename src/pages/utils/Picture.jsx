import React from 'react';
import PropTypes from 'prop-types';
import { getIconComponent } from "data/Icons";


const Picture = ({ 
  // From caller
  className, 
  imageUrl, 
  itemCategory, 
  imageAlt, 
  type = "item", 
  maxResolution 
}) => {


  // No image, display the category icon instead!
  if (!imageUrl) {
    const styleIcon = {
      justifyContent: "center",
      display: "flex",
      alignItems: "center"
    };

    const IconCategory = getIconComponent("category" + itemCategory);
    return (
      <div style={styleIcon} className={className}>
        <IconCategory style={{ fontSize: 200 }}  />
      </div>
    );
  }



  const mobileImageSrc = prepareImageUrl(imageUrl, type, 576);
  const smallImageSrc = prepareImageUrl(imageUrl, type, 768);
  const mediumImageSrc = prepareImageUrl(imageUrl, type, 1178);
  const hdImageSrc = prepareImageUrl(imageUrl, type, 1640);

  const maxResImageUrl = maxResolution && prepareImageUrl(imageUrl, type, maxResolution);

  return (
    <picture className={className}>
      {!maxResolution &&
        <React.Fragment>
          <source srcSet={hdImageSrc} media="(min-width: 1920px)" />
          <source srcSet={mediumImageSrc} media="(min-width: 768px)" />
          <source srcSet={smallImageSrc} media="(min-width: 576px)" />
        </React.Fragment>
      }
      <img src={maxResolution ? maxResImageUrl : mobileImageSrc} alt={imageAlt}  style={{width:"100%", height:"100%"}} />
    </picture>
  );
};

Picture.propTypes = {
  // From caller
  className: PropTypes.string,
  imageUrl: PropTypes.string,
  type: PropTypes.string,
  imageAlt: PropTypes.string,
  maxResolution: PropTypes.number
};

const prepareImageUrl = (url, type, width) => {
  return url.replace(/\?.+/g, '') + `?type=${type}&width=${width}`;
};

export default Picture;
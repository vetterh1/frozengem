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

  const [imageLoaded, setImageLoaded] = React.useState(false);

  const IconCategory = getIconComponent("category" + itemCategory);
  const styleIcon = {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    paddingTop: "calc(50% - 50px)",
    paddingBottom: "calc(50% - 50px)",
    fontSize: "100px",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  };  
  const ImagePlaceholder =  () => (
    <div style={styleIcon} className={className}>
      <IconCategory fontSize="inherit" />
    </div>
  );

  // No image, display the category icon instead!
  if (!imageUrl) return <ImagePlaceholder />;



  const mobileImageSrc = prepareImageUrl(imageUrl, type, 576);
  const smallImageSrc = prepareImageUrl(imageUrl, type, 768);
  const mediumImageSrc = prepareImageUrl(imageUrl, type, 1178);
  const hdImageSrc = prepareImageUrl(imageUrl, type, 1640);

  const maxResImageUrl = maxResolution && prepareImageUrl(imageUrl, type, maxResolution);

  const imageStyle = !imageLoaded ? { display: "none" } : {};

  return (
    // <ImagePlaceholder />
    <>
      {!imageLoaded && <ImagePlaceholder />}
      <picture className={className} onLoad={() => setImageLoaded(true)}  style={imageStyle} >
        {!maxResolution &&
          <React.Fragment>
            <source srcSet={hdImageSrc} media="(min-width: 1920px)" />
            <source srcSet={mediumImageSrc} media="(min-width: 768px)" />
            <source srcSet={smallImageSrc} media="(min-width: 576px)" />
          </React.Fragment>
        }
        <img src={maxResolution ? maxResImageUrl : mobileImageSrc} alt={imageAlt}  style={{width:"100%", height:"100%", display: imageLoaded ? "block" : "none"}} />
      </picture>
    </>
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
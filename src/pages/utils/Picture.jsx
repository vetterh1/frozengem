import React from 'react';
import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import './Picture.scss';

const Picture = ({ className, imageUrl, imageAlt, type = "item", aspectRatio, maxResolution }) => {
    // const pictureClass = classnames(
    //     'picture', className, { 'picture--aspect-ratio': aspectRatio }
    //   );
    const pictureClass = className;      

  const mobileImageSrc = prepareImageUrl(imageUrl, type, 576);
  const smallImageSrc = prepareImageUrl(imageUrl, type, 768);
  const mediumImageSrc = prepareImageUrl(imageUrl, type, 1178);
  const hdImageSrc = prepareImageUrl(imageUrl, type, 1640);

  const maxResImageUrl = maxResolution && prepareImageUrl(imageUrl, type, maxResolution);

  return (
    <picture className={pictureClass}>
      {!maxResolution &&
        <React.Fragment>
          <source srcSet={hdImageSrc} media="(min-width: 1920px)" />
          <source srcSet={mediumImageSrc} media="(min-width: 768px)" />
          <source srcSet={smallImageSrc} media="(min-width: 576px)" />
        </React.Fragment>
      }
      <img src={maxResolution ? maxResImageUrl : mobileImageSrc} alt={imageAlt}  style={{width:"100%"}} />
    </picture>
  );
};

Picture.propTypes = {
  className: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  type: PropTypes.string,
  imageAlt: PropTypes.string,
  aspectRatio: PropTypes.bool,
  maxResolution: PropTypes.number
};

const prepareImageUrl = (url, type, width) => {
  return url.replace(/\?.+/g, '') + `?type=${type}&width=${width}`;
};

export default Picture;
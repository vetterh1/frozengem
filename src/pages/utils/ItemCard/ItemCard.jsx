/* eslint-disable react-hooks/rules-of-hooks */

// React
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
// HOC
import { injectIntl } from "react-intl";
// MUI
import { Typography } from "@material-ui/core";
// Components
import Picture from "pages/utils/Picture";
// Configuration
import config from "data/config";
// Styles
import useStyles from "./stylesItemCard";



const intItemCard = ({ 
  // From caller
  item, 
  density,

  // From other HOC
  intl 
}) => {
  // console.debug(`[--- FC ---] Functional component: ItemCard - item=${item.id}`);

  const [toDetails, setToDetails] = React.useState(false);

  const classes = useStyles(density);

  const handleClickForDetails = (e) => {
    setToDetails(true);
    e.stopPropagation();
  };

  if (toDetails === true) {
    // use Redirect push to keep the history (without the push, it replaces the url and does not keep the previous page)
    return <Redirect push to={`/details/${item.id}`} />;
  }


  return (
    <div className={classes.cardAndSeparation}>
      <div className={classes.card} onClick={handleClickForDetails}>
        <Picture
          imageUrl={item.pictureName ?`${config.staticUrl}/custom-size-image/${item.pictureName}` : null}
          imageAlt={item.__descriptionOrCategory}
          itemCategory={item.category}
          maxResolution={250}
          className={classes.cardImage}/>
        <div className={classes.cardText}>
          <div className={classes.cardMain}>
            <Typography gutterBottom variant="h4">{item.__descriptionOrCategory}</Typography>
            <Typography gutterBottom color="textSecondary">{item.__sizeInText}</Typography>
            <Typography gutterBottom color="textSecondary">{intl.formatMessage(item.__expirationText)}</Typography>
          </div>
          <Typography className={classes.details_image_code} color="textSecondary" component="p" >{item ? item.code : "-"}</Typography>
        </div>      
      </div>
      <div className={classes.separation} />
    </div>
  );
};



intItemCard.propTypes = {
  // Props from caller
  item: PropTypes.object,
  density: PropTypes.oneOf([1, 2, 3]),

  // Props from other HOC
  intl: PropTypes.object.isRequired,
};

export default injectIntl(intItemCard);

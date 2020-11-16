/* eslint-disable react-hooks/rules-of-hooks */

// React
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
// HOC
import { injectIntl } from "react-intl";
// MUI
import Skeleton from '@material-ui/lab/Skeleton';
import { Typography } from "@material-ui/core";
// Components
import Picture from "pages/utils/Picture";
import SizeInIcons from "pages/utils/SizeInIcons";
// Configuration
import config from "data/config";
// Styles
import { getIconComponent } from "data/Icons";
import useStyles from "./stylesItemCard";



const intItemCard = ({ 
  // From caller
  item, 
  density,

  // From other HOC
  intl 
}) => {
  // console.debug(`[--- FC ---] Functional component: ItemCard - item=${item?.id}`);

  const [toDetails, setToDetails] = React.useState(false);

  // // No item --> display a skeleton!
  // if(!item) {

  // }

  // Create Size icon array
  const sizeInIcons = item ? SizeInIcons(item?.size) : null;
  const ExpirationLevelIcon = item ? getIconComponent(`expirationLevel${item?.__expirationLevel}`) : null;

  const classes = useStyles(density);

  const handleClickForDetails = (e) => {
    setToDetails(true);
    e.stopPropagation();
  };

  if (toDetails === true) {
    // use Redirect push to keep the history (without the push, it replaces the url and does not keep the previous page)
    return <Redirect push to={`/details/${item?.id}`} />;
  }


  return (
    <div className={classes.cardAndSeparation}>
      <div className={classes.card} onClick={handleClickForDetails}>
        <div className={classes.cardImageArea}>
          <Picture
            isSkeleton={!item}
            imageUrl={item?.pictureName ?`${config.staticUrl}/custom-size-image/${item?.pictureName}` : null}
            imageAlt={item?.__descriptionOrCategory}
            itemCategory={item?.category}
            maxResolution={250}
            className={classes.cardImage}
          />
        </div>
        <div className={classes.cardText}>
          <div className={classes.cardMain}>
            {<Typography gutterBottom variant="h4" noWrap style={{width: "100%"}}>{item ? item.__descriptionOrCategory : <Skeleton variant="text" width={150} /> }</Typography> }
            <Typography gutterBottom color="textSecondary">{item ? sizeInIcons : <Skeleton variant="text" width={100} />}</Typography>
            <div className={classes.cardExpiration}>
              {item ? <ExpirationLevelIcon fontSize="default"/> : <Skeleton variant="circle" width={30} height={30} />}
              <Typography gutterBottom color="textSecondary" className={classes.cardExpirationText}>{item ? intl.formatMessage(item?.__expirationText) : <Skeleton variant="text" width={100} />}</Typography>
            </div>
          </div>
          {item ? <Typography className={classes.cardCode} color="textSecondary" component="p" >{item?.code}</Typography> : <Skeleton variant="text" width={50} height={40} />}
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

/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
// import { fade } from "@material-ui/core/styles/colorManipulator";
import { Card, Typography } from "@material-ui/core";
import ItemImage from "./ItemImage";
import theme from "../../theme";





const stylesItemCard = (theme) => ({
  card: {
    display: "flex",
    flexDirection: "column",

    // zIndex: 10,

    // [theme.breakpoints.down("xs")]: {
    //   minWidth: `${sizeThumbnails}px`,
    //   maxWidth: `${sizeThumbnails}px`,
    // },
    // [theme.breakpoints.up("sm")]: {
    //   minWidth: `${sizeThumbnails+(theme.density-1)*100}px`,
    //   maxWidth: `${sizeThumbnails+(theme.density-1)*100}px`,
    // },

    borderRadius: "10px",

    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),


    backgroundColor: props => theme.transparency ? "transparent" : (props.index%2 === 0 ? theme.palette.itemCard.backgroundColor : theme.palette.itemCard.backgroundColorAlternate),
    backdropFilter: theme.transparency ? "blur(8px) contrast(0.4) brightness(1.5)" : null,
    boxShadow: "none",
  },

  cardPicture: {
    display: "flex",
    flexGrow: 0,
    justifyContent: "center",
    // [theme.breakpoints.down("xs")]: {
    //   width: `${sizeThumbnails}px`,
    // },
    // [theme.breakpoints.up("sm")]: {
    //   width: `${sizeThumbnails+(theme.density-1)*100}px`,
    // },
    alignSelf: "center",
    textAlign: "center",
  },

  cardText: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,

    padding: 0,
    margin: `${theme.spacing(1)}px`,
  },

  cardMain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    flexGrow: 1,
  },

  cardRight: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 0,

    // width: "85px",
    minWidth: "85px",
    maxWidth: "85px",

    // padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,

    justifyContent: "center",
    textAlign: "center",

    // borderRadius: "3px",

  },
  details_image_code: {
    display: "flex",
    alignSelf: "flex-end",
    justifySelf: "end",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "3px",
    padding: "0px 4px",
    color: "white",
  },
});

const intItemCard = ({ item, classes, intl, index, theme}) => {
  console.debug(
    `[--- FC ---] Functional component: ItemCard - item=${item.id}`, index
  );

  const [toDetails, setToDetails] = React.useState(false);


  const sizeThumbnails = 225+theme.density*25;


  const handleClickForDetails = (e) => {
    setToDetails(true);
    e.stopPropagation();
  };

  if (toDetails === true) {
    // use Redirect push to keep the history (without the push, it replaces the url and does not keep the previous page)
    return <Redirect push to={`/details/${item.id}`} />;
  }

  return (
    <Card className={classes.card} index={index}>
      <div className={classes.cardPicture}>
        <ItemImage
          item={item}
          forceThumbnail={true}
          style={{
            height: `${sizeThumbnails+(theme.density-1)*100}px`,
            width: `${sizeThumbnails+(theme.density-1)*100}px`,
            zIndex: "auto",
            opacity: "0.8",
          }}
        />
      </div>
      <div className={classes.cardText} onClick={handleClickForDetails}>
        <div className={classes.cardMain}>
          <Typography variant="h6">{item.__descriptionOrCategory}</Typography>
          <Typography color="textSecondary">{item.__sizeInText}</Typography>
          {intl.formatMessage(item.__expirationText)}
        </div>
        <Typography
          className={classes.details_image_code}
          color="textSecondary"
          component="p"
        >
          {item ? item.code : "-"}
        </Typography>
      </div>

      {/* <div
        className={classes.cardRight}
        style={{
          backgroundColor: fade(
            theme.palette.itemCard.cardBackgroundColor[
              item.__cardBackgroundColor
            ],
            0.6
          ),
        }}
        onClick={handleClickForDetails}
      >
        <Typography variant="h4" component="div">
          {item.__monthExpirationAsText}
        </Typography>
        <Typography component="div" gutterBottom>
          {item.__yearExpiration}
        </Typography>
      </div> */}
    </Card>
  );
};

intItemCard.propTypes = {
  // Props from caller
  item: PropTypes.object.isRequired,

  // Props from other HOC
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default injectIntl(withStyles(stylesItemCard, { withTheme: true })(intItemCard));

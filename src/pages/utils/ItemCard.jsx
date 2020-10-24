/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import { withStyles } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
// import { fade } from "@material-ui/core/styles/colorManipulator";
// import { Card, Typography } from "@material-ui/core";
import { Card, CardMedia, Typography } from "@material-ui/core";
import config from "../../data/config";

import ItemImage from "./ItemImage";
import Picture from "./Picture";
// import theme from "../../theme";
import useMediaQuery from '@material-ui/core/useMediaQuery';





const stylesItemCard = (theme) => ({

  cardPlusSeparation: {
    display: "flex",
    flexDirection: "column",

    [theme.breakpoints.down('xs')]: {
      flexBasis: `calc(100% - ${theme.spacing(2)}px)`,
    },
    [theme.breakpoints.up('sm')]: {
      flexBasis: `calc(50% - ${theme.spacing(2)}px)`,
    },
    [theme.breakpoints.up('md')]: {
      flexBasis: `calc(33.33% - ${theme.spacing(2)}px)`,
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: `calc(25% - ${theme.spacing(2)}px)`,
    },

    marginRight: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(5),
    },

    height: "100%",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down('xs')]: {
      flexDirection: "row",
    },
  },



  cardImage: {
    [theme.breakpoints.down('xs')]: {
      flexBasis: `calc(50% - ${theme.spacing(1)}px)`,
      marginRight: theme.spacing(2),
    },
    marginBottom: theme.spacing(3),
  },

  separation: {
    [theme.breakpoints.up('sm')]: {
      display: "none",
    },    
    width: "100%",
    height: "1px",
    backgroundColor: "#dfe7e7",
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },





  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardPicture: {
    display: "flex",
    flexGrow: 0,
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
  },

  cardText: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,

    [theme.breakpoints.down('xs')]: {
      flexBasis: `calc(50% - ${theme.spacing(1)}px)`,
    },
    padding: 0,
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

const intItemCard = ({ item, classes, intl, index, last, theme, density = 2 }) => {
  console.debug(
    `[--- FC ---] Functional component: ItemCard - item=${item.id}`, index
  );

  const [toDetails, setToDetails] = React.useState(false);
  const regularMobilePortrait = useMediaQuery('(min-width:374px)');

  const small = useMediaQuery(theme => theme.breakpoints.down('xs'));
  let widthThumbnails = `${100/(4-density)}vw`;
  

  // const large = useMediaQuery(theme => theme.breakpoints.up('lg'));

  // density: 1=compact, 2=default, 3=comfortable

  // const sizeThumbnailsInPx = 200+density*50;
  // let widthThumbnails = `45vh`;
  // let widthThumbnails = `${100/(4-density)}vw`;
  // let heightThumbnails = `${sizeThumbnailsInPx}px`;

  // classes.card.minWidth = widthThumbnails;
  // classes.card.maxWidth = widthThumbnails;

  // if( small ){
  //   console.log("media query: small", regularMobilePortrait)
  //   switch (density) {
  //     case 1: widthThumbnails = `45vw`; break;
  //     case 2: widthThumbnails = `45vw`; break;
  //     default: widthThumbnails = `100vw`; break;
  //   }
  // }
  // if( large ){
  //   widthThumbnails = `28vw`;
  // }

  const handleClickForDetails = (e) => {
    setToDetails(true);
    e.stopPropagation();
  };

  if (toDetails === true) {
    // use Redirect push to keep the history (without the push, it replaces the url and does not keep the previous page)
    return <Redirect push to={`/details/${item.id}`} />;
  }


  return (
    <div className={classes.cardPlusSeparation}>
      <div className={classes.card}>
        <Picture
          imageUrl={`${config.staticUrl}/custom-size-image/${item.pictureName}`}
          imageAlt={item.__descriptionOrCategory}
          className={classes.cardImage}
          aspectRatio
          maxResolution={400}
        />      
        <div className={classes.cardText} onClick={handleClickForDetails}>
          <div className={classes.cardMain}>
            <Typography gutterBottom variant="h4">{item.__descriptionOrCategory}</Typography>
            <Typography gutterBottom color="textSecondary">{item.__sizeInText}</Typography>
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
      </div>
      {!last && <div className={classes.separation} />}
    </div>
  );
};

intItemCard.propTypes = {
  // Props from caller
  item: PropTypes.object.isRequired,
  last: PropTypes.bool,

  // Props from other HOC
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default injectIntl(withStyles(stylesItemCard, { withTheme: true })(intItemCard));

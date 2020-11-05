/* eslint-disable react-hooks/rules-of-hooks */

// React
import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
// HOC
import { injectIntl } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
// MUI
import { Typography } from "@material-ui/core";
// Components
import Picture from "pages/utils/Picture";
// Utilities
import clsx from "clsx";
// Configuration
import config from "data/config";




const stylesItemCard = (theme) => ({

  cardAndSeparation: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  cardAndSeparationDensity1: {
    [theme.breakpoints.down('xs')]: {
      flexBasis: `calc(100% - ${theme.spacing(1)}px)`,
      // Mobile / xs: No margin bottom, separation instead
    },
    [theme.breakpoints.up('sm')]: {
      flexBasis: `calc(33.33% - ${theme.spacing(1)}px)`,
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('md')]: {
      flexBasis: `calc(25% - ${theme.spacing(1)}px)`,
      marginBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: `calc(20% - ${theme.spacing(1)}px)`,
      marginBottom: theme.spacing(3),
    },

    marginRight: theme.spacing(1),
  },



  cardAndSeparationDensity2: {
    [theme.breakpoints.down('xs')]: {
      flexBasis: `calc(100% - ${theme.spacing(2)}px)`,
      // Mobile / xs: No margin bottom, separation instead
    },
    [theme.breakpoints.up('sm')]: {
      flexBasis: `calc(50% - ${theme.spacing(2)}px)`,
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.up('md')]: {
      flexBasis: `calc(33.33% - ${theme.spacing(2)}px)`,
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: `calc(25% - ${theme.spacing(2)}px)`,
      marginBottom: theme.spacing(5),
    },

    marginRight: theme.spacing(2),
  },


  cardAndSeparationDensity3: {
    [theme.breakpoints.down('xs')]: {
      flexBasis: `calc(100% - ${theme.spacing(2)}px)`,
      // Mobile / xs: No margin bottom, separation instead
    },
    [theme.breakpoints.up('sm')]: {
      flexBasis: `calc(50% - ${theme.spacing(2)}px)`,
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.up('lg')]: {
      flexBasis: `calc(33.33% - ${theme.spacing(2)}px)`,
      marginBottom: theme.spacing(5),
    },
    [theme.breakpoints.up('xl')]: {
      flexBasis: `calc(25% - ${theme.spacing(2)}px)`,
      marginBottom: theme.spacing(5),
    },

    marginRight: theme.spacing(2),
  },





  card: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.down('xs')]: {
      // Mobile / xs : image on the left, text on the right
      flexDirection: "row",
    },
  },


  cardImage: {
  },

  cardImageDensity1: {
    [theme.breakpoints.down('xs')]: {
      // Mobile / xs : image on the left (smaller), text on the right (larger)
      flexBasis: `calc(40% - ${theme.spacing(1)}px)`,
      marginRight: theme.spacing(1),
    },
    marginBottom: theme.spacing(1),
  },
  cardImageDensity2: {
    [theme.breakpoints.down('xs')]: {
      // Mobile / xs : image on the left, text on the right
      flexBasis: `calc(50% - ${theme.spacing(1)}px)`,
      marginRight: theme.spacing(2),
    },
    marginBottom: theme.spacing(2),
  },

  cardImageDensity3: {
    [theme.breakpoints.down('xs')]: {
      // Mobile / xs : image on the left, text on the right
      flexBasis: `calc(50% - ${theme.spacing(1)}px)`,
      marginRight: theme.spacing(2),
    },
    marginBottom: theme.spacing(3),
  },



  cardText: {
    display: "flex",
    flexDirection: "column",
    // flexGrow: 1,
  },

  cardTextDensity1: {
    [theme.breakpoints.down('xs')]: {
      // Mobile / xs : image on the left (smaller), text on the right (larger)
      flexBasis: `calc(60% - ${theme.spacing(1)}px)`,
    },
  },

  cardTextDensity2: {
    [theme.breakpoints.down('xs')]: {
      // Mobile / xs : image on the left, text on the right
      flexBasis: `calc(50% - ${theme.spacing(1)}px)`,
    },
  },

  cardTextDensity3: {
    [theme.breakpoints.down('xs')]: {
      // Mobile / xs : image on the left, text on the right
      flexBasis: `calc(50% - ${theme.spacing(2)}px)`,
    },
  },




  cardMain: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    // flexGrow: 1,
  },


  details_image_code: {
    display: "flex",
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: "3px",
    padding: "0px 4px",
    color: "white",
  },

  
  // Mobile / xs: display separation between cards
  separation: {
    [theme.breakpoints.up('sm')]: {
      display: "none",
    },    
    width: "100%",
    height: "1px",
    backgroundColor: theme.palette.divider,
  },

  separationDensity1: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },  

  separationDensity2: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },  

  separationDensity3: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(3),
  },  

});

const intItemCard = ({ 
  // From caller
  item, 
  density,

  // From other HOC
  classes, 
  intl 
}) => {
  // console.debug(`[--- FC ---] Functional component: ItemCard - item=${item.id}`);

  const [toDetails, setToDetails] = React.useState(false);


  const handleClickForDetails = (e) => {
    setToDetails(true);
    e.stopPropagation();
  };

  if (toDetails === true) {
    // use Redirect push to keep the history (without the push, it replaces the url and does not keep the previous page)
    return <Redirect push to={`/details/${item.id}`} />;
  }


  return (
    <div className={clsx(
      classes.cardAndSeparation, 
      density === 1 && classes.cardAndSeparationDensity1,
      density === 2 && classes.cardAndSeparationDensity2,
      density === 3 && classes.cardAndSeparationDensity3,
    )}>
      <div className={classes.card} onClick={handleClickForDetails}>
        <Picture
          imageUrl={item.pictureName ?`${config.staticUrl}/custom-size-image/${item.pictureName}` : null}
          imageAlt={item.__descriptionOrCategory}
          itemCategory={item.category}
          maxResolution={250}
          className={clsx(
            classes.cardImage, 
            density === 1 && classes.cardImageDensity1,
            density === 2 && classes.cardImageDensity2,
            density === 3 && classes.cardImageDensity3,
        )}/>
        <div className={clsx(
            classes.cardText, 
            density === 1 && classes.cardTextDensity1,
            density === 2 && classes.cardTextDensity2,
            density === 3 && classes.cardTextDensity3,
        )}>
          <div className={classes.cardMain}>
            <Typography gutterBottom variant="h4">{item.__descriptionOrCategory}</Typography>
            <Typography gutterBottom color="textSecondary">{item.__sizeInText}</Typography>
            <Typography gutterBottom color="textSecondary">{intl.formatMessage(item.__expirationText)}</Typography>
          </div>
          <Typography className={classes.details_image_code} color="textSecondary" component="p" >{item ? item.code : "-"}</Typography>
        </div>      
      </div>
      <div className={clsx(
            classes.separation, 
            density === 1 && classes.separationDensity1,
            density === 2 && classes.separationDensity2,
            density === 3 && classes.separationDensity3,
      )} />
    </div>
  );
};

intItemCard.propTypes = {
  // Props from caller
  item: PropTypes.object,
  density: PropTypes.oneOf([1, 2, 3]),

  // Props from other HOC
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(withStyles(stylesItemCard, { withTheme: true })(intItemCard));

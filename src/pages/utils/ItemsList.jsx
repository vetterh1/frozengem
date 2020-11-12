// React
import React from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
import { getVisibleItems } from "_selectors/itemsSelector";
// HOC
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from "react-intl";
// MUI
import Typography from "@material-ui/core/Typography";
// Components
import ItemCard from "pages/utils/ItemCard";
// Utilities
import clsx from "clsx";


const useStyles = makeStyles(theme => {
  return {

    layout: {
      display: "flex",
      flexWrap: "wrap",

      [theme.breakpoints.down('xs')]: {
        padding: (density) => `${theme.spacing(density === 1 ? 2 : 3)}px 0`,
      },
      [theme.breakpoints.up('sm')]: {
        marginRight: (density) => `-${theme.spacing(density)}px`,
        padding: (density) => `${theme.spacing(density === 1 ? 3 : 5)}px 0`,
      },
    },
  }
});

const ItemsList = ({ 
  // From Redux:
  list, 
  density
}) => {
  console.debug("[--- FC Render ---] ItemsList -  list: ", list);

  const classes = useStyles(density);

  if (!list || list.length <= 0)
    return (
      <div className="huge-margin-top">
        <Typography color="primary" align="center">
          <FormattedMessage id="dashboard.empty.category.title" />
        </Typography>
      </div>
    );

  return (
    <>
      {/* <div className={classes.fixedBackground}></div> */}
      <div className={clsx(
            classes.layout, 
            density === 1 && classes.layoutDensity1,
            density === 2 && classes.layoutDensity2,
            density === 3 && classes.layoutDensity3,
      )}>
        {list.map((item, index) => (
          <ItemCard key={item.id} item={item} index={index} last={index === list.length + 1} density={density} />
        ))}
      </div>
    </>
  );
};



ItemsList.propTypes = {
  // Props from caller
  list: PropTypes.array.isRequired,
  density: PropTypes.oneOf([1, 2, 3]),
};


function mapStateToProps(state) {
  return {
    list: getVisibleItems(state),
    density: state?.user?.density,
  };
}
const connectedItemsLists = connect(mapStateToProps, null)(ItemsList);

export default connectedItemsLists;

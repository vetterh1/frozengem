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



const useStyles = makeStyles(theme => ({
  itemsList: {
    display: "flex",
    flexWrap: "wrap",

    [theme.breakpoints.up('sm')]: {
      marginRight: (density) => `-${theme.spacing(density)}px`,
      padding: (density) => `${theme.spacing(density === 1 ? 3 : 5)}px 0`,
    },

    [theme.breakpoints.down('xs')]: {
      marginRight: "unset", //  does not work :(
      padding: (density) => `${theme.spacing(density === 1 ? 2 : 3)}px 0`,
    },
  },
}));

const ItemsList = ({ 
  // From Redux:
  list,
  isFetching,
  density
}) => {
  console.debug("[--- FC Render ---] ItemsList -  list: ", list, isFetching);

  const classes = useStyles(density);

  if (!isFetching && list?.length <= 0)
    return (
      <div className="huge-margin-top">
        <Typography color="primary" align="center">
          <FormattedMessage id="dashboard.empty.category.title" />
        </Typography>
      </div>
    );
    
  if(isFetching)
  list = Array(9).fill();  

  return (
    <>
      <div className={classes.itemsList}>
        {list.map((item, index) => (
          <ItemCard key={item?item.id:index} item={item} index={index} last={index === list.length + 1} density={density} />
        ))}
      </div>
    </>
  );
};



ItemsList.propTypes = {
  // Props from Redux:
  list: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  density: PropTypes.oneOf([1, 2, 3]),
};


function mapStateToProps(state) {
  return {
    list: getVisibleItems(state),
    isFetching: state?.items?.isFetching,
    density: state?.user?.density,
  };
}
const connectedItemsLists = connect(mapStateToProps, null)(ItemsList);

export default connectedItemsLists;

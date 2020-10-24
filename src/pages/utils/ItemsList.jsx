import React from "react";
import { connect } from "react-redux";
import { getVisibleItems } from "../../_selectors/itemsSelector";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { FormattedMessage } from "react-intl";
import ItemCard from "./ItemCard";

const styles = (theme) => ({
  layout: {
    display: "flex",
    flexWrap: "wrap",
    marginRight: `-${theme.spacing(2)}px`,
    
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(3)}px 0`,
    },
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(5)}px 0`,
    },



  },
});

const intItemsList = ({ list, classes, density }) => {
  console.debug("[--- FC Render ---] ItemsList -  list: ", list);

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
      <div className={classes.layout}>
        {list.map((item, index) => (
          <ItemCard key={item.id} item={item} index={index} last={index === list.length + 1} density={density} />
        ))}
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    list: getVisibleItems(state),
    density: state?.user?.density,
  };
}

const connectedItemsLists = connect(mapStateToProps, null)(intItemsList);

export default withStyles(styles)(connectedItemsLists);

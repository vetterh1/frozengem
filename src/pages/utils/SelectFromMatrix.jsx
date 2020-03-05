import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import MatrixCard from "./MatrixCard";
import { getIconComponent } from "../../data/Icons";

const styles = theme => ({
  layout: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "auto",
    padding: `${theme.spacing(2)}px 0`
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
  }
});

// (!) Multi selection caution (!)
// Returns only the item clicked
// It's the responsibility of the parent to aggregate the multiple selected
// and return them as an array in preselectedItems (with multiselection = true)

const intSelectFromMatrix = ({
  name = "",
  defaultIconName = "",
  items,
  preselectedItems,
  multiselection,
  handleClick,
  classes,
  language
}) => (
  <div className={classes.layout}>
    {items &&
      items.map(item => {
        const nameItem = item.name[language];
        const labelItem = item.label[language];
        let IconItem = getIconComponent(name + item.id2);
        if (!IconItem) IconItem = getIconComponent(defaultIconName);
        let selected = false;

        if (multiselection) {
          // console.log("intSelectFromMatrix nameItem, labelItem, IconItem, name, defaultIconName, items, preselectedItems:", nameItem, labelItem, IconItem, name, defaultIconName, items, preselectedItems)
          if (preselectedItems)
            selected =
              preselectedItems.find(detail => detail === item.id2) !==
              undefined;
        } else {
          selected = preselectedItems === item.id2;
          console.log("intSelectFromMatrix item.id2, preselectedItems, selected:", item.id2, preselectedItems, selected)
        }

        return (
          <MatrixCard
            onClick={handleClick.bind(this, item.id2)}
            selected={selected}
            key={item.id2}
            id={item.id2}
            name={nameItem}
            label={labelItem}
            icon={IconItem && <IconItem fontSize="default" />}
          />
        );
      })}
  </div>
);

intSelectFromMatrix.propTypes = {
  name: PropTypes.string.isRequired,
  defaultIconName: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  // preselectedItems is a string if NOT multi selection
  // preselectedItems is an array if multi selection
  // preselectedItems: if nothing is pre-selected AND NOT multi selection: null
  // preselectedItems: if nothing is pre-selected AND multi selection: []
  preselectedItems: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number
  ]),
  multiselection: PropTypes.bool,
  handleClick: PropTypes.func,
  classes: PropTypes.object
};

function mapStateToProps(state) {
  const {
    user: { language }
  } = state;
  return {
    language
  };
}

const mapDispatchToProps = {};

const connectedSelectFromMatrix = connect(
  mapStateToProps,
  mapDispatchToProps
)(intSelectFromMatrix);

export default withStyles(styles)(connectedSelectFromMatrix);

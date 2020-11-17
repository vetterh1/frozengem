// React
import React from "react";
import PropTypes from "prop-types";
// Redux
import { connect } from "react-redux";
// HOC
import { makeStyles } from '@material-ui/core/styles';
// Components
import MatrixCard from "pages/utils/MatrixCard";
// Styles
import { getIconComponent } from "data/Icons";



const useStyles = makeStyles(theme => ({
  layout: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "auto",
    // padding: `${theme.spacing(2)}px 0`
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
  }
}));

// (!) Multi selection caution (!)
// Returns only the item clicked
// It's the responsibility of the parent to aggregate the multiple selected
// and return them as an array in preselectedItems (with multiselection = true)

const SelectFromMatrix = ({
  // From caller:
  name = "",
  defaultIconName = "",
  items,
  preselectedItems,
  multiselection,
  handleClick,
  // From Redux:
  language,
  density
}) => {

  const classes = useStyles(density);

  console.log("SelectFromMatrix items:", items);

  return (
    <div className={classes.layout}>
      {items &&
        items.map(item => {
          // console.log("SelectFromMatrix item:", item);
          const nameItem = item.name[language];
          const labelItem = item.label[language];
          let IconItem = getIconComponent(name + item.id2);
          if (!IconItem) IconItem = getIconComponent(defaultIconName);
          let selected = false;

          if (multiselection) {
            // console.log("SelectFromMatrix nameItem, labelItem, IconItem, name, defaultIconName, items, preselectedItems:", nameItem, labelItem, IconItem, name, defaultIconName, items, preselectedItems)
            if (preselectedItems)
              selected =
                preselectedItems.find(detail => detail === item.id2) !==
                undefined;
          } else {
            selected = preselectedItems === item.id2;
            console.log("SelectFromMatrix item.id2, preselectedItems, selected:", item.id2, preselectedItems, selected)
          }

          return (
            <MatrixCard
              density={density}
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
  )
};

SelectFromMatrix.propTypes = {
  // Props from caller:
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
  // Props from Redux:
  language: PropTypes.string.isRequired,
  density: PropTypes.oneOf([1, 2, 3]),
};

function mapStateToProps(state) {
  return {
    language: state?.user?.language,
    density: state?.user?.density,
  };
}

const connectedSelectFromMatrix = connect(mapStateToProps, null)(SelectFromMatrix);
export default connectedSelectFromMatrix;

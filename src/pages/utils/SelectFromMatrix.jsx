import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import { withUserInfo } from '../../with/withUserInfo';
import MatrixCard from './MatrixCard'
import { getIcon } from "../../data/Icons";



const styles = theme => ({
  layout: {
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: 'auto',
    padding: `${theme.spacing(2)}px 0`,
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
  },
});




// (!) Multi selection caution (!)
// Returns only the item clicked
// It's the responsibility of the parent to aggregate the multiple selected 
// and return them as an array in preselectedItems (with multiselection = true)

const intSelectFromMatrix = ({ name = "", defaultIconName = "", items, preselectedItems, multiselection, handleClick, classes, userInfo }) => (
  <div className={classes.layout}>
    {items && items.map((item) => {
      const nameItem = item.name[userInfo.language]
      const labelItem = item.label[userInfo.language]
      let iconItem = getIcon(name + item.id2)
      if(!iconItem)  iconItem = getIcon(defaultIconName);
      let selected = false;
      if(multiselection) {
        // console.log("preselectedItems:", preselectedItems)
        if(preselectedItems)
          selected = preselectedItems.find(detail => detail === item.id2) !== undefined;
      } else {
        selected = preselectedItems === item.id2;
      }

      return <MatrixCard 
        onClick={handleClick.bind(this, item.id2)} 
        selected={selected} 
        key={item.id2}      
        id={item.id2}
        name={nameItem}
        label={labelItem}
        icon={iconItem}
      />
    })}
  </div>
);

intSelectFromMatrix.propTypes = {
  name: PropTypes.string.isRequired,
  defaultIconName: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  preselectedItems: PropTypes.oneOfType([PropTypes.array,PropTypes.string,PropTypes.number]), // can be null: nothing is pre-selected
  multiselection: PropTypes.bool,
  handleClick: PropTypes.func,
  classes: PropTypes.object,
  userInfo: PropTypes.object,
}


export default withStyles(styles)(withUserInfo(intSelectFromMatrix));

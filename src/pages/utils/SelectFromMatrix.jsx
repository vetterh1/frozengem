import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withUserInfo } from '../../auth/withUserInfo';
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




const intSelectFromMatrix = ({ name = "", defaultIconName = "", items, itemInState, itemInStateIsAnArray, handleClick, classes, userInfo }) => (
  <div className={classes.layout}>
    {items && items.map((item) => {
      const nameItem = item.name[userInfo.language]
      const labelItem = item.label[userInfo.language]
      let iconItem = getIcon(name + item.id2)
      let isDefaultIcon = false
      if(!iconItem) {
        iconItem = getIcon(defaultIconName)
        isDefaultIcon = true
      }
      console.log("icon: ", name + item.id2, defaultIconName, isDefaultIcon)
      return <MatrixCard 
        onClick={handleClick.bind(this, item.id2)} 
        selected={itemInStateIsAnArray ? itemInState.find(detail => detail === item.id2) !== undefined : itemInState === item.id2} 
        key={item.id2}      
        id={item.id2}
        name={nameItem}
        label={labelItem}
        icon={iconItem}
        isDefaultIcon={isDefaultIcon}
      />
    })}
  </div>
);
export default withStyles(styles)(withUserInfo(intSelectFromMatrix));

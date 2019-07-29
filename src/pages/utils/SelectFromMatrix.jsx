import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withUserInfo } from '../../auth/withUserInfo';
import MatrixCard from './MatrixCard'



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




const intSelectFromMatrix = ({ items, itemInState, itemInStateIsAnArray, handleClick, classes, userInfo }) => (
  <div className={classes.layout}>
    {items && items.map((item) => {
      const name = item.name[userInfo.language]
      const label = item.label[userInfo.language]
      return <MatrixCard 
        onClick={handleClick.bind(this, item.id2)} 
        selected={itemInStateIsAnArray ? itemInState.find(detail => detail === item.id2) !== undefined : itemInState === item.id2} 
        key={item.id2}      
        id={item.id2}
        name={name}
        label={label}
      />
    })}
  </div>
);
export default withStyles(styles)(withUserInfo(intSelectFromMatrix));

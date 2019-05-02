import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


export const ItemsList = ({ items, itemInState, itemInStateIsAnArray, handleClick }) => (
  <List className={"flex-max-height flex-direction-column big-margin-down"}>
  {items && items.map((item, index, theArray) => (
    <React.Fragment key={`frag-${item.id}`}>
      <ListItem 
        button 
        onClick={handleClick.bind(this, item.id)} 
        selected={itemInStateIsAnArray ? itemInState.find(detail => detail === item.id) !== undefined : itemInState === item.id} 
        key={item.id}
      >
        {/* <ListItemAvatar> <Avatar> {item.id} </Avatar> </ListItemAvatar> */}
        <ListItemText primary={item.name} secondary={item.label} />
      </ListItem>
      {index < theArray.length-1 && <Divider />}
    </React.Fragment>
  ))}
  </List>
);

export const CancelButton = () => (
  <Button color="primary" component={Link} to="/">
      Cancel
  </Button>
);

export const PreviousButton = ({onClick}) => (
  <Button color="primary" onClick={onClick} className={"margin-left"}>
      Back
  </Button>
);

export const NextButton = ({onClick}) => (
  <Button variant="contained" color="primary" onClick={onClick} className={"margin-left"}>
      Continue
  </Button>
);
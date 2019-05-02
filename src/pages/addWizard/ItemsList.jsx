import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const ItemsList = ({ items, itemInState, itemInStateIsAnArray, handleClick }) => (
  <List className={"flex-max-height flex-direction-column"}>
  {items && items.map((item) => (
    <ListItem 
      button 
      onClick={handleClick.bind(this, item.id)} 
      selected={itemInStateIsAnArray ? itemInState.find(detail => detail === item.id) !== undefined : itemInState === item.id} 
      key={item.id}
    >
      <ListItemAvatar>
        <Avatar>
          {item.id}
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={item.name} secondary={item.label} />
    </ListItem>
  ))}
  </List>
);

export default ItemsList
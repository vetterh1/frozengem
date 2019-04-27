import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';



const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

CategoryForm.defaultProps = { 
  categories:[
    {name: 'Bread', label: '...bread', code: 'B'},
    {name: 'Vegetable', label: 'Raw veggies', code: 'V'},
    {name: 'Soup', label: 'Homemade soup', code: 'S'},
    {name: 'Meat', label: '...meat', code: 'M'},
  ]
};


function CategoryForm(props) {
  const { classes, categories } = props;
  return (
    <React.Fragment>
      <Typography variant="h5" >
        Select a category
      </Typography>

      <List className={classes.list}>
        {categories.map((category, index) => (
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                {category.code}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={category.name} secondary={category.label} />
          </ListItem>
        ))}
    </List>
    </React.Fragment>
  );
}

export default withStyles(styles)(CategoryForm);
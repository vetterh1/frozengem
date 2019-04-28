import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';



const styles = theme => ({
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
    <Grid container spacing={3}>
      <Grid item>
        <Typography variant="h5">
          Category
        </Typography>
      </Grid>

      <Grid item container xs={12}>
        <Grid item xs={12} md={6}>
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
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(CategoryForm);
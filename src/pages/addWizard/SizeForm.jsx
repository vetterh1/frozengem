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

SizeForm.defaultProps = { 
  sizes:[
    {name: 'Individual', label: '1 portion', code: '1'},
    {name: 'Couple', label: '2 portions', code: '2'},
    {name: 'Trio', label: '3 portions', code: '3'},
    {name: 'Four', label: '4 portions', code: '4'},
    {name: 'Six', label: '6 portions', code: '6'},
    {name: 'More', label: '8 or more', code: 'X'},
  ]
};


function SizeForm(props) {
  const { classes, sizes } = props;
  return (
    <Grid container spacing={3}>
      <Grid item>
        <Typography variant="h5">
          Size
        </Typography>
      </Grid>

      <Grid item container xs={12}>
        <Grid item xs={12} md={6}>
          <List className={classes.list}>
            {sizes.map((size, index) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {size.code}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={size.name} secondary={size.label} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(SizeForm);
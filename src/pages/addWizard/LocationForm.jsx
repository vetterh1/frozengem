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

LocationForm.defaultProps = { 
  locations:[
    {name: 'Top', label: 'Higher section', code: 'T'},
    {name: 'Middle', label: 'Middle section', code: 'M'},
    {name: 'Bottom', label: 'Lower section', code: 'B'},
  ],  
  freezers:[
    {name: 'Kitchen', label: 'Kitchen freezer', code: 'K'},
    {name: 'Basement', label: 'Basement freezer', code: 'B'},
  ]
};


function LocationForm(props) {
  const { classes, locations, freezers } = props;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">
          Location
        </Typography>
      </Grid>

      <Grid item container xs={12}>
        <Grid item xs={12} md={6}>
          <List className={classes.list}>
            {locations.map((location, index) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {location.code}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={location.name} secondary={location.label} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} md={6}>
          <List className={classes.list}>
            {freezers.map((freezer, index) => (
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    {freezer.code}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={freezer.name} secondary={freezer.label} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(LocationForm);
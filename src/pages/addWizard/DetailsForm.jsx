import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
});

DetailsForm.defaultProps = { 
  details:[
    {name: 'White', label: 'White bread', code: 'BW'},
    {name: 'Grey', label: 'Semi-dark bread', code: 'BG'},
    {name: 'Cereal', label: 'Dark bread', code: 'BC'},
  ]
};


function DetailsForm(props) {
  const { classes, details } = props;
  return (
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h5">
            Details
          </Typography>
        </Grid>

        <Grid item container xs={12}>
          <Grid item xs={12} md={6}>
            <TextField
              id="label"
              label="Name (optional)"
              helperText="To help you remember what it is"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
          <List className={classes.list}>
          {details.map((detail, index) => (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  {detail.code}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={detail.name} secondary={detail.label} />
            </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(DetailsForm);
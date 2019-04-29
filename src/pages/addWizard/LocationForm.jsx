import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ItemCharacteristicsConsumer } from "../../data/ItemCharacteristicsStore";



const styles = theme => ({
});


function LocationForm(props) {
  const { classes } = props;
  return (
    <ItemCharacteristicsConsumer>
      {({ locations, freezers }) => {
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
      }}
    </ItemCharacteristicsConsumer>  );
}

export default withStyles(styles)(LocationForm);
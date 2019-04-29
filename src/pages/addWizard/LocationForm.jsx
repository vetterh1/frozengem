import React from 'react';
import PropTypes from 'prop-types';
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


class LocationForm extends React.Component {
    static propTypes = {
      handleChange: PropTypes.func.isRequired,
    }
  
    handleClickLocation = (index) => { this.props.handleChange({name:'location', value: index}, false); };
    handleClickFreezer = (index) => { this.props.handleChange({name:'freezer', value: index}, false); };
  
    render() {
    const { classes } = this.props;
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
                    <ListItem button onClick={this.handleClickLocation.bind(this, index)} selected={this.props.state.location === index}>
                      <ListItemAvatar>
                        <Avatar>
                          {location.id}
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
                    <ListItem button onClick={this.handleClickFreezer.bind(this, index)} selected={this.props.state.freezer === index}>
                      <ListItemAvatar>
                        <Avatar>
                          {freezer.id}
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
    </ItemCharacteristicsConsumer>
  )};
}

export default withStyles(styles)(LocationForm);
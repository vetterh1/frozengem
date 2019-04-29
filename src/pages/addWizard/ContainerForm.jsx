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



class ContainerForm extends React.Component {
    static propTypes = {
      handleChange: PropTypes.func.isRequired,
    }

    handleClickContainer = (index) => { this.props.handleChange({name:'container', value: index}, false); };
    handleClickColor = (index) => { this.props.handleChange({name:'color', value: index}, false); };
  
  render() {
    const { classes } = this.props;
    return (
    <ItemCharacteristicsConsumer>
      {({ containers, colors }) => {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">
                Container
              </Typography>
            </Grid>

            <Grid item container xs={12}>
              <Grid item xs={12} md={6}>
                <List className={classes.list}>
                  {containers.map((container, index) => (
                    <ListItem button onClick={this.handleClickContainer.bind(this, index)} selected={this.props.state.container === index}>
                      <ListItemAvatar>
                        <Avatar>
                          {container.id}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={container.name} secondary={container.label} />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <List className={classes.list}>
                  {colors.map((color, index) => (
                    <ListItem button onClick={this.handleClickColor.bind(this, index)} selected={this.props.state.color === index}>
                      <ListItemAvatar>
                        <Avatar>
                          {color.id}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={color.name} secondary={color.label} />
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

export default withStyles(styles)(ContainerForm);
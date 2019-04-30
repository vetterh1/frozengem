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

    handleClickContainer = (index) => { this.props.handleChange({name:'container', value: index}, true); };
  
  render() {
    const { classes, state } = this.props;
    return (
    <ItemCharacteristicsConsumer>
      {({ containers }) => {
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
                  {containers.map((item, index) => (
                    <ListItem button onClick={this.handleClickContainer.bind(this, item.id)} selected={state.container === item.id}>
                      <ListItemAvatar>
                        <Avatar>
                          {item.id}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={item.name} secondary={item.label} />
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
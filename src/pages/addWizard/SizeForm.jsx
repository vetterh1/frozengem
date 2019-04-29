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



class SizeForm extends React.Component {
    static propTypes = {
      handleChange: PropTypes.func.isRequired,
    }
  
    handleClick = (index) => { this.props.handleChange({name:'size', value: index}, true); };
  
    render() {
    const { classes } = this.props;
    return (
    <ItemCharacteristicsConsumer>
      {({ sizes }) => {
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
                    <ListItem button onClick={this.handleClick.bind(this, index)} selected={this.props.state.size === index}>
                      <ListItemAvatar>
                        <Avatar>
                          {size.id}
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
      }}
    </ItemCharacteristicsConsumer> 
  )};
}

export default withStyles(styles)(SizeForm);
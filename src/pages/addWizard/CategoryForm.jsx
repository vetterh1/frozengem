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
import stringifyOnce from '../../utils/stringifyOnce.js'



const styles = theme => ({
});

class CategoryForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const {handleChange, lastStep, nextStep} = this.props;
    handleChange({name:'category', value: id}); 
    nextStep(); 
  };

  render() {
  const { classes } = this.props;
  return (
    <ItemCharacteristicsConsumer>
      {({ categories }) => {
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
                  {categories && categories.map((category) => (
                    <ListItem button onClick={this.handleClick.bind(this, category.id)} selected={this.props.state.category === category.id} >
                      <ListItemAvatar>
                        <Avatar>
                          {category.id}
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
      }}
    </ItemCharacteristicsConsumer>
  )};
}

export default withStyles(styles)(CategoryForm);
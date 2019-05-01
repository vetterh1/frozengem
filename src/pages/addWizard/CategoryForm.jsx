import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { Context } from "../../data/ItemCharacteristicsStore";
import Button from '@material-ui/core/Button';


const styles = () => ({
  maxHeightColumn: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  normalHeight: {
    display: "flex",
    flexGrow: 0,
  },  
  right: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});

class CategoryForm extends React.Component {
  static propTypes = {
    handleChange: PropTypes.func.isRequired,
  }

  handleClick = (id) => {
    const {handleChange, nextStep} = this.props;
    handleChange({name:'category', value: id}); 
    nextStep(); 
  };

  handleNext = () => {
    const {nextStep} = this.props;
    nextStep(); 
  };

  render() {
    const { classes } = this.props;
    let {categories} = this.context;
    return (
      <div className={classes.maxHeightColumn}>

        <Typography variant="h5"  className={classes.normalHeight}>
            Category
        </Typography>

        <List className={classes.maxHeightColumn}>
          {categories && categories.map((category) => (
            <ListItem button onClick={this.handleClick.bind(this, category.id)} selected={this.props.state.category === category.id} key={category.id}>
              <ListItemAvatar>
                <Avatar>
                  {category.id}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={category.name} secondary={category.label} />
            </ListItem>
          ))}
        </List>

        <Typography variant="h5"  className={clsx(classes.normalHeight, classes.right)}>
          <Button variant="contained" color="primary" onClick={this.handleNext.bind(this)}>
            continue...
          </Button>
        </Typography>

      </div>

    )};
}
CategoryForm.contextType = Context;

export default withStyles(styles)(CategoryForm);
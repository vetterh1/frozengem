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
import { ItemCharacteristicsConsumer, Context } from "../../data/ItemCharacteristicsStore";



const styles = theme => ({
});



class ContainerColorForm extends React.Component {
    static propTypes = {
      handleChange: PropTypes.func.isRequired,
    }

    componentDidMount() {
      console.log("ContainerColorForm::componentDidMount");

      const { state } = this.props;
      const parentId = state.container;
      // Is there any color for the selected container?
      const filteredItems = this.context.colors.filter(color => color.parentIds.find(oneParentId => oneParentId === parentId));
      if(filteredItems.length <= 0) {this.handleClickColor( null);}
    }

    handleClickColor = (index) => { this.props.handleChange({name:'color', value: index}, true); };
  
  render() {
    const { classes, state } = this.props;
    return (
    <ItemCharacteristicsConsumer>
      {({ colors }) => {
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5">
                Container color
              </Typography>
            </Grid>
              <Grid item xs={12} md={6}>
                <List className={classes.list}>
                  {colors.map((item, index) => (
                    <ListItem button onClick={this.handleClickColor.bind(this, index)} selected={state.color === item.id}>
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
        );
      }}
    </ItemCharacteristicsConsumer>
  )};
}
ContainerColorForm.contextType = Context;

export default withStyles(styles)(ContainerColorForm);
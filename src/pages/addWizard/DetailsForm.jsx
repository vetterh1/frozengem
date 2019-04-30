import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { ItemCharacteristicsConsumer } from "../../data/ItemCharacteristicsStore";

const styles = theme => ({
});

class DetailsForm extends React.Component {
    static propTypes = {
      handleChange: PropTypes.func.isRequired,
    }


    handleTextChange(event) { this.props.handleChange({name:'name', value: event.target.value}, false);  }
    handleClick = (id) => { this.props.handleArrayToggle({name:'details', value: id}); };
  
    render() {
      const { classes, state } = this.props;
      const parentId = state.category;
      // Note on filtering: we only display items that are linked to an already selected parent.
      // (there can be multiple parents, or the special value 'all')
      // Note on the button click: we support multi-select, so we have toggle the individual values in the state (as an array)
      return (
      <ItemCharacteristicsConsumer>
        {({ details }) => {
          const filteredItems = details.filter(detail => detail.parentIds.find(oneParentId => oneParentId === 'all' || oneParentId === parentId));
          return (
            <Grid container spacing={3}>
              <Grid item>
                <Typography variant="h5">
                  Details
                </Typography>
              </Grid>

              <Grid item container xs={12}>
                <Grid item xs={12} md={6}>

                  <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="name">Name (optional)</InputLabel>
                    <Input
                      id="name"
                      value={state.name}
                      onChange={this.handleTextChange.bind(this)}
                      aria-describedby="name-text"
                      fullWidth
                    />
                    <FormHelperText id="name-text">To help you remember what it is</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                <List className={classes.list}>
                {filteredItems.map((item) => (
                  <ListItem button onClick={this.handleClick.bind(this, item.id)} selected={state.details.find(detail => detail === item.id)}>
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

export default withStyles(styles)(DetailsForm);
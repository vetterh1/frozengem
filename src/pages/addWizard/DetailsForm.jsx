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


    constructor(props) {
      super(props);
      this.state = {
      };
    }    
  
    handleTextChange(event) { this.props.handleChange({name:'name', value: event.target.value}, false);  }
    handleClick = (id) => { this.props.handleChange({name:'details', value: id}, false); };
  
    render() {
      const { classes } = this.props;
      const parentId = this.props.state.category;
      console.log("parentId:", parentId)
      return (
      <ItemCharacteristicsConsumer>
        {({ details }) => {
          const filteredItems = details.filter(detail => detail.parentIds.find(oneParentId => oneParentId === 'all' || oneParentId == parentId));
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
                      value={this.props.state.name}
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
                  <ListItem button onClick={this.handleClick.bind(this, item.id)} >
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
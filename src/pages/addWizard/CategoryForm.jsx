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
// import stringifyOnce from '../../utils/stringifyOnce.js'



const styles = () => ({
  gridContainer: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto", 
  },
  divNav: {
    display: "flex",
    flexGrow: 0,
  },  
  gridMainContent: {
    display: "flex",
    flexGrow: 1,
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

  render() {
    const { classes } = this.props;
    return (
      <ItemCharacteristicsConsumer>
        {({ categories }) => {
            return (
              <React.Fragment>
                <Grid container spacing={3} className={classes.gridContainer}>

                  <Grid item>
                    <Typography variant="h5">
                      Category
                  </Typography>
                  </Grid>

                  <Grid item container xs={12} className={classes.gridMainContent}>
                    <Grid item xs={12} md={6}>
                      <List className={classes.list}>
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
                    </Grid>
                  </Grid>

                  <Grid item className={classes.divNav}>
                    <Typography variant="h5">
                      test
                    </Typography>
                  </Grid>

                </Grid>

            </React.Fragment>
          );
        }}
      </ItemCharacteristicsConsumer>
    )};
}

export default withStyles(styles)(CategoryForm);
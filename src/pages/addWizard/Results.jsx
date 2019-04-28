import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {

    marginLeft: theme.spacing(2),
  },  
  divWizard: {
    marginTop: theme.spacing(2),
  },
});


class Results extends React.Component {
  static propTypes = {
  }


  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={5}>
        <Grid item>
          <Typography variant="h3">
            Code: BW542
          </Typography>
          <Typography variant="subtitle1">
            <ul>
              <li>Write down this code on a sticker</li>
              <li>Stick it to your container</li>
            </ul>
            We'll send you a reminder in 4 months
          </Typography>
        </Grid>

        <Grid item container xs={12}>
          <Grid item xs={12} md={6}>
            <TextField
              id="date"
              label="Change expiration date (optional)"
              type="date"
              defaultValue="2019-08-23"
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.buttons}>
            <Button variant="contained" color="secondary" component={Link} to="/add" className={classes.button}>
            Add a new item
            </Button> 
            <Button variant="contained" color="primary" component={Link} to="/" className={classes.button}>
              Home
            </Button>             
        </Grid>          
      </Grid>
    );
  }
}


export default withStyles(styles)(Results);
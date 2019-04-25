import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Auth from '../auth/Auth';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { AcUnit, AccessTime, NoteAdd } from '@material-ui/icons'

const styles = theme => ({
   heroUnit: {
    marginTop: theme.spacing(4),
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },

  layout: {
    width: 'auto',
    padding: `${theme.spacing(8)}px 0`,
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  largeIcon: {
    width: 48,
    height: 48,
    marginBottom: theme.spacing(2),
  },
});


class MainPageContent extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  render() {
    // const greyWhenNoAuth = this.props.auth.isAuthenticated() ? '' : 'auth-required';
    const { classes } = this.props;

    return (
      <Container maxWidth="md">

        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="primary" gutterBottom>
              Frozen Gem
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Super simple system to add &amp; retreive your freezer content
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={10} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" component={Link} to="/add">
                  Get Started
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>

        <div className={classes.layout}>
          <Grid container spacing={5}>
              <Grid item sm={12} md={4} container direction="column">
                <Grid className={classes.subtitle} item>
                  <AcUnit color="primary" className={classes.largeIcon} />
                  <Typography variant="h5" component="h2" color="primary">
                    Don't waste food
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography>
                    Always know what you have in your freezer. You just need to use our simple tag system. Reminders will then tell you what to get out before it stays for too long.
                  </Typography>
                </Grid>
              </Grid>

              <Grid item sm={12} md={4}>
                <Grid className={classes.subtitle} item>
                  <AccessTime color="primary" className={classes.largeIcon} />
                  <Typography variant="h5" component="h2" color="primary">
                    Don't waste time
                  </Typography>
                </Grid>
                <Typography>
                  Adding a produce will take you less than 30s. For the retreival, you've nothing to do! We'll be sending you reminders with proposals of what you should take.
                </Typography>
              </Grid>
                   
              <Grid item sm={12} md={4}>
                <Grid className={classes.subtitle} item>
                  <NoteAdd color="primary" className={classes.largeIcon} />
                  <Typography variant="h5" component="h2" color="primary">
                    Easy to work with
                  </Typography>
                </Grid>
                <Typography>
                  We have worked hard to create a super simple process. A combination of easy to use app / page &amp; regular sticky notes makes adding or retreiving food a trivial task.
                </Typography>
              </Grid>
                            
          </Grid>
        </div>   

        </Container>
    );
  }
}

export default withStyles(styles)(MainPageContent);





//         <div className="container">
//           <div className="section">

//             {/* <!--   Icon Section   --> */}
//             <div className="row">
//               <div className="col s12 l4">
//                 <div className="icon-block">
//                   <h2 className="center indigo-text text-darken-3"><i className="medium material-icons">ac_unit</i></h2>
//                   <h5 className="center indigo-text text-darken-3">Don't waste food</h5>
//                   <p className="light">Always know what you have in your freezer. You just need to use our simple tag system. Reminders will then tell you what to get out before it stays for too long.</p>
//                 </div>
//               </div>

//               <div className="col s12 l4">
//                 <div className="icon-block">
//                   <h2 className="center indigo-text text-darken-3"><i className="medium material-icons">access_time</i></h2>
//                   <h5 className="center indigo-text text-darken-3">Don't waste time</h5>
//                   <p className="light">Adding a produce will take you less than 30s. For the retreival, you've nothing to do! We'll be sending you reminders with proposals of what you should take.</p>
//                 </div>
//               </div>

//               <div className="col s12 l4">
//                 <div className="icon-block">
//                   <h2 className="center indigo-text text-darken-3"><i className="medium material-icons">note_add</i></h2>
//                   <h5 className="center indigo-text text-darken-3">Easy to work with</h5>
//                   <p className="light">We have worked hard to create a super simple process. A combination of easy to use app / page &amp; regular sticky notes makes adding or retreiving food a trivial task.</p>
//                 </div>
//               </div>
//             </div>


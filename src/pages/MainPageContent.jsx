import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserInfo from '../auth/UserInfo';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl.macro';
import { withStyles } from '@material-ui/core/styles';
import { AcUnit, AccessTime, NoteAdd } from '@material-ui/icons'
import Box from '@material-ui/core/Box'; // ! must be at the end of the material-ui imports !

const styles = theme => ({
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
    userInfo: PropTypes.instanceOf(UserInfo).isRequired,
  }

  render() {
    // const greyWhenNoUserInfo = this.props.userInfo.isAuthenticated() ? '' : 'auth-required';
    const { classes } = this.props;

    return (
      <React.Fragment>

        <Box mt={5} display="flex" flexDirection="column" >
          <Typography component="h1" variant="h2" color="primary" align="center" gutterBottom>
            <FormattedMessage id="app.title" defaultMessage="FrozenGem" />
          </Typography>
          <Typography variant="h5" align="center" gutterBottom >
            <FormattedMessage id="app.subtitle" defaultMessage="Super simple system to always know what you have in your freezer" />
          </Typography>
          <Grid container justify="center">
            <Grid item>
              <Box mt={2} mb={4}>
                <Button variant="contained" color="secondary" component={Link} to="/register">
                  <FormattedMessage id="button.getstarted" defaultMessage="Get Started" />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <div className={classes.layout}>
          <Grid container spacing={5}>
              <Grid item sm={12} md={4} container direction="column">
                <Grid className={classes.subtitle} item>
                  <AcUnit color="primary" className={classes.largeIcon} />
                  <Typography variant="h5" component="h2" color="primary">
                    <FormattedMessage id="app.reason1.title" defaultMessage="Don't waste food" />
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography>
                    <FormattedMessage id="app.reason1.text" defaultMessage="Always know what you have in your freezer. You just need to use our simple tag system. Reminders will then tell you what to get out before it stays for too long." />
                  </Typography>
                </Grid>
              </Grid>

              <Grid item sm={12} md={4}>
                <Grid className={classes.subtitle} item>
                  <AccessTime color="primary" className={classes.largeIcon} />
                  <Typography variant="h5" component="h2" color="primary">
                    <FormattedMessage id="app.reason2.title" defaultMessage="Don't waste time" />
                  </Typography>
                </Grid>
                <Grid item >
                  <Typography>
                    <FormattedMessage id="app.reason2.text" defaultMessage="Adding a produce will take you less than 30s. For the retreival, you've nothing to do! We'll be sending you reminders with proposals of what you should take." />
                  </Typography>
                </Grid>
              </Grid>
                   
              <Grid item sm={12} md={4}>
                <Grid className={classes.subtitle} item>
                  <NoteAdd color="primary" className={classes.largeIcon} />
                  <Typography variant="h5" component="h2" color="primary">
                    <FormattedMessage id="app.reason3.title" defaultMessage="Easy to work with" />
                  </Typography>
                </Grid>
                <Typography>
                  <FormattedMessage id="app.reason3.text" defaultMessage="We have worked hard to create a super simple process. A combination of easy to use app / page &amp; regular sticky notes makes adding or retreiving food a trivial task." />
                </Typography>
              </Grid>
                            
          </Grid>
        </div>   

        </React.Fragment>
    );
  }
}

export default withStyles(styles)(MainPageContent);
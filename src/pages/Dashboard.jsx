import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../auth/Auth';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl.macro';
import { withStyles } from '@material-ui/core/styles';
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


class Dashboard extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  render() {
    // const greyWhenNoAuth = this.props.auth.isAuthenticated() ? '' : 'auth-required';
    const { classes } = this.props;

    return (
      <React.Fragment>

        <Box mt={5} display="flex" flexDirection="column" >
          <Typography component="h1" variant="h2" color="primary" align="center" gutterBottom>
            <FormattedMessage id="dashboard.title" defaultMessage="FrozenGem dashboard" />
          </Typography>
          <Typography variant="h5" align="center" gutterBottom >
            <FormattedMessage id="dashboard.subtitle" defaultMessage="Here is what you have in your freezer" />
          </Typography>
        </Box>

        <div className={classes.layout}>
         content...
        </div>   

        </React.Fragment>
    );
  }
}

export default withStyles(styles)(Dashboard);
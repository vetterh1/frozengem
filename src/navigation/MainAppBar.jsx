/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Auth from '../auth/Auth';
import LoginInBar from '../auth/LoginInBar';

const styles = theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
});


class MainAppBar extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.state = {
      route: window.location.pathname,
    };
  }


  render() {
    const { classes } = this.props;
    // const { classes, location } = this.props;
    // const onMainPage = location.pathname === '/';

    return (
      <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            FrozenGem
          </Typography>
          <nav>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/add">
              Add
            </Button>
            <Button color="inherit" component={Link} to="/remove">
              Remove
            </Button>
          </nav>
          <LoginInBar auth={this.props.auth} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(withRouter(MainAppBar));

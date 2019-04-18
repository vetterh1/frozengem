/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Auth from '../auth/Auth';
import { withStyles } from '@material-ui/core/styles';
import LoginInBar from '../auth/LoginInBar';
import { withRouter } from "react-router";

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};


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
    const { classes, location } = this.props;
    const onMainPage = location.pathname === '/';

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
             FrozenGem
            </Typography>
            <LoginInBar auth={this.props.auth} />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(MainAppBar));

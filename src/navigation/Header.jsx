/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { withStyles } from '@material-ui/core/styles';
import Auth from '../auth/Auth';
import LoginInBar from '../auth/LoginInBar';

const styles = theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  toolbarTitle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  margin: {
    margin: theme.spacing(1, 1.5),
  },
});


class Header extends React.Component {
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
        <Toolbar className={classes.toolbar} disableGutters>
          <Button color="inherit" component={Link} to="/" className={classes.toolbarTitle}>
            <Typography variant="body1" color="inherit" noWrap>
              FrozenGem
            </Typography>
          </Button>
          <nav>
            <Fab size="small" color="secondary" aria-label="Add" className={classes.margin} component={Link} to="/add">
              <AddIcon />
            </Fab>
            <Fab size="small" color="secondary" aria-label="Remove" className={classes.margin} component={Link} to="/remove">
              <RemoveIcon />
            </Fab>
          </nav>
          <LoginInBar auth={this.props.auth} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(withRouter(Header));

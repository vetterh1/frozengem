/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { withStyles } from '@material-ui/core/styles';
import { withUserInfo } from '../auth/withUserInfo';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { FormattedMessage } from 'react-intl.macro';
// import Fab from '@material-ui/core/Fab';

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
    userInfo: PropTypes.object.isRequired,
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
    const { language, setLanguage } = this.props.userInfo;
    if(!language) return null;

    // const { classes, location } = this.props;
    // const onMainPage = location.pathname === '/';

    return (
      <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar} disableGutters>
          <Button color="inherit" component={Link} to="/" className={classes.toolbarTitle}>
            <Typography variant="body1" color="inherit" noWrap>
              <FormattedMessage id="header.title" defaultMessage="FrozenGem" />
            </Typography>
          </Button>
          <nav>
            {language === "fr" && 
              <Button color="secondary" onClick={e => setLanguage("en")}>
                EN
              </Button>
            }
            {language === "en" &&
              <Button color="secondary" onClick={e => setLanguage("fr")}>
                FR
              </Button>
            }
          </nav>
          <LoginInBar userInfo={this.props.userInfo} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withUserInfo(withStyles(styles)(withRouter(Header)));

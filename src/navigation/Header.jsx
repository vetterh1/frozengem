/* eslint-disable react/prefer-stateless-function */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import ViewListIcon from '@material-ui/icons/ViewList';
import { withUserInfo } from '../auth/withUserInfo';
import { NavigationStyle  } from "../data/UserInfoStore";
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
  }

  render() {
    const { classes } = this.props;
    const { isAuthenticated, language, setLanguage, navigationStyle } = this.props.userInfo;
    if(!language) return null;

    return (
      <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar} disableGutters>
          <Button color="inherit" component={Link} to="/" className={classes.toolbarTitle}>
            <Typography variant="body1" color="inherit" noWrap>
              <FormattedMessage id="header.title" defaultMessage="FrozenGem" />
            </Typography>
          </Button>
          {!isAuthenticated() &&
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
          }

          {isAuthenticated() && navigationStyle === NavigationStyle.NAVIGATION_TOOLBAR && 
            <nav>
              <IconButton
                aria-label="List"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                className={classes.margin} component={Link} to="/"
                color="inherit"
              >
                <ViewListIcon />
              </IconButton>
              <IconButton
                aria-label="Add"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                className={classes.margin} component={Link} to="/add"
                color="inherit"
              >
                <SaveAltIcon />
              </IconButton>
            </nav>
          }

          <LoginInBar userInfo={this.props.userInfo} />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withUserInfo(withStyles(styles)(Header));

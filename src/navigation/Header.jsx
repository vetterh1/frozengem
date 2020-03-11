/* eslint-disable react/prefer-stateless-function */

import React from "react";
import { connect } from "react-redux";
import { userActions } from "../_actions/userActions";

import { Link, useLocation } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LoginInBar from "../navigation/LoginInBar";
import MenuNav from "./MenuNav";
import { NavigationStyle } from "./configNavigation";
// import HelpIcon from "@material-ui/icons/Help";

const styles = theme => ({
  appBar: {
    // borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
    flexDirection: "row"
  },
  toolbarTitle: {
    flexGrow: 1,
    justifyContent: "flex-start"
  },
  margin: {
    margin: theme.spacing(1, 1.5)
  }
});

const Header = ({
  classes,
  loggedIn,
  language,
  navigationStyle,
  setLanguage
  // detailsHelpCompleted,
  // setDetailsHelpCompleted
}) => {
  let location = useLocation();
  console.log("header - location=", location);
  if (
    location &&
    location.pathname &&
    location.pathname.startsWith("/details/")
  )
    return null;
  if (!language) return null;

  // const _handleHelp = async () => {
  //   console.debug("handleJoyrideCallback: detailsHelpCompleted --> true!");
  //   setDetailsHelpCompleted(!detailsHelpCompleted);
  //   return null;
  // };

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={0}
      className={classes.appBar}
    >
      <Toolbar className={classes.toolbar} disableGutters>
        <Button
          color="inherit"
          component={Link}
          to="/"
          className={classes.toolbarTitle}
        >
          <Typography variant="h5" color="inherit" noWrap>
            <FormattedMessage id="header.title" />
          </Typography>
        </Button>
        {!loggedIn && (
          <nav>
            {language === "fr" && (
              <Button color="secondary" onClick={e => setLanguage("en")}>
                EN
              </Button>
            )}
            {language === "en" && (
              <Button color="secondary" onClick={e => setLanguage("fr")}>
                FR
              </Button>
            )}
          </nav>
        )}

        {loggedIn && navigationStyle === NavigationStyle.NAVIGATION_TOOLBAR && (
          <MenuNav />
        )}
        {/* {loggedIn && <HelpIcon onClick={_handleHelp} />} */}
        <LoginInBar />
      </Toolbar>
    </AppBar>
  );
};

function mapStateToProps(state) {
  const {
    user: {
      loggedIn,
      language,
      navigationStyle
      //  detailsHelpCompleted
    }
  } = state;
  return {
    loggedIn,
    language,
    navigationStyle
    // detailsHelpCompleted
  };
}

const mapDispatchToProps = {
  setLanguage: userActions.setLanguage
  // setDetailsHelpCompleted: userActions.setDetailsHelpCompleted
};

const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default withStyles(styles)(connectedHeader);

/* eslint-disable react/prefer-stateless-function */

import React from "react";
import { connect } from "react-redux";
import { userActions } from "../_actions/userActions";

import { Link, useLocation } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LoginInBar from "../navigation/LoginInBar";
import MenuNav from "./MenuNav";
import { NavigationStyle } from "./configNavigation";
import Joyride, {STATUS} from "react-joyride";
import HelpIcon from "@material-ui/icons/Help";
// import { fade } from "@material-ui/core/styles/colorManipulator";

const styles = theme => ({
  appBar: {
    color: theme.palette.header.color,
    backgroundColor: theme.palette.header.backgroundColor,
    borderBottom: `1px solid ${theme.palette.divider}`,
    // backgroundColor: fade( theme.palette.primary.dark, 0.8),
    backdropFilter: theme.transparency ? "blur(8px) contrast(0.4) brightness(1.0)" : null,
  },
  toolbar: {
    flexWrap: "wrap",
    flexDirection: "row",
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
  // From Redux:
  loggedIn,
  language,
  navigationStyle,
  helpMessageSeen,
  showHelpDetails,
  setLanguage,
  setHelpMessageSeen,
  setShowHelpDetails,

  // From other HOC
  classes,
  intl,
}) => {
  let location = useLocation();
  console.log("header - location=", location);

  // OLD : header was hidden in details page
  // if (
  //   location &&
  //   location.pathname &&
  //   location.pathname.startsWith("/details/")
  // )
  //   return null;

  if (!language) return null;


  //
  // Help setup
  //

  const _handleHelp = async () => {
    if(location?.pathname?.startsWith("/details/"))
      setShowHelpDetails(true);
    else
      setHelpMessageSeen(!helpMessageSeen);

    return null;
  };

  const handleJoyrideCallback = (data) => {
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      setHelpMessageSeen(true);
    }
  };
  
  const helpSteps = [
    {
      target: ".help_icon",
      // title: intl.formatMessage({ id: "help.title" }),
      content: intl.formatMessage({ id: "help.description" }),
      disableBeacon: true,
    },
  ]




  return (
    <>
      {loggedIn && !helpMessageSeen && (
        <Joyride
          steps={helpSteps}
          callback={handleJoyrideCallback}
          disableScrolling={true}
          debug={true}
          continuous={true}
          // showProgress={true}
          scrollToFirstStep={true}
          locale={{
            last: intl.formatMessage({ id: "button.ok" }),
          }}
          run={true}
          styles={{
            options: {
              primaryColor: "#303f9f",
            },
          }}
        />
      )}
            
      <AppBar
        position="sticky"
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
          {loggedIn && <HelpIcon className={"help_icon"} onClick={_handleHelp} />}
          <LoginInBar />
        </Toolbar>
      </AppBar>
    </>
  );
};

function mapStateToProps(state) {
  const {
    user: {
      loggedIn,
      language,
      navigationStyle,
      helpMessageSeen,
      showHelpDetails
    }
  } = state;
  return {
    loggedIn,
    language,
    navigationStyle,
    helpMessageSeen,
    showHelpDetails
  };
}

const mapDispatchToProps = {
  setLanguage: userActions.setLanguage,
  setHelpMessageSeen: userActions.setHelpMessageSeen,
  setShowHelpDetails: userActions.setShowHelpDetails
};

const connectedHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default injectIntl(withStyles(styles)(connectedHeader));

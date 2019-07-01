
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withUserInfo } from './withUserInfo';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { MenuProfile } from './MenuProfile';
import { injectIntl, FormattedMessage } from "react-intl";
// import { FormattedMessage } from 'react-intl.macro';

const styles = {
};


class LoginInBar extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  }

  onLogin() {
    this.props.userInfo.login();
  }


  render() {
    const { isAuthenticated, getHome, language, setLanguage } = this.props.userInfo;
    return ( 
      <div>
        { !isAuthenticated() && (<Button color="inherit"  component={Link} to="/login"><FormattedMessage id="menu_profile.login" defaultMessage="Login" /></Button>) }
        {/* { isAuthenticated() && (<Button color="inherit"  component={Link} to="/logout">logout</Button>) } */}


        { isAuthenticated() && <MenuProfile homeCode={getHome()} language={language} setLanguage={setLanguage} />}

      </div>
    );
  }
}

export default injectIntl(withUserInfo(withStyles(styles)(LoginInBar)));
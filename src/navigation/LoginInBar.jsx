
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import Button from '@material-ui/core/Button';
import { withUserInfo } from '../with/withUserInfo';
import { MenuProfile } from './MenuProfile';

class LoginInBar extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
  }

  onLogin() {
    this.props.userInfo.login();
  }


  render() {
    const { isAuthenticated, getHome, language, setLanguage, leaveHome } = this.props.userInfo;
    return ( 
      <div>
        { !isAuthenticated() && (<Button color="inherit"  component={Link} to="/login"><FormattedMessage id="menu_profile.login" defaultMessage="Login" /></Button>) }
        { isAuthenticated() && <MenuProfile homeCode={getHome()} language={language} setLanguage={setLanguage} leaveHome={leaveHome} />}
      </div>
    );
  }
}

export default withUserInfo(LoginInBar);
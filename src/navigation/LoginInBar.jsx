
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import Button from '@material-ui/core/Button';
import { MenuProfile } from 'navigation/MenuProfile';

class LoginInBar extends React.Component {

  render() {
    const { isAuthenticated } = this.props;
    return ( 
      <div>
        { !isAuthenticated && (<Button color="inherit"  component={Link} to="/login"><FormattedMessage id="menu_profile.login" /></Button>) }
        { isAuthenticated && <MenuProfile />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({isAuthenticated: state.user.loggedIn});
export default connect(mapStateToProps, null)(LoginInBar);
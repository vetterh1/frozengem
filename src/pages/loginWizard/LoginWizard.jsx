import * as log from 'loglevel';
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import axios from 'axios';
import Auth from '../../auth/Auth';
import { withStyles } from '@material-ui/core/styles';
import StepWizard from 'react-step-wizard';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import config from '../../data/config'

// import stringifyOnce from '../../utils/stringifyOnce.js'

const styles = theme => ({
  button: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },  
  divWizardPage: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto", 
  },
  maxHeight: {
    display: "flex",
    flexGrow: 1,
  },
  normalHeight: {
    display: "flex",
    flexGrow: 0,
  },  
});

const logLoginWizard = log.getLogger('logLoginWizard');
// loglevelServerSend(logLoginWizard); // a setLevel() MUST be run AFTER this!
logLoginWizard.setLevel('debug');
logLoginWizard.debug('--> entering LoginWizard.jsx');



class LoginWizard extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  defaultState = {
    email: "",
    password: "",
    loginInProgress: false,
    loginFinished: false,
    loginSuccess: false,
  };

  resetState = () => {
    this.setState({...this.defaultState});
  }

  constructor(props) {
    super(props);
    this.state = {...this.defaultState};

    this.handleChange = this.handleChange.bind(this)
    this.LoginToServer = this.LoginToServer.bind(this)
  }

  // Set the received value in the state 
  // (replacing any existing one)
  handleChange = (change) => {
    const {name, value} = change;
    this.setState({[name]: value});
  }

/*
   curl -X POST http://0.0.0.0:9000/auth -i -u 123@123.com:123456 -d "access_token=S9EqDPByR2z5mnCMaRFk7b552RWaFcnn"
*/

  LoginToServer() {
    this.setState({loginInProgress: true, loginFinished: false, loginSuccess: false });
    const {email, password} = this.state;
    const boUrl = config.boUrl;
    const masterKey = config.masterKey;
    const data = { 'access_token': masterKey };
    const options = {
      method: 'POST',
      url: `${boUrl}/auth`,
      auth: {
        username: email,
        password: password
      },      
      // withCredentials : true, 
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };
    axios(options)
    .then((response) => {
      this.setState({loginInProgress: false, loginFinished: true, loginSuccess: true });
      const {user, token} = response.data;
      console.log('login OK: ' , response, user, token);
      this.props.auth.setSession({
        accessToken: token,
        email: user.email,
        // name: user.name,
        idToken: user.id,
      });

    })
    .catch((error) => {
      console.error('login error: ' , error);
      this.setState({loginInProgress: false, loginFinished: true, loginSuccess: false });
    })
    .then(() => {
      // always executed
    });
  }


  render() {
    const { classes } = this.props;
    // const { isAuthenticated } = this.props.auth;
    // if (!isAuthenticated()) return (<LoginBanner auth={this.props.auth} />);

    return (
          <div className={classes.divWizardPage}>
            <StepWizard isHashEnabled transitions={{}} className={"flex-max-height flex-direction-column"} classNameWrapper={'flex-max-height flex-direction-column'}>
              <EmailForm hashKey={'email'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <PasswordForm hashKey={'password'} onSubmit={this.LoginToServer} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
            </StepWizard>
          </div>
      );
  }
}

export default withStyles(styles, { withTheme: true })(LoginWizard);







  
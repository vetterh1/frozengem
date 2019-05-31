import * as log from 'loglevel';
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import axios from 'axios';
import UserInfo from '../../auth/UserInfo';
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from "react-intl";
import { withSnackbar } from 'notistack';
import { defineMessages } from 'react-intl.macro';
import NameForm from './NameForm';
import StepWizard from 'react-step-wizard';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import Registered from './Registered';
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

const logRegisterWizard = log.getLogger('logRegisterWizard');
// loglevelServerSend(logRegisterWizard); // a setLevel() MUST be run AFTER this!
logRegisterWizard.setLevel('debug');
logRegisterWizard.debug('--> entering RegisterWizard.jsx');


const messages = defineMessages({ 
  success: {
    id: 'register.success',
    defaultMessage: 'Congratulations, you are now registered!',
    description: 'Congratulations, you are now registered!',
  },    
  error: {
    id: 'register.error',
    defaultMessage: 'Sorry, the registration failed, please try again...',
    description: 'Sorry, the registration failed',
  },
});


class RegisterWizard extends React.Component {
  static propTypes = {
    userInfo: PropTypes.instanceOf(UserInfo).isRequired,
  }

  defaultState = {
    location: null,
    email: "",
    password: "",
    name: "",
    registrationInProgress: false,
    registrationFinished: false,
    registrationSuccess: false,
  };

  resetState = () => {
    this.setState({...this.defaultState});
  }

  constructor(props) {
    super(props);
    this.state = {...this.defaultState};

    this.handleChange = this.handleChange.bind(this)
    this.onClickRegister = this.onClickRegister.bind(this)
  }

  // Set the received value in the state 
  // (replacing any existing one)
  handleChange = (change) => {
    const {name, value} = change;
    console.log(`name:${name}, value:${value}`);
    this.setState({[name]: value});
  }

  onLogin() {
    this.props.userInfo.login();
  }


  registerToServer() {
    this.setState({registrationInProgress: true, registrationFinished: false, registrationSuccess: false });
    const {email, password, name} = this.state;
    const boUrl = config.boUrl;
    const masterKey = config.masterKey;
    const data = { 'access_token': masterKey, email, password, name };
    const options = {
      method: 'POST',
      url: `${boUrl}/users`,
      // withCredentials : true, 
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };
    axios(options)
    .then((response) => {
      this.setState({registrationInProgress: false, registrationFinished: true, registrationSuccess: true });
      const {user, token} = response.data;
      console.log('registration OK: ' , response, user, token);
      this.props.userInfo.setSession({
        accessToken: token,
        email: user.email,
        name: user.name,
        idToken: user.id,
      });
      this.props.enqueueSnackbar(
        this.props.intl.formatMessage(messages.success), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      );      
    })
    .catch((error) => {
      console.error('registration error: ' , error);
      this.setState({registrationInProgress: false, registrationFinished: true, registrationSuccess: false });
      this.props.enqueueSnackbar(
        this.props.intl.formatMessage(messages.error), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      );    })
    .then(() => {
      // always executed
    });
  }

  onClickRegister() { 
    this.registerToServer();
  }


  render() {
    const { classes } = this.props;
    // const { isAuthenticated } = this.props.userInfo;
    // if (!isAuthenticated()) return (<LoginBanner userInfo={this.props.userInfo} />);

    return (
          <div className={classes.divWizardPage}>
            <StepWizard isHashEnabled transitions={{}} className={"flex-max-height flex-direction-column"} classNameWrapper={'flex-max-height flex-direction-column'}>
              <NameForm hashKey={'name'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <EmailForm hashKey={'email'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <PasswordForm hashKey={'password'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <Registered hashKey={'registered'} onClickRegister={this.onClickRegister} state={this.state} />
            </StepWizard>
          </div>
      );
  }
}

export default injectIntl(withSnackbar(withStyles(styles, { withTheme: true })(RegisterWizard)));







  
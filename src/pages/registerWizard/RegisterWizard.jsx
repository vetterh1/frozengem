import * as log from 'loglevel';
import React from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withUserInfo } from '../../auth/withUserInfo';
import { withSnackbar } from 'notistack';
import { injectIntl, defineMessages } from "react-intl";
// import { defineMessages } from 'react-intl.macro';
import NameForm from './NameForm';
import StepWizard from 'react-step-wizard';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
import Registered from './Registered';

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
  alreadyexist: {
    id: 'register.alreadyexist',
    defaultMessage: 'Sorry, this user already exists, please enter a different name & email...',
    description: 'Sorry, this user already exists',
  },

  
});


class RegisterWizard extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
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



  async registerToServer() {
    this.setState({registrationInProgress: true, registrationFinished: false, registrationSuccess: false });

    const { registerToServer } = this.props.userInfo;

    const {email, password, name} = this.state;
    try {
      const userName = await registerToServer(email, password, name );
      console.log('userName: ' , userName);

      // Success message
      this.setState({registrationInProgress: false, registrationFinished: true, registrationSuccess: true });
      this.props.enqueueSnackbar(
        this.props.intl.formatMessage(messages.success), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      );      
    } catch (error) {
      console.error('registration error: ' , error);
      this.setState({registrationInProgress: false, registrationFinished: true, registrationSuccess: false });

      let errorKey = messages.error;
      if (error.request && error.response.status === 409)
        errorKey = messages.alreadyexist;

      this.props.enqueueSnackbar(
        this.props.intl.formatMessage(errorKey), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      ); 
    }
  }


  onClickRegister() { 
    this.registerToServer();
  }


  render() {
    const { classes } = this.props;
    const { isAuthenticated } = this.props.userInfo;
    if (isAuthenticated()) return <Redirect to='/' />;

    return (
          <div className={classes.divWizardPage}>
            <StepWizard isHashEnabled transitions={{}} className={"flex-normal-height flex-direction-column"} classNameWrapper={'flex-normal-height flex-direction-column'}>
              <NameForm hashKey={'name'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <EmailForm hashKey={'email'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <PasswordForm hashKey={'password'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <Registered hashKey={'registered'} onClickRegister={this.onClickRegister} state={this.state} />
            </StepWizard>
          </div>
      );
  }
}

export default injectIntl(withUserInfo(withSnackbar(withStyles(styles, { withTheme: true })(RegisterWizard))));







  
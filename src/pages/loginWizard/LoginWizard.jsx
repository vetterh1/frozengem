import * as log from 'loglevel';
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { injectIntl } from "react-intl";
import { defineMessages } from 'react-intl.macro';
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Auth from '../../auth/Auth';
import StepWizard from 'react-step-wizard';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';


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


const messages = defineMessages({ 
  success: {
    id: 'login.success',
    defaultMessage: 'Congratulations, you are now logged-in!',
    description: 'Congratulations, you are now logged-in!',
  },     
  unauthorized: {
    id: 'login.unauthorized',
    defaultMessage: 'Invalid login / password, please try again!',
    description: 'Invalid login / password',
  },
  error: {
    id: 'login.error',
    defaultMessage: 'Sorry, an error occured. Please try again!',
    description: 'Sorry, an error occured',
  },
});



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
    this.login = this.login.bind(this)
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

  async login() {
    const { login } = this.props.auth;

    const {email, password} = this.state;
    try {
      const userName = await login(email, password );
      console.log('userName: ' , userName);

      // Success message
      this.props.enqueueSnackbar(
        this.props.intl.formatMessage(messages.success), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      );

      // navigate to the home route
      this.props.history.push('/');
    } catch (error) {

      const unauthorized = error.response && error.response.status  === 401; 
      const message = unauthorized ? messages.unauthorized : messages.error;

      // Error message
      this.props.enqueueSnackbar(
        this.props.intl.formatMessage(message), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}}
      );
    }
  }


  render() {
    const { classes } = this.props;
    // const { isAuthenticated } = this.props.auth;
    // if (!isAuthenticated()) return (<LoginBanner auth={this.props.auth} />);

    return (
          <div className={classes.divWizardPage}>
            <StepWizard isHashEnabled transitions={{}} className={"flex-max-height flex-direction-column"} classNameWrapper={'flex-max-height flex-direction-column'}>
              <EmailForm hashKey={'email'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <PasswordForm hashKey={'password'} onSubmit={this.login} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
            </StepWizard>
          </div>
      );
  }
}

export default injectIntl(withRouter(withSnackbar(withStyles(styles, { withTheme: true })(LoginWizard))));







  
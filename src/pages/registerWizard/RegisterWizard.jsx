// TODO Refactor this file for Redux
// TODO Refactor this file for intl simplification

import * as log from 'loglevel';
import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../_actions/userActions';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from "react-intl";
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



class intRegisterWizard extends React.Component {


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
    this.register = this.register.bind(this)
  }

  // Set the received value in the state 
  // (replacing any existing one)
  handleChange = (change) => {
    const {name, value} = change;
    console.log(`name:${name}, value:${value}`);
    this.setState({[name]: value});
  }



  async register() {
    this.setState({registrationInProgress: true, registrationFinished: false, registrationSuccess: false });

    const {email, password, name} = this.state;
    try {
      const userName = await this.props.register(email, password, name);
      console.log('userName: ' , userName);

      // Success message
      this.setState({registrationInProgress: false, registrationFinished: true, registrationSuccess: true });
      const key = this.props.enqueueSnackbar(
        this.props.intl.formatMessage({id: 'register.success'}), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {this.props.closeSnackbar(key);}}
      );      
    } catch (error) {
      console.error('registration error: ' , error);
      this.setState({registrationInProgress: false, registrationFinished: true, registrationSuccess: false });

      let errorKey = 'register.error';
      if (error.request && error.response.status === 409)
        errorKey = 'register.alreadyexist';

        const key = this.props.enqueueSnackbar(
        this.props.intl.formatMessage({id: errorKey}), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {this.props.closeSnackbar(key);}}
      ); 
    }
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
              <Registered hashKey={'registered'} onClickRegister={this.register()} state={this.state} />
            </StepWizard>
          </div>
      );
  }
}


const mapDispatchToProps = {
  register: userActions.register,
};

const connectedRegisterWizard = connect(null, mapDispatchToProps)(intRegisterWizard);

export default injectIntl(withStyles(styles, { withTheme: true })(connectedRegisterWizard));







  
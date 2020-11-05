import React from 'react';
import { connect } from 'react-redux';
import { userActions } from '_actions/userActions';
import { Redirect } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import { injectIntl } from "react-intl";
import NameForm from './NameForm';
import StepWizard from 'react-step-wizard';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';
// import stringifyOnce from 'utils/stringifyOnce'

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


class RegisterWizard extends React.Component {


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
    console.debug(`name:${name}, value:${value}`);
    this.setState({[name]: value});
  }

  async register() {
    const {email, password, name} = this.state;
    const user = await this.props.register(email, password, name);
    console.debug("RegisterWizard - after register - userName:", user);  
  }


  render() {
    const { classes } = this.props;

    if (this.props.loggedIn) { 

      if(!this.props.home) {
        // navigate to the choose home page
        console.debug('[>>> RegisterWizard ------>>>----- /choosehome >>>] Reason: choose home');
        return <Redirect to='/choosehome' /> 
      } else {
        console.debug('[>>> RegisterWizard ------>>>----- /dashboard >>>] Reason: already logged in');
        return <Redirect to='/dashboard' /> 
      }
    };

    return (
          <div className={classes.divWizardPage}>
            <StepWizard isHashEnabled transitions={{}} className={"flex-normal-height flex-direction-column"} classNameWrapper={'flex-normal-height flex-direction-column'}>
              <NameForm hashKey={'name'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <EmailForm hashKey={'email'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <PasswordForm hashKey={'password'}  onSubmit={this.register} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
            </StepWizard>
          </div>
      );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  home: state.user.home
});

const mapDispatchToProps = {
  register: userActions.register,
};

const connectedRegisterWizard = connect(mapStateToProps, mapDispatchToProps)(RegisterWizard);

export default injectIntl(withStyles(styles, { withTheme: true })(connectedRegisterWizard));







  
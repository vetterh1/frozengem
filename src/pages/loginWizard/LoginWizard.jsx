import React from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux';
import { userActions } from '../../_actions/userActions';
import { withStyles } from '@material-ui/core/styles';
import StepWizard from 'react-step-wizard';
import EmailForm from './EmailForm';
import PasswordForm from './PasswordForm';

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

class LoginWizard extends React.Component {

  defaultState = {
    email: "",
    password: "",
    loginInProgress: false,
    loginFinished: false,
    loginSuccess: false,
  };

  resetState = () => {
    console.debug("LoginWizard.resetState");
    this.setState({...this.defaultState});
  }

  constructor(props) {
    console.debug("LoginWizard.constructor");
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
    const {email, password} = this.state;
    await this.props.login(email, password );
    console.debug("LoginWizard.login - after dispatch - email:", email);  
  }


  render() {

    // Once we are logged-in, let's redirect to main page!
    if (this.props.isAuthenticated) { 
      console.debug('[>>> LoginWizard ------>>>----- / >>>] Reason: authenticated');
      return <Redirect to='/' />
    };

    const { classes } = this.props;
    return (
          <div className={classes.divWizardPage}>
            <StepWizard isHashEnabled transitions={{}} className={"flex-normal-height flex-direction-column"} classNameWrapper={'flex-normal-height flex-direction-column'}>
              <EmailForm hashKey={'email'} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
              <PasswordForm hashKey={'password'} onSubmit={this.login} handleChange={this.handleChange} resetState={this.resetState} state={this.state} />
            </StepWizard>
          </div>
      );
  }
}

const mapDispatchToProps = {
  login: userActions.login,
};
const mapStateToProps = state => ({isAuthenticated: state.user.loggedIn});
const connectedLoginWizard = connect(mapStateToProps, mapDispatchToProps)(LoginWizard);

export default withStyles(styles, { withTheme: true })(connectedLoginWizard);







  
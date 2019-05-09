import * as log from 'loglevel';
import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../../auth/Auth';
import { withStyles } from '@material-ui/core/styles';
import NameForm from './NameForm';
import StepWizard from 'react-step-wizard';
import EmailForm from './EmailForm';
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



class RegisterWizard extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  defaultState = {
    location: null,
    email: "",
    name: "",
  };

  resetState = () => {
    this.setState({...this.defaultState});
  }

  constructor(props) {
    super(props);
    this.state = {...this.defaultState};

    this.handleChange = this.handleChange.bind(this)
    this.handleArrayToggle = this.handleArrayToggle.bind(this)

  }

  // Set the received value in the state 
  // (replacing any existing one)
  handleChange = (change) => {
    const {name, value} = change;
    this.setState({[name]: value});
  }

  // Add the received value to the state value lists if it does not exist yet
  // If it already exists: remove it
  handleArrayToggle = (change) => {
    const {name, value} = change;
    const existingValues = this.state[name];
    const alreadyExists = existingValues.find(valueInList => valueInList === value);
    let newValues;
    if(alreadyExists){
      newValues = existingValues.filter(valueInList => valueInList !== value);
    } else {
      newValues = [...existingValues, value];
    }
    this.setState({[name]: newValues})    
  }


  onLogin() {
    this.props.auth.login();
  }

  render() {
    const { classes } = this.props;
    // const { isAuthenticated } = this.props.auth;
    // if (!isAuthenticated()) return (<LoginBanner auth={this.props.auth} />);

    return (
          <div className={classes.divWizardPage}>
            <StepWizard isHashEnabled className={"flex-max-height flex-direction-column"} classNameWrapper={'flex-max-height flex-direction-column'}>
              <NameForm hashKey={'name'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} resetState={this.resetState} state={this.state} />
              <EmailForm hashKey={'email'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} resetState={this.resetState} state={this.state} />
              <Registered hashKey={'registered'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} resetState={this.resetState} state={this.state} />
            </StepWizard>
          </div>
      );
  }
}

export default withStyles(styles, { withTheme: true })(RegisterWizard);







  
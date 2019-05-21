import * as log from 'loglevel';
import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import axios from 'axios';
import Auth from '../../auth/Auth';
import { withStyles } from '@material-ui/core/styles';
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



class RegisterWizard extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  defaultState = {
    location: null,
    email: "",
    password: "",
    password2: "",
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
    this.onClickRegister = this.onClickRegister.bind(this)
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



  // POST /users HTTP/1.1
  // Host: 0.0.0.0:9000
  // Content-Type: application/x-www-form-urlencoded
  // Authorization: Basic YWRtaW5AZXhhbXBsZS5jb206MTIzNDU2
  // User-Agent: PostmanRuntime/7.11.0
  // Accept: */*
  // Cache-Control: no-cache
  // Postman-Token: 6daf749b-090b-4787-ba7b-c566194be416,841f5652-abd3-4969-a7cc-a9a806ede374
  // Host: 0.0.0.0:9000
  // accept-encoding: gzip, deflate
  // content-length: 98
  // Connection: keep-alive
  // cache-control: no-cache
  
  // access_token=S9EqDPByR2z5mnCMaRFk7b552RWaFcnn&email=admin%40example.com&password=123456&role=admin



  testServer() {
    const boUrl = config.boUrl;
    const masterKey = config.masterKey;
    const data = { 'access_token': masterKey, email: 'toto@titi.com', password: '123654' };
    const options = {
      method: 'POST',
      url: `${boUrl}/users`,
      withCredentials : true, 
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };
    axios(options)
    .then(function (response) {
      console.log('registration OK: ' , response);
    })
    .catch(function (error) {
      console.error('registration error: ' , error);
    })
    .then(function () {
      // always executed
    });
  }

  onClickRegister() { 
    this.testServer();
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
              <PasswordForm hashKey={'password'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} resetState={this.resetState} state={this.state} />
              <Registered hashKey={'registered'} onClickRegister={this.onClickRegister} state={this.state} />
            </StepWizard>
          </div>
      );
  }
}

export default withStyles(styles, { withTheme: true })(RegisterWizard);







  
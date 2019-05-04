import * as log from 'loglevel';
import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../../auth/Auth';
import { withStyles } from '@material-ui/core/styles';
import CategoryForm from './CategoryForm';
import DetailsForm from './DetailsForm';
import ContainerForm from './ContainerForm';
import ContainerColorForm from './ContainerColorForm';
import SizeForm from './SizeForm';
import FreezerForm from './FreezerForm';
import LocationForm from './LocationForm';
import Results from './Results';
import StepWizard from 'react-step-wizard';
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

const logAddWizard = log.getLogger('logAddWizard');
// loglevelServerSend(logAddWizard); // a setLevel() MUST be run AFTER this!
logAddWizard.setLevel('debug');
logAddWizard.debug('--> entering AddWizard.jsx');



class AddWizard extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }

  defaultState = {
    category: null,
    details: [],
    container: null,
    color: null,
    size: null,
    freezer: null,
    location: null,
    name: "",
    expirationDate: "1968-12-21",
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
              <CategoryForm  hashKey={'category'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} state={this.state} />
              <DetailsForm hashKey={'details'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} state={this.state} />
              <ContainerForm hashKey={'container'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} state={this.state} />
              <ContainerColorForm hashKey={'color'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} state={this.state} />
              <SizeForm hashKey={'size'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} state={this.state} />
              <FreezerForm hashKey={'freezer'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} state={this.state} />
              <LocationForm hashKey={'location'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} state={this.state} />
              <Results hashKey={'results'} handleChange={this.handleChange} handleArrayToggle={this.handleArrayToggle} resetState={this.resetState} state={this.state} />
            </StepWizard>
          </div>
      );
  }
}

export default withStyles(styles, { withTheme: true })(AddWizard);







  
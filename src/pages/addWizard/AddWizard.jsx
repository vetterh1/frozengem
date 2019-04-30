import * as log from 'loglevel';
import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../../auth/Auth';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CategoryForm from './CategoryForm';
import DetailsForm from './DetailsForm';
import ContainerForm from './ContainerForm';
import SizeForm from './SizeForm';
import LocationForm from './LocationForm';
import Results from './Results';

import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import stringifyOnce from '../../utils/stringifyOnce.js'

const styles = theme => ({
  button: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },  
  divWizard: {
    marginTop: theme.spacing(2),
  },
});

const logAddWizard = log.getLogger('logAddWizard');
// loglevelServerSend(logAddWizard); // a setLevel() MUST be run AFTER this!
logAddWizard.setLevel('debug');
logAddWizard.debug('--> entering AddWizard.jsx');

const steps = ['Category', 'Details', 'Container', 'Size', 'Location'];

function getStepContent(step, state, handleChange, handleChangeToArray) {
  switch (step) {
    case 0:
      return <CategoryForm handleChange={handleChange} state={state} />;
    case 1:
      return <DetailsForm handleChange={handleChange} handleChangeToArray={handleChangeToArray} state={state} />;
    case 2:
      return <ContainerForm handleChange={handleChange} state={state} />;
    case 3:
      return <SizeForm handleChange={handleChange} state={state} />;
    case 4:
      return <LocationForm handleChange={handleChange} state={state} />;
    default:
      throw new Error('Unknown step');
  }
}

class AddWizard extends React.Component {
  static propTypes = {
    auth: PropTypes.instanceOf(Auth).isRequired,
  }


  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      details: [],
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeToArray = this.handleChangeToArray.bind(this)

  }

  handleChange = (change, autoNext) => {
    const {name, value} = change;
    this.setState({[name]: value}, autoNext ? this.handleNext : null)    
  }

  handleChangeToArray = (change) => {
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
   
  handleSubmit = event => {
    event.preventDefault()
    const { category, details, container, size, location } = this.state
    alert(`Results: \n 
           category: ${category} \n 
           details: ${details} \n
           container: ${container} \n
           size: ${size} \n
           location: ${location}`)
  }

  handleNext = () => { this.setState((state) => { return {activeStep: state.activeStep + 1} }); };
  handleBack = () => { this.setState((state) => { return {activeStep: state.activeStep - 1} }); };

  


  onLogin() {
    this.props.auth.login();
  }

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    // const { isAuthenticated } = this.props.auth;
    // if (!isAuthenticated()) return (<LoginBanner auth={this.props.auth} />);

    return (
          <div className={classes.divWizard}>
            {activeStep === steps.length ? (
              <React.Fragment>
                <p>
                  {stringifyOnce(this.state)}
                </p>
                <Results />
              </React.Fragment>

            ) : (
              <React.Fragment>
                {getStepContent(activeStep, this.state, this.handleChange, this.handleChangeToArray)}

                <MobileStepper
                  variant="dots"
                  steps={6}
                  position="static"
                  activeStep={activeStep}
                  className={classes.root}
                  nextButton={
                    <Button size="small" onClick={this.handleNext} variant="contained" color="primary" className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Get your code' : 'Next'}
                      {this.props.theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                  }
                  backButton={
                    <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                      {this.props.theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                      Back
                    </Button>
                  }
                />                
              </React.Fragment>
            )}
          </div>
        
      );
  }
}

export default withStyles(styles, { withTheme: true })(AddWizard);







  
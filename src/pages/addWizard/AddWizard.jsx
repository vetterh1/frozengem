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

function getStepContent(step) {
  switch (step) {
    case 0:
      return <CategoryForm />;
    case 1:
      return <DetailsForm />;
    case 2:
      return <ContainerForm />;
    case 3:
      return <SizeForm />;
    case 4:
      return <LocationForm />;
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
      category: '',
      details:  '',
      container: '',
      size: '', 
      location: '',
    };
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  handleChange = event => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })    
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
              <Results />
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}

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







  
import * as log from 'loglevel';
import React from 'react';
import PropTypes from 'prop-types';
import Auth from '../../auth/Auth';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import CategoryForm from './CategoryForm';
import DetailsForm from './DetailsForm';
import ContainerForm from './ContainerForm';
import SizeForm from './SizeForm';
import LocationForm from './LocationForm';
import EndForm from './EndForm';

// import MobileStepper from '@material-ui/core/MobileStepper';
// import Button from '@material-ui/core/Button';
// import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
// import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
});

const logAddWizard = log.getLogger('logAddWizard');
// loglevelServerSend(logAddWizard); // a setLevel() MUST be run AFTER this!
logAddWizard.setLevel('debug');
logAddWizard.debug('--> entering AddWizard.jsx');

const steps = ['Category', 'Details', 'Container', 'Size', 'Location', 'EndForm'];

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
      case 5:
      return <EndForm />;
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

        <React.Fragment>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={this.handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </React.Fragment>



      );
  }
}

export default withStyles(styles)(AddWizard);







  
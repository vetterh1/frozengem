import React from 'react';
import PropTypes from 'prop-types';
import {WizNavBar, WizPageTitle} from "./WizUtilComponents";
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';

//
// (!) Way of working (!)
//
// - Simple way (NO validity check) --> the entered text is sent to the parent only when the user clicks on Next (as a parameter of handleNext)
// - Need validation --> same a simple way + the text is sent at every change to a validityCheck parent method.
//     (!) validityCheck is async. it should return null if all is OK, or an error message if not
//
// (!) handleBack & handleNext & validityCheck are async (!)
//

const TextSelection = ({name, title, label, handleBack = null, handleNext = null, initialValue = "", validityCheck = null, showNavigation = false, backDisabled = false, isActive, currentStep, goToStep}) => {

  if(isActive === false) return null;

  const [value, setValue] = React.useState(initialValue);
  const [validationMessage, setvalidationMessage] = React.useState(validityCheck ? validityCheck(initialValue) : (label ? label : ""));


  const _handleBack = async () => {
    // Clear current value when return to previous page
    if(handleBack){
      const nbStepsBack = await handleBack({ [name]: undefined }); 
      goToStep(currentStep - nbStepsBack);
    }
  };

  const _handleNext = async () => {
    if(handleNext){
      const nbStepsForward = await handleNext({ [name]: value }); 
      goToStep(currentStep + nbStepsForward);
    }
  };

  // Only for multiselection 
  const _handleChange = async (event) => {
    setValue(event.target.value);
    if(validityCheck){
      let validationMessage = await validityCheck(event.target.value);
      if(validationMessage === null) {
        if(label)
          validationMessage = label
        else
          validationMessage = "";
      }
      setvalidationMessage();
    }
  };


  return (
    <div className={"flex-normal-height flex-direction-column"}>
      <WizPageTitle message={title} />
      <FormControl className={"flex-normal-height flex-direction-column huge-margin-down"}>
        <Input
          id={name}
          value={value}
          onChange={_handleChange}
          aria-describedby="name-text"
          fullWidth
        />
        <FormHelperText id="name-text">{validationMessage ? validationMessage : (label ? label : "---")}</FormHelperText>
      </FormControl>
      {showNavigation &&
        <WizNavBar isBackDisabled={backDisabled} onClickNext={_handleNext} onClickPrevious={_handleBack} />
      }
    </div>

  )
}

TextSelection.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  initialValue: PropTypes.string,
  validityCheck: PropTypes.func,  // return null if valid, or otherwise, an error string to display
  showNavigation: PropTypes.bool,
  backDisabled: PropTypes.bool,
  // Props for StepWizard, can be null when call NOT from StepWizard:
  hashKey: PropTypes.string,
  // Props injected by StepWizard, can be null when call NOT from StepWizard:
  isActive: PropTypes.bool,
  currentStep: PropTypes.number,
  goToStep: PropTypes.func,
}

export default TextSelection;
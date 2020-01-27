/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import PropTypes from "prop-types";
import { WizNavBar, WizPageTitle } from "./WizUtilComponents";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import { DatePicker } from "@material-ui/pickers";

//
// (!) Way of working (!)
//
// - Simple way (NO validity check)
//       --> the entered text is sent to the parent only when the user clicks on Next (as a parameter of handleNext)
//       --> help parameters shows an optional message under the text input
// - Need validation
//       --> same a simple way
//       -->  + the text is sent at every change to a parentUpdateValue parent method.
//            (the help text is replaced by the result of this function, see below)
//
//            (!) parentUpdateValue should return null if all is OK, or an error message if not
//
// (!) handleBack & handleNext & parentUpdateValue are async (!)
//

const TextOrDateSelection = ({
  name,
  isDate = false,
  title,
  help,
  handleBack = null,
  handleNext = null,
  initialValue,
  parentUpdateValue,
  showNavigation = false,
  navNextIsOk = false,
  backDisabled = false,
  isActive,
  currentStep,
  goToStep
}) => {
  if (isActive === false) return null;

  const [value, setValue] = React.useState(initialValue);
  const [validationMessage, setvalidationMessage] = React.useState(
    // parentUpdateValue ? parentUpdateValue(initialValue) : help ? help : ""
  );

  console.debug("TextOrDateSelection init: name, initialValue = ", name, initialValue);


  const _handleBack = async () => {
    // Clear current value when return to previous page
    if (handleBack) {
      const nbStepsBack = await handleBack({ [name]: undefined });
      if (nbStepsBack) goToStep(currentStep - nbStepsBack);
    }
  };

  const _handleNext = async () => {
    if (handleNext) {
      const nbStepsForward = await handleNext({ [name]: value });
      if (nbStepsForward) goToStep(currentStep + nbStepsForward);
    }
  };

  const _handleSimpleChange = async (newValue, event) => {
    console.debug("TextOrDateSelection._handleSimpleChange start: old, new, event = : ", value, newValue, event);
    setValue(newValue);
    if (parentUpdateValue) {
      let validationMessage = await parentUpdateValue({ [name]: newValue });
      // console.debug("TextOrDateSelection._handleSimpleChange 2: ", value, newValue, event);
      // if (validationMessage === null) {
      //   if (help) validationMessage = help;
      //   else validationMessage = "";
      // }
      setvalidationMessage();
    }
    console.debug("TextOrDateSelection._handleSimpleChange end: old, new, event = : ", value, newValue, event);
  };

  const _handleDateChange = async dateAsObject => {
    await _handleSimpleChange(dateAsObject.getTime());
  };

  const _handleEventChange = async event => {
    await _handleSimpleChange(event.target.value, event);
  };

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6, 1);

  return (
    <div className={"flex-normal-height flex-direction-column"}>
      <WizPageTitle message={title} />
      {!isDate && (
        <FormControl
          className={
            "flex-normal-height flex-direction-column margin-top margin-down"
          }
        >
          <Input
            id={name}
            value={value}
            onChange={_handleEventChange}
            aria-describedby="name-text"
            fullWidth
          />
          <FormHelperText id="name-text">
            {validationMessage ? validationMessage : help ? help : ""}
          </FormHelperText>
        </FormControl>
      )}
      {isDate && (
        <div
          className={
            "flex-normal-height flex-direction-column margin-top margin-down"
          }
        >
          <DatePicker
            views={["year", "month"]}
            value={value}
            onChange={_handleDateChange}
            label={help}
            minDate={sixMonthsAgo}
            autoOk
            clearable
          />
        </div>
      )}
      {showNavigation && (
        <WizNavBar
          isBackDisabled={backDisabled}
          onClickNext={_handleNext}
          onClickPrevious={_handleBack}
          nextIsOk={navNextIsOk}
        />
      )}
    </div>
  );
};

TextOrDateSelection.propTypes = {
  name: PropTypes.string.isRequired,
  isDate: PropTypes.bool,
  title: PropTypes.string.isRequired,
  help: PropTypes.string,
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  parentUpdateValue: PropTypes.func.isRequired, // return null if valid, or otherwise, an error string to display
  showNavigation: PropTypes.bool,
  navNextIsOk: PropTypes.bool,
  backDisabled: PropTypes.bool,
  // Props for StepWizard, can be null when call NOT from StepWizard:
  hashKey: PropTypes.string,
  // Props injected by StepWizard, can be null when call NOT from StepWizard:
  isActive: PropTypes.bool,
  currentStep: PropTypes.number,
  goToStep: PropTypes.func
};

export default TextOrDateSelection;

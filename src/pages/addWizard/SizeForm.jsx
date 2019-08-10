import React from 'react';
import PropTypes from 'prop-types';
import {WizNavBar, WizPageTitle} from "../utils/WizUtilComponents";
import SelectFromMatrix from "../utils/SelectFromMatrix";



const SizeForm = ({title, handleChange, secondaryHandleChange, items, preselectedItems, nbStepsBack = 1, showNavigation = false, isActive, currentStep, goToStep, nextStep}) => {

  if(!items) return null;
  if(isActive === false) return null;

  const handleClick = (id) => {
    handleChange({ size: id });
    if(secondaryHandleChange) secondaryHandleChange({ size: id });
    if(isActive !== undefined) nextStep();
  };

  const handlePrevious = () => {
    // Clear current value when return to previous page
    handleChange({ size: undefined }); 
    goToStep(currentStep-nbStepsBack);
  };

  return (
    <div className={"flex-normal-height flex-direction-column"}>
      <WizPageTitle message={title} />
      <SelectFromMatrix name="size" defaultIconName={"sizeDefault"} items={items} itemInState={preselectedItems} itemInStateIsAnArray={false} handleClick={handleClick} />
      {showNavigation &&
        <WizNavBar isBackDisabled={nbStepsBack === 0} onClickNext={null} onClickPrevious={handlePrevious} />
      }
    </div>

  )
}

SizeForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  secondaryHandleChange: PropTypes.func,
  items: PropTypes.array.isRequired,
  preselectedItems: PropTypes.oneOfType([PropTypes.string,PropTypes.number]), // can be null: nothing is pre-selected
  nbStepsBack: PropTypes.number,
  showNavigation: PropTypes.bool,
  // Props for StepWizard, can be null when call NOT from StepWizard:
  hashKey: PropTypes.string,
  // Props injected by StepWizard, can be null when call NOT from StepWizard:
  isActive: PropTypes.bool,
  currentStep: PropTypes.number,
  goToStep: PropTypes.func,
  nextStep: PropTypes.func,
}

export default SizeForm;
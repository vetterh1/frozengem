import React from 'react';
import PropTypes from 'prop-types';
import {WizNavBar, WizPageTitle} from "./WizUtilComponents";
import SelectFromMatrix from "./SelectFromMatrix";



const CharacteristicsSelection = ({name, title, handleChange, secondaryHandleChange, items, preselectedItems, nbStepsBack = 1, nbStepsForward = 1, showNavigation = false, isActive, currentStep, goToStep, nextStep}) => {

  if(!items) return null;
  if(isActive === false) return null;

  const handleClick = (id) => {
    console.log("CharacteristicsSelection.handleClick: ", nbStepsForward);
    handleChange({ [name]: id });
    console.log("CharacteristicsSelection.handleClick: after handleChange");
    if(secondaryHandleChange) secondaryHandleChange({ [name]: id });
    if(isActive !== undefined) goToStep(currentStep+nbStepsForward);
  };

  const handlePrevious = () => {
    console.log("CharacteristicsSelection.handlePrevious: ", nbStepsBack);
    // Clear current value when return to previous page
    handleChange({ [name]: undefined }); 
    console.log("CharacteristicsSelection.handlePrevious: after handlePrevious");
    goToStep(currentStep-nbStepsBack);
  };

  return (
    <div className={"flex-normal-height flex-direction-column"}>
      <WizPageTitle message={title} />
      <SelectFromMatrix name={name} defaultIconName={name+"Default"} items={items} itemInState={preselectedItems} itemInStateIsAnArray={false} handleClick={handleClick} />
      {showNavigation &&
        <WizNavBar isBackDisabled={nbStepsBack === 0} onClickNext={null} onClickPrevious={handlePrevious} />
      }
    </div>

  )
}

CharacteristicsSelection.propTypes = {
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  secondaryHandleChange: PropTypes.func,
  items: PropTypes.array.isRequired,
  preselectedItems: PropTypes.oneOfType([PropTypes.string,PropTypes.number]), // can be null: nothing is pre-selected
  nbStepsBack: PropTypes.number,
  nbStepsForward: PropTypes.number,
  showNavigation: PropTypes.bool,
  // Props for StepWizard, can be null when call NOT from StepWizard:
  hashKey: PropTypes.string,
  // Props injected by StepWizard, can be null when call NOT from StepWizard:
  isActive: PropTypes.bool,
  currentStep: PropTypes.number,
  goToStep: PropTypes.func,
  nextStep: PropTypes.func,
}

export default CharacteristicsSelection;
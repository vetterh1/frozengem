import React from 'react';
import PropTypes from 'prop-types';
import {WizNavBar, WizPageTitle} from "./WizUtilComponents";
import SelectFromMatrix from "./SelectFromMatrix";



const CharacteristicsSelection = ({name, title, handleChange, secondaryHandleChange, handleBack, items, preselectedItems, showNavigation = false, backDisabled = false, isActive, currentStep, goToStep, nextStep}) => {

  if(isActive === false) return null;
  if(!items) return null;

  const handleClick = async (id) => {
    const nbStepsForward = await handleChange({ [name]: id });
    if(secondaryHandleChange) secondaryHandleChange({ [name]: id });
    if(nbStepsForward)
      goToStep(currentStep + nbStepsForward);
  };

  const _handleBack = async () => {
    // Clear current value when return to previous page
    if(handleBack){
      const nbStepsBack = await handleBack({ [name]: undefined }); 
      goToStep(currentStep - nbStepsBack);
    }
  };

  return (
    <div className={"flex-normal-height flex-direction-column"}>
      <WizPageTitle message={title} />
      <SelectFromMatrix name={name} defaultIconName={name+"Default"} items={items} itemInState={preselectedItems} itemInStateIsAnArray={false} handleClick={handleClick} />
      {showNavigation &&
        <WizNavBar isBackDisabled={backDisabled} onClickNext={null} onClickPrevious={_handleBack} />
      }
    </div>

  )
}

CharacteristicsSelection.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  secondaryHandleChange: PropTypes.func,
  handleBack: PropTypes.func,
  items: PropTypes.array.isRequired,
  preselectedItems: PropTypes.oneOfType([PropTypes.string,PropTypes.number]), // can be null: nothing is pre-selected
  showNavigation: PropTypes.bool,
  backDisabled: PropTypes.bool,
  // Props for StepWizard, can be null when call NOT from StepWizard:
  hashKey: PropTypes.string,
  // Props injected by StepWizard, can be null when call NOT from StepWizard:
  isActive: PropTypes.bool,
  currentStep: PropTypes.number,
  goToStep: PropTypes.func,
  nextStep: PropTypes.func,
}

export default CharacteristicsSelection;
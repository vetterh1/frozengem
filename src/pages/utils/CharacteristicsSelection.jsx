import React from 'react';
import PropTypes from 'prop-types';
import {WizNavBar, WizPageTitle} from "./WizUtilComponents";
import SelectFromMatrix from "./SelectFromMatrix";



//
// (!) handleBack & handleNext & handleChange are async (!)
//

// (!) Multi selection caution (!)
// Returns only the item clicked
// It's the responsibility of the parent to aggregate the multiple selected 
// and return them as an array in preselectedItems (with multiselection = true)

const CharacteristicsSelection = ({name, title, handleChange, secondaryHandleChange, handleBack = null, handleNext = null, items, preselectedItems, multiselection = false, showNavigation = false, backDisabled = false, defaultIconName = null, isActive, currentStep, goToStep}) => {

  if(isActive === false) return null;
  if(!items) return null;

  const handleClick = async (id) => {
    const nbStepsForward = await handleChange({ [name]: id });
    if(secondaryHandleChange) secondaryHandleChange({ [name]: id });
    if(!multiselection && nbStepsForward)
      goToStep(currentStep + nbStepsForward);
  };

  const _handleBack = async () => {
    // Clear current value when return to previous page
    if(handleBack){
      const nbStepsBack = await handleBack({ [name]: undefined }); 
      goToStep(currentStep - nbStepsBack);
    }
  };

  // Only for multiselection 
  const _handleNext = async () => {
    if(handleNext){
      console.log("handleNext", handleNext)
      const nbStepsForward = await handleNext(); 
      console.log("nbStepsForward", nbStepsForward)
      goToStep(currentStep + nbStepsForward);
    }
  };


  return (
    <div className={"flex-normal-height flex-direction-column"}>
      <WizPageTitle message={title} />
      <SelectFromMatrix name={name} defaultIconName={defaultIconName ? defaultIconName : name+"Default"} items={items} preselectedItems={preselectedItems} multiselection={multiselection} handleClick={handleClick} />
      {showNavigation &&
        <WizNavBar isBackDisabled={backDisabled} onClickNext={_handleNext} onClickPrevious={_handleBack} />
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
  handleNext: PropTypes.func,
  items: PropTypes.array.isRequired,
  preselectedItems: PropTypes.oneOfType([PropTypes.array,PropTypes.string,PropTypes.number]), // can be null: nothing is pre-selected
  multiselection: PropTypes.bool,
  showNavigation: PropTypes.bool,
  backDisabled: PropTypes.bool,
  defaultIconName: PropTypes.string,
  // Props for StepWizard, can be null when call NOT from StepWizard:
  hashKey: PropTypes.string,
  // Props injected by StepWizard, can be null when call NOT from StepWizard:
  isActive: PropTypes.bool,
  currentStep: PropTypes.number,
  goToStep: PropTypes.func,
}

export default CharacteristicsSelection;
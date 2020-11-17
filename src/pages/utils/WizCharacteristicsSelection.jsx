// React
import React from "react";
import PropTypes from "prop-types";
// HOC
import { makeStyles } from '@material-ui/core/styles';
// Components
import { WizNavBar, WizPageTitle } from "pages/utils/WizUtilComponents";
import SelectFromMatrix from "pages/utils/SelectFromMatrix";



//
// (!) handleBack & handleNext & handleChange are async (!)
//

// (!) Multi selection caution (!)
// Returns only the item clicked
// It's the responsibility of the parent to aggregate the multiple selected
// and return them as an array in preselectedItems (with multiselection = true)




const useStyles = makeStyles(theme => ({
  title: {
    padding: (density) => `${theme.spacing(density)}px 0px`,
  },
}));


const WizCharacteristicsSelection = ({
  // From caller:
  density,
  name,
  title,
  handleChange,
  items,
  preselectedItems,
  showNavigation = false,
  backDisabled = false,
  secondaryHandleChange,
  handleBack = null,
  handleNext = null,
  multiselection = false,
  defaultIconName = null,
  // From caller, for StepWizard:
  hashKey,
  // Injected by StepWizard:
  isActive,
  currentStep,
  goToStep
}) => {

  const classes = useStyles(density);

  if (isActive === false) return null;
  if (!items) return null;

  const _handleClick = async id => {
    const nbStepsForward = await handleChange({ [name]: id });
    if (secondaryHandleChange) secondaryHandleChange({ [name]: id });
    if (!multiselection && nbStepsForward)
      goToStep(currentStep + nbStepsForward);
  };

  const _handleBack = async () => {
    // Clear current value when return to previous page
    if (handleBack) {
      const nbStepsBack = await handleBack({ [name]: undefined });
      goToStep(currentStep - nbStepsBack);
    }
  };

  // Only for multiselection
  const _handleNext = async () => {
    if (handleNext) {
      console.debug("handleNext", handleNext);
      const nbStepsForward = await handleNext();
      console.debug("nbStepsForward", nbStepsForward);
      goToStep(currentStep + nbStepsForward);
    }
  };

  return (
    <div className={"flex-normal-height flex-direction-column"}>
      <WizPageTitle message={title} classes={classes.title}/>
      <SelectFromMatrix
        name={name}
        defaultIconName={defaultIconName ? defaultIconName : name + "Default"}
        items={items}
        preselectedItems={preselectedItems}
        multiselection={multiselection}
        handleClick={_handleClick}
      />
      {showNavigation && (
        <WizNavBar
          isBackDisabled={backDisabled}
          onClickNext={handleNext ? _handleNext : null}
          onClickPrevious={_handleBack}
        />
      )}
    </div>
  );
};

WizCharacteristicsSelection.propTypes = {
  // Props from caller:
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  handleBack: PropTypes.func,
  handleNext: PropTypes.func,
  items: PropTypes.array.isRequired,
  preselectedItems: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number
  ]), // can be null: nothing is pre-selected
  multiselection: PropTypes.bool,
  showNavigation: PropTypes.bool,
  backDisabled: PropTypes.bool,
  defaultIconName: PropTypes.string,
  // Props for StepWizard, can be null when call NOT from StepWizard:
  hashKey: PropTypes.string,
  // Props injected by StepWizard, can be null when call NOT from StepWizard:
  isActive: PropTypes.bool,
  currentStep: PropTypes.number,
  goToStep: PropTypes.func
};

export default WizCharacteristicsSelection;

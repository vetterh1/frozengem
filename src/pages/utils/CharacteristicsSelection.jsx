import React from "react";
import PropTypes from "prop-types";
import { WizPageTitle } from "./WizUtilComponents";
import SelectFromMatrix from "./SelectFromMatrix";

//
// (!) handleBack & handleNext & parentUpdateValue are async (!)
//

// (!) Multi selection caution (!)
// Returns only the item clicked
// It's the responsibility of the parent to aggregate the multiple selected
// and return them as an array in preselectedItems (with multiselection = true)

const CharacteristicsSelection = ({
  name,
  title,
  parentUpdateValue,
  items,
  initialValue,
  multiselection = false,
  defaultIconName = null,
}) => {
  if (!items) return null;

  const _handleClick = id => {
    parentUpdateValue({ [name]: id });
  };


  return (
    <div className={"flex-normal-height flex-direction-column"}>
      <WizPageTitle message={title} />
      <SelectFromMatrix
        name={name}
        defaultIconName={defaultIconName ? defaultIconName : name + "Default"}
        items={items}
        preselectedItems={initialValue}
        multiselection={multiselection}
        handleClick={_handleClick}
      />
    </div>
  );
};

CharacteristicsSelection.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  parentUpdateValue: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  initialValue: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number
  ]), // can be null: nothing is pre-selected
  multiselection: PropTypes.bool,
  defaultIconName: PropTypes.string,
};

export default CharacteristicsSelection;

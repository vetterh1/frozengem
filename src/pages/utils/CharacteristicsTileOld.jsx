import React from "react";
import CharacteristicsSelection from "./CharacteristicsSelection";
import DateSelection from "./DateSelection";
import TextSelection from "./TextSelection";
import { gtmPush } from "../../utils/gtmPush";

const CharacteristicsTile = ({
  characteristicName,
  isText = false,
  isDate = false,
  dialogTitle,
  dialogHelp,
  dialogItems,
  dialogDefaultIconName = null,
  dialogPreselectedItems,
  multiselection = false,
  children
}) => {
  console.debug("CharacteristicsTile : characteristicName, isText, isDate = ", characteristicName, isText, isDate);

  const [isCharacteristicsSelection] = React.useState(!isText && !isDate);
  const [isTextSelection] = React.useState(isText);
  const [isDateSelection] = React.useState(isDate);
  const [open, setOpen] = React.useState(false);


  function _handleClickOpenSelection(e) {
    e.stopPropagation();

    console.debug("CharacteristicsTile._handleClickOpenSelection ");

    gtmPush({
      event: "Details",
      action: "UpdateOpen",
      value: characteristicName
    });

    setOpen(true);
  }


  return (
    <div         
    id={"tile_" + characteristicName}
    onClick={_handleClickOpenSelection}
    >
      {children}
      {open && isCharacteristicsSelection && 
        <CharacteristicsSelection
          id={"details_update_" + characteristicName}
          name={characteristicName}
          title={dialogTitle}
          handleChange={null} // filled by parent (when cloning this component)
          items={dialogItems}
          initialValue={dialogPreselectedItems}
          open={isCharacteristicsSelection}
          multiselection={multiselection}
          defaultIconName={dialogDefaultIconName}
        /> }
      {open && isTextSelection && 
        <TextSelection
          id={"details_update_" + characteristicName}
          name={characteristicName}
          title={dialogTitle}
          help={dialogHelp}
          initialValue={dialogPreselectedItems}
          open={isTextSelection}
      /> }
      {open && isDateSelection && 
        <DateSelection
          id={"details_update_" + characteristicName}
          name={characteristicName}
          title={dialogTitle}
          help={dialogHelp}
          parentUpdateValue={() => {}} // filled by parent (when cloning this component)
          initialValue={dialogPreselectedItems}
          open={isDateSelection}
        />}
    </div>
  );
};

export default CharacteristicsTile;

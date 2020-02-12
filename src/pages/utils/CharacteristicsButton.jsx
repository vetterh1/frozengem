import React from "react";
import CharacteristicsSelection from "./CharacteristicsSelection";
import DateSelection from "./DateSelection";
import TextSelection from "./TextSelection";
import ButtonToModal from "./ButtonToModal";

const CharacteristicsButton = ({
  characteristicName,
  isText = false,
  isDate = false,
  btnLabelId,
  dialogTitle,
  dialogHelp,
  dialogItems,
  dialogDefaultIconName = null,
  dialogPreselectedItems,
  multiselection = false,
  onOk
}) => {
  // console.debug("CharacteristicsButton : characteristicName, isText, isDate = ", characteristicName, isText, isDate);
  return (
    <ButtonToModal btnLabelId={btnLabelId} onOk={onOk}>
      {!isText && !isDate ? (
        <CharacteristicsSelection
          id={"details_update_" + characteristicName}
          name={characteristicName}
          title={dialogTitle}
          handleChange={null} // filled by parent (when cloning this component)
          items={dialogItems}
          initialValue={dialogPreselectedItems}
          multiselection={multiselection}
          defaultIconName={dialogDefaultIconName}
        />
      ) : isText && !isDate ? (
        <TextSelection
          id={"details_update_" + characteristicName}
          name={characteristicName}
          title={dialogTitle}
          help={dialogHelp}
          initialValue={dialogPreselectedItems}
        />
      ) : (
        <DateSelection
          id={"details_update_" + characteristicName}
          name={characteristicName}
          title={dialogTitle}
          help={dialogHelp}
          parentUpdateValue={() => {}} // filled by parent (when cloning this component)
          initialValue={dialogPreselectedItems}
        />
      )}
    </ButtonToModal>
  );
};

export default CharacteristicsButton;

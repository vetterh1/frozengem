import React from "react";
import CharacteristicsSelection from "./CharacteristicsSelection";

import ButtonToModal from "./ButtonToModal";
import { getIconComponent } from "../../data/Icons";

const CategoryButton = ({
  categoryText,
  dialogTitle,
  dialogItems,
  dialogPreselectedItems,
  onOk,
  className
}) => {
  // console.debug("CategoryButton : characteristicName, isText, isDate = ", characteristicName, isText, isDate);
  const IconCategory =  getIconComponent(dialogPreselectedItems ? "category" + dialogPreselectedItems : "help");

  return (
    <ButtonToModal
      btnLabelId=""
      btnLabelText={categoryText}
      onOk={onOk}
      alternateBtnIcon={
        <div className={"small-margin-right"}><IconCategory fontSize="default" /></div>
      }
      className={className}
    >
      <CharacteristicsSelection
        id="details_update_category"
        name="category"
        title={dialogTitle}
        handleChange={null} // filled by parent (when cloning this component)
        items={dialogItems}
        initialValue={dialogPreselectedItems}
      />
    </ButtonToModal>
  );
};

export default CategoryButton;

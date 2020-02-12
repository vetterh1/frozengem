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
  const IconCategory = getIconComponent("category" + dialogPreselectedItems);

  return (
    <ButtonToModal
      btnLabelId={categoryText}
      onOk={onOk}
      alternateBtnIcon={
        <IconCategory style={{ fontSize: "24px", display: "flex" }} />
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

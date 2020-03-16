import React from "react";
import DialogMinimal from "./DialogMinimal";
import ButtonToModal from "./ButtonToModal";

const DuplicateButton = ({
  onOk,
  btnClassName = null,
  propsBtn = null
}) => {
  return (
    <ButtonToModal
      btnLabelId={"button.duplicate"}
      onOk={onOk}
      btnClassName={btnClassName}
      propsBtn={propsBtn}
    >
      <DialogMinimal
        id="details_duplicate_item"
        // idTitle="item.duplicate.from_freezer"
        // idSubtitle="item.duplicate.confirmation.title"
        idTitle="item.duplicate.confirmation.title"
        idBody="item.duplicate.confirmation.text"
        idOk="item.duplicate.confirmation.ok"
      />
    </ButtonToModal>
  );
};

export default DuplicateButton;

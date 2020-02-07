import React from "react";
import DialogMinimal from "./DialogMinimal";
import ButtonToModal from "./ButtonToModal";
import { IconRemove } from "../../data/Icons";

const RemoveButton = ({ onOk }) => {
  return (
    <ButtonToModal
      btnLabelId="action.remove"
      onOk={onOk}
      alternateBtnIcon={
        <IconRemove style={{ fontSize: "15px", display: "flex" }} />
      }
    >
      <DialogMinimal
        id="details_remove_item"
        idTitle="item.remove.from_freezer"
        idSubtitle="item.remove.confirmation.title"
        idBody="item.remove.confirmation.text"
      />
    </ButtonToModal>
  );
};

export default RemoveButton;

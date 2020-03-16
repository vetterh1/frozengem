import React from "react";
import DialogMinimal from "./DialogMinimal";
import ButtonToModal from "./ButtonToModal";
import { IconRemove } from "../../data/Icons";

const RemoveButton = ({
  onOk,
  showLabel = true,
  isFAB = false,
  btnClassName = null,
  propsBtn = null
}) => {
  return (
    <ButtonToModal
      btnLabelId={showLabel ? "action.remove" : null}
      isFAB={isFAB}
      onOk={onOk}
      btnIcon={null}
      // alternateBtnIcon={
      //   <IconRemove
      //     style={
      //       isFAB
      //         ? { fontSize: "22px", display: "flex", marginLeft: "2px" }
      //         : { fontSize: "15px", display: "flex" }
      //     }
      //   />
      // }
      btnClassName={btnClassName}
      propsBtn={propsBtn}
    >
      <DialogMinimal
        id="details_remove_item"
        // idTitle="item.remove.from_freezer"
        // idSubtitle="item.remove.confirmation.title"
        idTitle="item.remove.confirmation.title"
        idBody="item.remove.confirmation.text"
        idOk="item.remove.confirmation.ok"
      />
    </ButtonToModal>
  );
};

export default RemoveButton;

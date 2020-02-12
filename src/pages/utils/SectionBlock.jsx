import React from "react";
import { Typography } from "@material-ui/core";
import CharacteristicsButton from "./CharacteristicsButton";

const SectionBlock = ({
  characteristicName,
  isText = false,
  isDate = false,
  main,
  mainTypography = null,
  secondary,
  dialogTitle,
  dialogHelp,
  dialogItems,
  dialogPreselectedItems,
  multiselection = false,
  onOk,
  additionalButton = null
}) => {
  const classUncomplete = main ? null : "stitched";
  return (
    <div
      className={`flex-direction-column  flex-align-center flex-basis-50 ${classUncomplete}`}
    >
      <Typography variant={mainTypography || "h6"}>{main || "-"}</Typography>
      {secondary && <Typography variant="body2">{secondary}</Typography>}
      <div className={"flex-direction-row"}>
        <CharacteristicsButton
          characteristicName={characteristicName}
          isText={isText}
          isDate={isDate}
          dialogTitle={dialogTitle}
          dialogHelp={dialogHelp}
          dialogItems={dialogItems}
          dialogPreselectedItems={dialogPreselectedItems}
          multiselection={multiselection}
          onOk={onOk}
        />
        {additionalButton && (
          <div className={"small-margin-left"}>{additionalButton}</div>
        )}
      </div>
    </div>
  );
};

export default SectionBlock;

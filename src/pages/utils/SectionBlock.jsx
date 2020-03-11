import React from "react";
import { Typography } from "@material-ui/core";
import CharacteristicsTile from "./CharacteristicsTile";
import CharacteristicsButton from "./CharacteristicsButton";
import config from '../../data/config'

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
      className={`flex-direction-column  flex-align-center text-center flex-basis-48 small-padding-top small-padding-bottom ${classUncomplete}`}
    >

    {!config.details_use_clickable_tiles && (<>
      <Typography variant={mainTypography || "h5"}>{main || "-"}</Typography>
      {secondary && <Typography variant="body2">{secondary}</Typography>}
      <div className={"flex-direction-row small-margin-top"}>
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
        </div></>)}

    {config.details_use_clickable_tiles && (
      <CharacteristicsTile
        characteristicName={characteristicName}
        isText={isText}
        isDate={isDate}
        dialogTitle={dialogTitle}
        dialogHelp={dialogHelp}
        dialogItems={dialogItems}
        dialogPreselectedItems={dialogPreselectedItems}
        multiselection={multiselection}
        onOk={onOk}
      ><>
        <Typography variant={mainTypography || "h6"}>{main || "-"}</Typography>
        {secondary && <Typography variant="body2">{secondary}</Typography>}
      </></CharacteristicsTile>)}
    </div>
  );
};

export default SectionBlock;

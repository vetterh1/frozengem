import React from "react";
import PropTypes from "prop-types";
import { WizPageTitle } from "./WizUtilComponents";
import SelectFromMatrix from "./SelectFromMatrix";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";

const CharacteristicsSelection = ({
  name,
  title,
  items,
  initialValue,
  open,
  handleOk,
  handleClose,
  multiselection = false,
  defaultIconName = null
}) => {
  const [multiselectionSelectedItems, setMultiselectionSelectedItems] = React.useState(initialValue);

 
  console.debug("CharacteristicsSelection.init: name, value, initialValue = ", name, multiselectionSelectedItems, initialValue)

  const _handleClick = async id => {
    if(!multiselection)
      await handleOk({ [name]: id });
    else {
      const alreadyExists = multiselectionSelectedItems.find(valueInList => valueInList === id);
      // Add the new value to the list if it does not exist yet
      // If it already exists: remove it (toggle action)
      let newSelectedItems;
      if(alreadyExists){
        newSelectedItems = multiselectionSelectedItems.filter(valueInList => valueInList !== id);
      } else {
          newSelectedItems = [...multiselectionSelectedItems, id];
      }
      setMultiselectionSelectedItems(newSelectedItems);
      console.debug("CharacteristicsSelection._handleClick - multiselection: name, id, newSelectedItems = ", name, id, newSelectedItems)
    }
  };

  const _handleOk = async () => {
    // console.debug("CharacteristicsSelection._handleOk: name, id, value = ", name, value)
    await handleOk({ [name]: multiselectionSelectedItems });
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <div className={"flex-normal-height flex-direction-column"}>
          <WizPageTitle message={title} />
          <FormControl
            className={
              "flex-normal-height flex-direction-column margin-top margin-down"
            }
          >
            <SelectFromMatrix
              name={name}
              defaultIconName={
                defaultIconName ? defaultIconName : name + "Default"
              }
              items={items}
              preselectedItems={multiselection ? multiselectionSelectedItems : initialValue}
              multiselection={multiselection}
              handleClick={_handleClick}
            />
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <FormattedMessage id="button.cancel" />
        </Button>
        {multiselection && (
          <Button onClick={_handleOk} color="primary">
            <FormattedMessage id="button.ok" />
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

CharacteristicsSelection.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  // initialValue is a string if NOT multi selection
  // initialValue is an array if multi selection 
  // initialValue: if nothing is pre-selected AND NOT multi selection: null
  // initialValue: if nothing is pre-selected AND multi selection: []
  initialValue: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number
  ]),
  multiselection: PropTypes.bool,
  defaultIconName: PropTypes.string,
  open: PropTypes.bool,
  handleOk: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

export default CharacteristicsSelection;

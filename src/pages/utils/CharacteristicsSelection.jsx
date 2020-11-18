// React
import React from "react";
import PropTypes from "prop-types";
// HOC
import { makeStyles } from '@material-ui/core/styles';
import { FormattedMessage } from "react-intl";
// MUI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import { WizPageTitle } from "pages/utils/WizUtilComponents";
// Components
import SelectFromMatrix from "pages/utils/SelectFromMatrix";



const useStyles = makeStyles(theme => ({
  formControl: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing(2),
  },
}));


const CharacteristicsSelection = ({
  id,
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
  const [
    multiselectionSelectedItems,
    setMultiselectionSelectedItems
  ] = React.useState(initialValue);

  const classes = useStyles();

  console.debug(
    "CharacteristicsSelection.init: name, value, initialValue = ",
    name,
    multiselectionSelectedItems,
    initialValue
  );

  const _handleClick = async id => {
    if (!multiselection) await handleOk({ [name]: id });
    else {
      const alreadyExists = multiselectionSelectedItems.find(
        valueInList => valueInList === id
      );

      // Add the new value to the list if it does not exist yet
      // If it already exists: remove it (toggle action)
      let newSelectedItems;
      if (alreadyExists) {
        newSelectedItems = multiselectionSelectedItems.filter(
          valueInList => valueInList !== id
        );
      } else {
        newSelectedItems = [...multiselectionSelectedItems, id];
      }

      // If array is empty, replace by null so qs (stringify during the save process updateItemToServer)
      // does generate something like "arrayName=" instead of nothing
      if (newSelectedItems.length === 0) newSelectedItems = null;

      setMultiselectionSelectedItems(newSelectedItems);
      console.debug(
        "CharacteristicsSelection._handleClick - multiselection: name, id, newSelectedItems = ",
        name,
        id,
        newSelectedItems
      );
    }
  };

  const _handleOk = async () => {
    // console.debug("CharacteristicsSelection._handleOk: name, id, value = ", name, value)
    await handleOk({ [name]: multiselectionSelectedItems });
  };

  return (
    <Dialog
      id={"dlg_" + id}
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <div className={"flex-normal-height flex-direction-column"}>
          <WizPageTitle message={title} />
          <FormControl className={classes.formControl}>
            <SelectFromMatrix
              name={name}
              defaultIconName={
                defaultIconName ? defaultIconName : name + "Default"
              }
              items={items}
              preselectedItems={
                multiselection ? multiselectionSelectedItems : initialValue
              }
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
  // Props from Redux:
  density: PropTypes.oneOf([1, 2, 3]),
  id: PropTypes.string.isRequired, // used for analytics (GTM/GA)
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
  handleOk: PropTypes.func,
  handleClose: PropTypes.func
};

export default CharacteristicsSelection;

import React from "react";
import PropTypes from "prop-types";
import { WizPageTitle } from "./WizUtilComponents";
import SelectFromMatrix from "./SelectFromMatrix";
import FormControl from "@material-ui/core/FormControl";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { FormattedMessage } from "react-intl";
import Button from '@material-ui/core/Button';


const CharacteristicsSelection = ({
  name,
  title,
  items,
  initialValue,
  open,
  handleOk,
  handleClose,
  multiselection = false,
  defaultIconName = null,
}) => {
  const [value, setValue] = React.useState(initialValue);

  if (!items) return null;

  const _handleClick = id => {
    setValue(id);
    if(!multiselection)
      _handleOk();
  };


  const _handleOk = async () => {
    await handleOk({ [name]: value });
  };

  return (
    <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
              defaultIconName={defaultIconName ? defaultIconName : name + "Default"}
              items={items}
              preselectedItems={initialValue}
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
        <Button onClick={_handleOk} color="primary">
          <FormattedMessage id="button.ok" />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CharacteristicsSelection.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  initialValue: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number
  ]), // can be null: nothing is pre-selected
  multiselection: PropTypes.bool,
  defaultIconName: PropTypes.string,
  open: PropTypes.bool,
  handleOk: PropTypes.func.isRequired, 
  handleClose: PropTypes.func.isRequired
};

export default CharacteristicsSelection;

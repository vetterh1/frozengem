/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import PropTypes from "prop-types";
import { WizPageTitle } from "./WizUtilComponents";
import FormControl from "@material-ui/core/FormControl";
//import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { FormattedMessage } from "react-intl";
import Button from '@material-ui/core/Button';



const TextSelection = ({
  name,
  title,
  // help,
  initialValue,
  open,
  handleOk,
  handleClose
}) => {
  const [value, setValue] = React.useState(initialValue);

  const _handleSimpleChange = async (newValue, event) => {
    setValue(newValue);
  };

  const _handleEventChange = async event => {
    await _handleSimpleChange(event.target.value, event);
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
            <Input
              id={name}
              value={value}
              onChange={_handleEventChange}
              aria-describedby="name-text"
              fullWidth
              autoFocus
            />
            {/* <FormHelperText id="name-text">
              {validationMessage ? validationMessage : help ? help : ""}
            </FormHelperText> */}
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

TextSelection.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // help: PropTypes.string,
  initialValue: PropTypes.string,
  open: PropTypes.bool,
  handleOk: PropTypes.func.isRequired, 
  handleClose: PropTypes.func.isRequired, 
};

export default TextSelection;

/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import PropTypes from "prop-types";
import { WizPageTitle } from "./WizUtilComponents";
import FormControl from "@material-ui/core/FormControl";
import { DatePicker } from "@material-ui/pickers";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { FormattedMessage } from "react-intl";
import Button from '@material-ui/core/Button';


const DateSelection = ({
  name,
  title,
  initialValue,
  open,
  handleOk,
  handleClose
}) => {
  const [value, setValue] = React.useState(initialValue);

  const _handleSimpleChange = async (newValue, event) => {
    setValue(newValue);
  };

  const _handleDateChange = async dateAsObject => {
    await _handleSimpleChange(dateAsObject.getTime());
  };

  const _handleOk = async () => {
    await handleOk({ [name]: value });
  };

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6, 1);

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
            <DatePicker
              views={["year", "month"]}
              value={value}
              onChange={_handleDateChange}
              // label={help}
              minDate={sixMonthsAgo}
              autoOk
              clearable
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

DateSelection.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // help: PropTypes.string,
  initialValue: PropTypes.number,
  open: PropTypes.bool,
  handleOk: PropTypes.func.isRequired, 
  handleClose: PropTypes.func.isRequired, 
};

export default DateSelection;

/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import PropTypes from "prop-types";
import { WizPageTitle } from "pages/utils/WizUtilComponents";
import FormControl from "@material-ui/core/FormControl";
import { DatePicker } from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";


const DialogContentWithoutPadding = withStyles(() => ({
  root: {
    paddingLeft: "0px",
    paddingRight: "0px",
  },
}))(DialogContent);

const DateSelection = ({
  id,
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

  
  const _handleMonthThenOk = async dateAsObject => {
    await handleOk({ [name]: dateAsObject.getTime() });
  };

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6, 1);

  return (
    <Dialog
      id={"dlg_" + id}
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContentWithoutPadding>
        <div className={"flex-normal-height flex-direction-column"}>
          <WizPageTitle message={title} classes="margin-left" />
          <FormControl
            className={
              "flex-normal-height flex-direction-column big-margin-top margin-down"
            }
          >
            <DatePicker
              views={["year", "month"]}
              value={value}
              onChange={_handleDateChange}
              onMonthChange={_handleMonthThenOk}
              // renderInput={props => <TextField {...props} />}
              // label={help}
              minDate={sixMonthsAgo}
              variant="static"
              // autoOk
            />
          </FormControl>
        </div>
      </DialogContentWithoutPadding>
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
  id: PropTypes.string.isRequired,  // used for analytics (GTM/GA)
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // help: PropTypes.string,
  initialValue: PropTypes.number,
  open: PropTypes.bool,
  handleOk: PropTypes.func,
  handleClose: PropTypes.func
};

export default DateSelection;

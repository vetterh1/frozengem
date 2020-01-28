/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";
import PropTypes from "prop-types";
import { WizPageTitle } from "./WizUtilComponents";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import { DatePicker } from "@material-ui/pickers";

//
// (!) Way of working (!)
//
// - Simple way (NO validity check)
//       --> the entered text is sent to the parent only when the user clicks on Next (as a parameter of handleNext)
//       --> help parameters shows an optional message under the text input
// - Need validation
//       --> same a simple way
//       -->  + the text is sent at every change to a parentUpdateValue parent method.
//            (the help text is replaced by the result of this function, see below)
//
//            (!) parentUpdateValue should return null if all is OK, or an error message if not
//
// (!) handleBack & handleNext & parentUpdateValue are async (!)
//

const DateSelection = ({
  name,
  title,
  help,
  initialValue,
  parentUpdateValue,
  children
}) => {
  const [value, setValue] = React.useState(initialValue);
  const [validationMessage, setvalidationMessage] = React.useState(
    // parentUpdateValue ? parentUpdateValue(initialValue) : help ? help : ""
  );

  console.debug("DateSelection init: name, initialValue = ", name, initialValue);

  const _handleSimpleChange = async (newValue, event) => {
    console.debug("DateSelection._handleSimpleChange start: old, new, event, children = : ", value, newValue, event, children);
    setValue(newValue);
    if (parentUpdateValue) {
      await parentUpdateValue({ [name]: newValue });
      setvalidationMessage();
    }
    console.debug("DateSelection._handleSimpleChange end: old, new, event = : ", value, newValue, event);
  };

  const _handleDateChange = async dateAsObject => {
    await _handleSimpleChange(dateAsObject.getTime());
  };

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6, 1);

  return (
    <div className={"flex-normal-height flex-direction-column"}>
      <WizPageTitle message={title} />
        <div
          className={
            "flex-normal-height flex-direction-column margin-top margin-down"
          }
        >
          <DatePicker
            views={["year", "month"]}
            value={value}
            onChange={_handleDateChange}
            label={help}
            minDate={sixMonthsAgo}
            autoOk
            clearable
          />
        </div>
    </div>
  );
};

DateSelection.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  help: PropTypes.string,
  initialValue: PropTypes.number,
  parentUpdateValue: PropTypes.func.isRequired, // return null if valid, or otherwise, an error string to display
};

export default DateSelection;

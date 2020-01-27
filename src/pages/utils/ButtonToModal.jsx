import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from "react-intl";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Edit from "@material-ui/icons/Edit";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


const styles = theme => ({
  button: {
    alignSelf: 'center',
    padding: '2px 6px 0px 6px',
    textTransform: 'none !important',
    minWidth: '0px',
    opacity: '0.6',
    lineHeight: 'unset'
  },  
  leftIcon: {
    marginRight: theme.spacing(0.5),
  },
  buttonIconOnly: {
    padding: 0,
  },  
});



const ButtonToModal = ({btnLabelId = "action.edit", alternateBtnIcon, onOk, onCancel, showOkBtn = false, classes, children}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();

  if(!children) return null;

  console.debug("ButtonToModal init : value = ", value);


  function _handleClickOpen(e) {
    e.stopPropagation();
    setOpen(true);
  }

  // Return the value to parent & close the modal
  // (!) The child MUST update the value by another call (ex: _handleUpdateValue)
  function _handleOk() {
    console.debug("ButtonToModal._handleOk: value = ", value);
    setOpen(false);
    if(onOk) onOk(value);
  }

  function _handleUpdateValue(newValue) {
    setValue(newValue);
    console.debug("ButtonToModal._handleUpdateValue: old, new = ", value, newValue);
    return null; // all is ok!
  }


  function _handleClose() {
    setOpen(false);
    if(onCancel) onCancel();
  }


  const btnIcon= alternateBtnIcon ? 
    alternateBtnIcon
    :
    <Edit style={{ fontSize: "14px" }} />;
  
  return (
    <React.Fragment>

      <Button component="span" size="small" color="primary" style={{ backgroundColor: "rgba(0, 0, 0, 0.075)" }} className={classes.button} onClick={_handleClickOpen}>
        <div className={classes.leftIcon}>{btnIcon}</div>
        <FormattedMessage style={{ fontSize: "11px", fontWeight: "bold" }} id={btnLabelId} />
      </Button>

      <Dialog fullWidth open={open} onClose={_handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          {/* {React.cloneElement(children)} */}
          {React.cloneElement(children, { handleChange: _handleOk, parentUpdateValue: _handleUpdateValue })}
        </DialogContent>
        <DialogActions>
          <Button onClick={_handleClose} color="primary">
            <FormattedMessage id="button.cancel" />
          </Button>
          { onOk && showOkBtn &&
            <Button onClick={_handleOk} color="primary">
              <FormattedMessage id="button.ok" />
            </Button>
          }
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

ButtonToModal.propTypes = {
  btnLabelId: PropTypes.string,
  btnIcon: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  showOkBtn: PropTypes.bool,
  classes: PropTypes.object,
  children: PropTypes.object,
}

export default withStyles(styles)(ButtonToModal);
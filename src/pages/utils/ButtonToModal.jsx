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

  if(!children) return null;
  const multiselection = children.props.multiselection;
  console.debug("ButtonToModal init : name, multiselection = ", children.props.name, multiselection);

  function _handleClickOpen(e) {
    e.stopPropagation();
    setOpen(true);
  }

  // Return the update to parent & close the modal
  // (!) The child MUST call handleOk with a {key=value} update
  function handleOk(update) {
    console.debug("ButtonToModal.handleOk: update = ", update);
    setOpen(false);
    if(onOk) onOk(update);
  }


  function handleClose() {
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

      { open && 
        React.cloneElement(children, { handleOk: handleOk, handleClose: handleClose, open: open })
      }
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
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function ButtonWithValidation({btnLabel, modalTitle, modalText, okLabel, cancelLabel, onOk, onCancel, children}) {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleOk() {
    setOpen(false);
    if(onOk) onOk();
  }

  function handleClose() {
    setOpen(false);
    if(onCancel) onCancel();
  }

  return (
    <React.Fragment>
      <span onClick={handleClickOpen}>
        {children}
        {btnLabel}
      </span>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {modalText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           {cancelLabel}
          </Button>
          <Button onClick={handleOk} color="primary">
            {okLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

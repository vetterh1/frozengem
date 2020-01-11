import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { FormattedMessage } from 'react-intl.macro';
import { FormattedMessage } from "react-intl";

export default function ButtonWithOneInputModal({btnLabel, modalTitle, modalText, inputLabel, onOk, children}) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const handleInputChange = e => {
    const {value} = e.target;
    setInput(value);
  }


  function handleClickOpen() {
    setOpen(true);
  }

  function handleOk() {
    handleClose();
    onOk(input);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <React.Fragment>
      <Button variant="contained" fullWidth color="primary" onClick={handleClickOpen}>
        {children}
        {btnLabel}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {modalText}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name='name'
            label={inputLabel}
            type="text"
            onChange={handleInputChange}
            value={input}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <FormattedMessage id="button.cancel" />
          </Button>
          <Button onClick={handleOk} color="primary">
            <FormattedMessage id="button.ok" />
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormattedMessage } from "react-intl";


const RemoveConfirmationDialog = ({opened, onClose, onRemoveItem}) => {

  console.debug('[--- FC ---] Functional component: RemoveConfirmationDialog');

  return (
    <Dialog
      open={opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <FormattedMessage id="item.remove.confirmation.title"/>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormattedMessage id="item.remove.confirmation.text"/>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          <FormattedMessage id="button.cancel"/>
        </Button>
        <Button onClick={onRemoveItem} color="primary" autoFocus>
          <FormattedMessage id="action.remove"/>
        </Button>
      </DialogActions>
    </Dialog>
  );
}



RemoveConfirmationDialog.propTypes = {
  // Props from caller
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
}


export default RemoveConfirmationDialog;
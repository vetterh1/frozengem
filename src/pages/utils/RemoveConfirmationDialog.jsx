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
      <DialogTitle id="alert-dialog-title"><FormattedMessage id="item.remove.confirmation.title" defaultMessage="Remove this item?" /></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <FormattedMessage id="item.remove.confirmation.text" defaultMessage="This item will not be shown anymore. Use this when you remove an item from your freezer." />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          <FormattedMessage id="item.remove.confirmation.cancel" defaultMessage="Cancel" />
        </Button>
        <Button onClick={onRemoveItem} color="primary" autoFocus>
          <FormattedMessage id="item.remove.confirmation.remove" defaultMessage="Remove" />
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
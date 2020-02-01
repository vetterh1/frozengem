import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FormattedMessage } from "react-intl";
import { Button, Typography } from "@material-ui/core";

const DialogMinimal = ({
  id,
  idTitle,
  idSubtitle,
  idBody,
  open,
  handleOk,
  handleClose
}) => {
  console.debug("DialogMinimal.init: btnLabelId = ", idTitle);


  const _handleOk = async () => {
    await handleOk(null);
  };


  return (
    <Dialog
      id={"dlg_" + id}
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <div className={"flex-normal-height flex-direction-column"}>
          <Typography variant="h2" className={"margin-down"}>
            <FormattedMessage id={idTitle} />
          </Typography>
          <Typography variant="subtitle1" className={"margin-down"}>
            <FormattedMessage id={idSubtitle} />
          </Typography>
          <Typography variant="body1" className={"margin-down"}>
            <FormattedMessage id={idBody} />
          </Typography>
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

DialogMinimal.propTypes = {
  id: PropTypes.string.isRequired,  // used for analytics (GTM/GA)
  idTitle: PropTypes.string.isRequired,
  idSubtitle: PropTypes.string.isRequired,
  idBody: PropTypes.string.isRequired,
  open: PropTypes.bool,
  handleOk: PropTypes.func,
  handleClose: PropTypes.func
};

export default DialogMinimal;

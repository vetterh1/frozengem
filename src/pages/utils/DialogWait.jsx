// React
import React from "react";
import PropTypes from "prop-types";
// MUI
import Dialog from "@material-ui/core/Dialog";
import { Typography } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from '@material-ui/core/CircularProgress';
// Utilities
import { FormattedMessage } from "react-intl";


const DialogWait = ({
  id,
  idTitle,
  idSubtitle = null,
  open,
}) => {
  console.debug("[DialogWait] Init: idTitle = ", idTitle);

  return (
    <Dialog
      id={"dlg_" + id}
      fullWidth
      open={open}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <div className={"flex-normal-height flex-direction-column flex-align-center"}>
          <Typography variant="h2" className={"huge-margin-down"}>
            <FormattedMessage id={idTitle} />
          </Typography>
          {idSubtitle && <Typography variant="body1" className={"huge-margin-down"}>
            <FormattedMessage id={idSubtitle} />
          </Typography>}
          <div style={{height: "150px"}}>
            <CircularProgress 
              size={120}
              thickness={10}
              className={"huge-margin-down"}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

DialogWait.propTypes = {
  id: PropTypes.string.isRequired,  // used for analytics (GTM/GA)
  idTitle: PropTypes.string.isRequired,
  idSubtitle: PropTypes.string,
  open: PropTypes.bool,
};

export default DialogWait;

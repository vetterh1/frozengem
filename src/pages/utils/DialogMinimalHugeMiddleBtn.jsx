import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { FormattedMessage } from "react-intl";
import { Button, Typography } from "@material-ui/core";

const DialogMinimalHugeMiddleBtn = ({
  id,
  idTitle,
  idSubtitle = null,
  idCancel = "button.cancel",
  open,
  handleButtonClick,
  handleClose,
  btnLabelId = null,
  btnLabelText = null,
  btnIcon = null,
  button = null,
}) => {
  console.debug("DialogMinimalHugeMiddleBtn.init: idTitle = ", idTitle);


  const _handleButtonClick = async () => {
    await handleButtonClick(null);
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
          {idSubtitle && <Typography variant="body1" className={"margin-down"}>
            <FormattedMessage id={idSubtitle} />
          </Typography>}

          { button }
          { !button && 
            <Button onClick={_handleButtonClick} color="primary">
              {/* {btnIcon && <div className={iconClassName}>{btnIcon}</div>} */}
              {btnIcon && <div >{btnIcon}</div>}
              {btnLabelId && btnLabelId.length > 0 && (
                <FormattedMessage
                  style={{ fontSize: "11px", fontWeight: "bold" }}
                  id={btnLabelId}
                />
              )}
              {btnLabelText}
            </Button>          
          }
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          <FormattedMessage id={idCancel} />
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogMinimalHugeMiddleBtn.propTypes = {
  id: PropTypes.string.isRequired,  // used for analytics (GTM/GA)
  idTitle: PropTypes.string.isRequired,
  idSubtitle: PropTypes.string,
  open: PropTypes.bool,
  handleOk: PropTypes.func,
  handleClose: PropTypes.func,
  btnLabelId: PropTypes.string,
  btnLabelText: PropTypes.string,
  btnIcon: PropTypes.object,  
};

export default DialogMinimalHugeMiddleBtn;

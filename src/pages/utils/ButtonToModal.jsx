import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
// import Edit from "@material-ui/icons/Edit";
import { gtmPush } from "../../utils/gtmPush";

const styles = theme => ({
  buttonWithText: {
    alignSelf: "center",
    padding: "2px 6px 0px 6px",
    textTransform: "none !important",
    minWidth: "0px",
    opacity: "0.6",
    lineHeight: "unset",
    backgroundColor: "rgba(0, 0, 0, 0.075)"
  },
  buttonWithoutText: {
    alignSelf: "center",
    padding: "2px 6px 0px 6px",
    minWidth: "0px",
    opacity: "0.6",
    lineHeight: "unset"
    // animation: "$pulseAnimation 1.5s ease-in-out 3"
  },

  "@keyframes pulseAnimation": {
    "0%": {
      transform: "scale(1)"
    },
    "55%": {
      opacity: "0.8",
      transform: "scale(1.2)"
    }
  },

  leftIconWithText: {
    marginRight: theme.spacing(0.5)
  },
  leftIconWithoutText: {
    marginRight: 0
  }
});

const ButtonToModal = ({
  btnLabelId = "action.edit",
  btnLabelText = null,
  isFAB = false,
  onOk,
  btnIcon = null,
  btnClassName,
  propsBtn = null,
  classes,
  children
}) => {
  const [open, setOpen] = React.useState(false);

  if (!children) return null;
  // console.debug("ButtonToModal: children = ", children);

  function _handleClickOpen(e) {
    e.stopPropagation();

    gtmPush({
      event: "Details",
      action: "UpdateOpen",
      value: children.props.id
    });

    setOpen(true);
  }

  // Return the update to parent & close the modal
  // (!) The child MUST call handleOk with a {key=value} update
  function handleOk(update) {
    console.debug("ButtonToModal.handleOk: update = ", update);

    gtmPush({
      event: "Details",
      action: "UpdateValidate",
      value: children.props.id,
      change: update
    });

    setOpen(false);
    if (onOk) onOk(update);
  }

  function handleClose() {
    gtmPush({
      event: "Details",
      action: "UpdateCancel",
      value: children.props.id
    });

    setOpen(false);
  }

  // const btnIcon = alternateBtnIcon ? (
  //   alternateBtnIcon
  // ) : (
  //   <Edit style={{ fontSize: "14px" }} />
  // );

  const buttonClassName = 
    btnClassName ? btnClassName : btnLabelId && 
    !isFAB ? classes.buttonWithText : classes.buttonWithoutText;
  const iconClassName =
    btnLabelId && !isFAB
      ? classes.leftIconWithText
      : classes.leftIconWithoutText;

  return (
    <React.Fragment>
      {!isFAB && (
        <Button
          id={"btn_" + children.props.id}
          variant={propsBtn && propsBtn.variant ? propsBtn.variant : null}
          size={propsBtn && propsBtn.size ? propsBtn.size : "small"}
          color={propsBtn && propsBtn.color ? propsBtn.color : "primary"}
          className={buttonClassName}
          onClick={_handleClickOpen}
        >
          {btnIcon && <div className={iconClassName}>{btnIcon}</div>}
          {btnLabelId && btnLabelId.length > 0 && (
            <FormattedMessage
              style={{ fontSize: "11px", fontWeight: "bold" }}
              id={btnLabelId}
            />
          )}
          {btnLabelText}
        </Button>
      )}

      {isFAB && (
        <Fab
          id={"btn_" + children.props.id}
          // component="Fab"
          size="small"
          color="primary"
          className={buttonClassName}
          onClick={_handleClickOpen}
        >
          <div className={iconClassName}>{btnIcon}</div>
        </Fab>
      )}

      {open &&
        React.cloneElement(children, {
          handleOk: handleOk,
          handleClose: handleClose,
          open: open
        })}
    </React.Fragment>
  );
};

ButtonToModal.propTypes = {
  btnLabelId: PropTypes.string,
  btnLabelText: PropTypes.string,
  btnIcon: PropTypes.object,
  btnClassName: PropTypes.string,
  propsBtn: PropTypes.object,
  onOk: PropTypes.func,
  classes: PropTypes.object,
  children: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonToModal);

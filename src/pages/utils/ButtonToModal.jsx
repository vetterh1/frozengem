import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Edit from "@material-ui/icons/Edit";
import { gtmPush } from "../../utils/gtmPush";

const styles = theme => ({
  button: {
    alignSelf: "center",
    padding: "2px 6px 0px 6px",
    textTransform: "none !important",
    minWidth: "0px",
    opacity: "0.6",
    lineHeight: "unset",
    backgroundColor: "rgba(0, 0, 0, 0.075)"
  },
  leftIcon: {
    marginRight: theme.spacing(0.5)
  },
  buttonIconOnly: {
    padding: 0
  }
});

const ButtonToModal = ({
  btnLabelId = "action.edit",
  onOk,
  alternateBtnIcon,
  className,
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

  const btnIcon = alternateBtnIcon ? (
    alternateBtnIcon
  ) : (
    <Edit style={{ fontSize: "14px" }} />
  );

  const buttonClassName = className ? className : classes.button;

  return (
    <React.Fragment>
      <Button
        id={"btn_" + children.props.id}
        // component="button"
        size="small"
        color="primary"
        className={buttonClassName}
        onClick={_handleClickOpen}
      >
        <div className={classes.leftIcon}>{btnIcon}</div>
        {btnLabelId.length >0 && <FormattedMessage
          style={{ fontSize: "11px", fontWeight: "bold" }}
          id={btnLabelId}
        />}
      </Button>

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
  btnIcon: PropTypes.object,
  onOk: PropTypes.func,
  classes: PropTypes.object,
  children: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonToModal);

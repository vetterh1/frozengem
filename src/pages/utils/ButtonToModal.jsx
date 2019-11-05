import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
  button: {
    padding: '0px',
  },  
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  buttonIconOnly: {
    padding: 0,
  },  
});


const ButtonToModal = ({btnLabel, iconOnlyButton, btnIcon, modalTitle, okLabel, cancelLabel, onOk, onCancel, classes, children}) => {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen(e) {
    e.stopPropagation();
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

      { !iconOnlyButton &&
        <Button component="span" size="small" color="primary" className={classes.button} onClick={handleClickOpen}>
          <div className={classes.leftIcon}>{btnIcon}</div>
          <span>{btnLabel}</span>
        </Button>
      }
      { iconOnlyButton &&
        <IconButton component="span"  color="primary" aria-label={btnLabel} className={classes.buttonIconOnly} onClick={handleClickOpen}>
          {btnIcon}
        </IconButton> 
      }     

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        { modalTitle && 
          <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
        }
        <DialogContent>
          {React.cloneElement(children, { secondaryHandleChange: handleOk })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           {cancelLabel}
          </Button>
          { onOk && 
            <Button onClick={handleOk} color="primary">
              {okLabel}
            </Button>
          }
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

ButtonToModal.propTypes = {
  btnLabel: PropTypes.string,
  iconOnlyButton: PropTypes.bool,
  btnIcon: PropTypes.object,
  modalTitle: PropTypes.string,
  okLabel: PropTypes.string,
  cancelLabel: PropTypes.string.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  classes: PropTypes.object,
  children: PropTypes.object,
}

export default withStyles(styles)(ButtonToModal);
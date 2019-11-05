import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";
import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import { withUserInfo } from '../with/withUserInfo';
import { withItemCharacteristics } from '../with/withItemCharacteristics';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { getIcon } from "../data/Icons";
import CloseIcon from '@material-ui/icons/Close';

import PictureSelection from './utils/PictureSelection';
import ButtonToModal from './utils/ButtonToModal'
import CharacteristicsSelection from './utils/CharacteristicsSelection';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';


const messages = defineMessages({ 
  cameraReplace: {
    id: 'camera.replace',
    defaultMessage: 'Retake picture',
  },  
  cameraAdd: {
    id: 'camera.add',
    defaultMessage: 'Add picture',
  },
  remove: {
    id: 'action.remove',
    defaultMessage: 'Remove',
  },
  removeNothing: {
    id: 'item.remove.nothing',
    defaultMessage: 'Nothing',
  },
  removeFromFreezer: {
    id: 'item.remove.from_freezer',
    defaultMessage: 'Remove this item from your freezer',
  },
  cancel: {
    id: 'button.cancel',
    defaultMessage: 'Cancel',
  },
  titleRemove: {
    id: 'item.remove.modal.title',
    defaultMessage: 'How much quantity is left?',
  },  
});





const styles = theme => ({
  actions: {
    display: 'flex',
    flexDirection: 'row',

    padding: 0,
    marginTop: theme.spacing(1),

    justifyContent: 'space-between'
  },
});









const Details = ({opened, item, onClose, onSavePicture, onRemoveItem, onEditItem, classes, intl, userInfo, enqueueSnackbar, closeSnackbar, itemCharacteristics}) => {

  console.debug('[--- FC ---] Functional component: Details');

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));



  
  const handleClickRemove = ({ size }) => {
    console.log("ItemCard.handleClickRemove: ", item.id);
    onRemoveItem(item, size);
    return null;
  };

  const handleSavePicture = (pictureData, thumbnailData) => {
    console.log("ItemCard.handeSavePicture: ", item.id);
    onSavePicture(item, pictureData, thumbnailData);
  };

  
  const handleEditCode = (e) => {
    e.stopPropagation();
    console.log("ItemCard.handleEditCode: ", item.id);
    onEditItem(item, 'name');
    return null;
  };


  const handleEditDetails = (e) => {
    e.stopPropagation();
    console.log("ItemCard.handleEditDetails: ", item.id);
    onEditItem(item, 'details');
    return null;
  };


  const handleEditExpiration = (e) => {
    e.stopPropagation();
    console.log("ItemCard.handleEditExpiration: ", item.id);
    onEditItem(item, 'expirationDate');
    return null;
  };




  const zero = {
    id2: "0", 
    label: {en: intl.formatMessage(messages.removeFromFreezer), fr: intl.formatMessage(messages.removeFromFreezer)}, 
    name: {en: intl.formatMessage(messages.removeNothing), fr: intl.formatMessage(messages.removeNothing)},
  };
  const sizes = [zero, ...itemCharacteristics.sizes];



  return (
    <Dialog
      fullScreen={fullScreen}
      open={opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >

      <div>Name: {item.name}</div>
      <div>Category: {item.__categoryText}</div>
      <div onClick={handleEditCode}>Code: {item.code}</div>
      <div onClick={handleEditDetails}>Details: {item.__detailsNames}</div>
      <div onClick={handleEditExpiration}>Expiration level: {item.__expirationLevel}</div>
      <div>Container: {item.__containerText}</div>
      <div>Color: {item.__colorText}</div>
      <div>Freezer: {item.__freezerText}</div>
      <div>Location: {item.__locationText}</div>
      <div>Size: {item.__sizeInText}</div>
      
      
      {/* {item.__iconExpiration}
      {item.__expirationText}
      {item.__sizeInText}
      {item.__monthExpirationAsText}
      {item.__yearExpiration}
      {item.freezer}
      {item.location}
      {item.container}
      {item.color} */}
      <DialogActions size="small" className={classes.actions}>

        <ButtonToModal 
          iconOnlyButton
          btnLabel={intl.formatMessage(messages.remove)}
          btnIcon={getIcon("remove")} 
          cancelLabel={intl.formatMessage(messages.cancel)}
          onOk={null}
        >
          <CharacteristicsSelection
            name='size'
            title={intl.formatMessage(messages.titleRemove)}
            handleChange={handleClickRemove}
            items={sizes}
            preselectedItems={item.size}
          />
        </ButtonToModal>

        <PictureSelection 
              itemId={item.id}
              iconOnlyButton
              onPicture={handleSavePicture}
              label={intl.formatMessage(item.__imageExists ? messages.cameraReplace : messages.cameraAdd)}
        />

        <Button onClick={onClose} color="primary">
          <FormattedMessage id="button.close" defaultMessage="Close" />
        </Button>
      </DialogActions>
    </Dialog>
  );
}


Details.propTypes = {
  // Props from caller
  opened: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSavePicture: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,

  // Props from other HOC
  userInfo: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  itemCharacteristics: PropTypes.object.isRequired,
}


export default injectIntl(withSnackbar(withUserInfo(withItemCharacteristics(withStyles(styles, { withTheme: true })(Details)))));
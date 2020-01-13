import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { itemsActions } from '../_actions/itemsActions';

import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from '@material-ui/core/styles';

// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';

import { getIcon } from "../data/Icons";
// import CloseIcon from '@material-ui/icons/Close';

import PictureSelection from './utils/PictureSelection';
import ButtonToModal from './utils/ButtonToModal'
import CharacteristicsSelection from './utils/CharacteristicsSelection';



const styles = theme => ({
  actions: {
    display: 'flex',
    flexDirection: 'row',

    padding: 0,
    marginTop: theme.spacing(1),

    justifyContent: 'space-between'
  },
});








// const Details = ({opened, item, onClose, onSavePicture, onRemoveItem, onEditItem, classes, intl, userInfo, enqueueSnackbar, closeSnackbar, itemCharacteristics}) => {
    // const Details = ({item, match, classes, intl, userInfo, enqueueSnackbar, closeSnackbar, itemCharacteristics}) => {

const Details = ({item, sizes, removeItem, savePicture, classes, intl, history}) => {

  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if(!item || !sizes) return null;
  console.debug('[--- FC ---] Functional component: Details id!', item.id);

  
  const handleClose = () => {
    console.log('[<<< Details ------<<<----- / <<<] Reason: close details');
    history.goBack();

    // Strangely, history.push/goBack works here... 
    // if not, should be replaced by a <redirect push> tag in render
    // but it would redisplay / and dispay from the top of the page
    // (better use back that goes back at the right place)
  };

  
  const handleClickRemove = async ({ size }) => {
    removeItem(item.id, size);
  };

  const handleSavePicture = (pictureData, thumbnailData) => {
    savePicture(item.id, pictureData, thumbnailData);
  };

  
  const handleEditCode = (e) => {
    e.stopPropagation();
    console.info("ItemCard.handleEditCode: ", item.id);
    // onEditItem(item, 'name');
    return null;
  };


  const handleEditDetails = (e) => {
    e.stopPropagation();
    console.info("ItemCard.handleEditDetails: ", item.id);
    // onEditItem(item, 'details');
    return null;
  };


  const handleEditExpiration = (e) => {
    e.stopPropagation();
    console.info("ItemCard.handleEditExpiration: ", item.id);
    // onEditItem(item, 'expirationDate');
    return null;
  };




  const zero = {
    id2: "0", 
    label: {en: intl.formatMessage({id: 'item.remove.from_freezer'}), fr: intl.formatMessage({id: 'item.remove.from_freezer'})}, 
    name: {en: intl.formatMessage({id: 'item.remove.nothing'}), fr: intl.formatMessage({id: 'item.remove.nothing'})},
  };
  const sizesWith0 = [zero, ...sizes];



  return (
    <>

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
          btnLabel={intl.formatMessage({id: 'action.remove'})}
          btnIcon={getIcon("remove")} 
          cancelLabel={intl.formatMessage({id: 'button.cancel'})}
          onOk={null}
        >
          <CharacteristicsSelection
            name='size'
            title={intl.formatMessage({id: 'item.remove.modal.title'})}
            handleChange={handleClickRemove}
            items={sizesWith0}
            preselectedItems={item.size}
          />
        </ButtonToModal>

        <PictureSelection 
              itemId={item.id}
              iconOnlyButton
              onPicture={handleSavePicture}
              label={intl.formatMessage({id: item.__imageExists ? 'camera.replace' : 'camera.add'})}
        />

        {/* <Button onClick={onClose} color="primary"> */}
        <Button onClick={handleClose} color="primary">
          <FormattedMessage id="button.close" />
        </Button>
      </DialogActions>
    </>
  );
}


Details.propTypes = {
  // Props from caller
  sizes: PropTypes.array,

  // Props from redux
  item: PropTypes.object,

  // Props from other HOC
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
}



function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  if(!id) throw new Error({ error: "no id!" });
  // console.info('Details.mapStateToProps - ',ownProps, state.items.list.find(item => item.id === id) );

  return {
    item: state.items.list.find(item => item.id === id),
    sizes: state.characteristics.sizes,
  };
}

const mapDispatchToProps = {
  removeItem: itemsActions.removeItem,
  savePicture: itemsActions.savePicture,
};

const connectedDetails = withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));

export default injectIntl(withStyles(styles, { withTheme: true })(connectedDetails));
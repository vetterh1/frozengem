import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import { itemsActions } from '../_actions/itemsActions';
import { Redirect } from 'react-router'

import { injectIntl, FormattedMessage } from "react-intl";
import { withStyles } from '@material-ui/core/styles';

import config from '../data/config'

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  DialogActions,
  Divider,
  Typography,
} from '@material-ui/core';

// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';

import { getIcon } from "../data/Icons";
// import EditIcon from '@material-ui/icons/Edit';
// import CloseIcon from '@material-ui/icons/Close';

import PictureSelection from './utils/PictureSelection';
import ButtonToModal from './utils/ButtonToModal'
import CharacteristicsSelection from './utils/CharacteristicsSelection';



// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';




const styles = theme => ({
  details_main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'top'
  },  
  details_image_section: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
  },
  details_image_media: {
    height: '25vh',
  },

  details_image_close: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '5px',
    color: 'white'
  },
  details_image_code: {
    position: 'absolute',
    right: '10px',
    top: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: '10px',
    color: 'white'
  },
  details_image_camera: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '10px',
    color: 'white'
  },
  
  centerAligned : {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },


  details_code: {
    display: 'flex',
  },
  details_image: {
    display: 'flex',
  },
  details_name_section: {
    display: 'flex',
  },
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

const Details = ({item, sizes, removeItem, savePicture, classes, intl, history, loggedIn}) => {

    
  if (!loggedIn) { 
    console.debug('[>>> Details ------>>>----- / >>>] Reason: not logged in');
    return <Redirect to='/' />
  };

  if (!item) { 
    console.debug('[>>> Details ------>>>----- / >>>] Reason: item not found');
    return <Redirect push to='/' />
  };


  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if(!item || !sizes) return null;
  console.debug('[--- FC ---] Functional component: Details id!', item.id);

  
  const handleClose = () => {
    console.debug('[<<< Details ------<<<----- / <<<] Reason: close details');
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
    console.debug("ItemCard.handleEditCode: ", item.id);
    // onEditItem(item, 'name');
    return null;
  };


  const handleEditDetails = (e) => {
    e.stopPropagation();
    console.debug("ItemCard.handleEditDetails: ", item.id);
    // onEditItem(item, 'details');
    return null;
  };


  const handleEditExpiration = (e) => {
    e.stopPropagation();
    console.debug("ItemCard.handleEditExpiration: ", item.id);
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
    <div className={classes.card}>

      <section className={classes.details_image_section}>
        <CardMedia
          image={`${config.staticUrl}/static/pictures/items/${item.pictureName}`}
          title={item.name}
          className={classes.details_image_media}
        />
        {/* <Typography className={classes.details_image_close} variant="h6" color="textSecondary" component="p" onClick={handleClose}>
        </Typography>   */}
        <Button onClick={handleClose} color="primary" className={classes.details_image_close}>
          &lt; &nbsp; <FormattedMessage id="button.back" />
        </Button>        
        <Typography className={classes.details_image_code} variant="h4" color="textSecondary" component="p">
        {item.code}
        </Typography>        
        <PictureSelection 
              className={classes.details_image_camera} 
              itemId={item.id}
              iconOnlyButton
              onPicture={handleSavePicture}
              label={intl.formatMessage({id: item.__imageExists ? 'camera.replace' : 'camera.add'})}
        />
      </section>

      <Divider />

      <CardHeader
        avatar={
          getIcon("category"+item.category)
        }
        title={item.name}
        subheader={intl.formatMessage(item.__expirationText)}
      />
      <Divider />

      <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        Container: {item.__containerText}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Container: {item.__containerText}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
        Container: {item.__containerText}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        Container: {item.__containerText}
        </Typography>                        
        <div>Name: {item.name}</div>
        <div>Category: {item.__categoryText}</div>
        <div onClick={handleEditDetails}>Details: {item.__detailsNames}</div>
        <div onClick={handleEditExpiration}>Expiration level: {item.__expirationLevel}</div>
        <div>Container: {item.__containerText}</div>
        <div>Color: {item.__colorText}</div>
        <div>Freezer: {item.__freezerText}</div>
        <div>Location: {item.__locationText}</div>
        <div>Size: {item.__sizeInText}</div>            
      </CardContent>

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

      </DialogActions>

    </div>

  );
 
      
      {/*
      
        <div>Name: {item.name}</div>
        <div>Category: {item.__categoryText}</div>
        <div onClick={handleEditDetails}>Details: {item.__detailsNames}</div>
        <div onClick={handleEditExpiration}>Expiration level: {item.__expirationLevel}</div>
        <div>Container: {item.__containerText}</div>
        <div>Color: {item.__colorText}</div>
        <div>Freezer: {item.__freezerText}</div>
        <div>Location: {item.__locationText}</div>
        <div>Size: {item.__sizeInText}</div>      

      {item.__iconExpiration}
      {item.__expirationText}
      {item.__sizeInText}
      {item.__monthExpirationAsText}
      {item.__yearExpiration}
      {item.freezer}
      {item.location}
      {item.container}
      {item.color} */}
      
}


// Details.propTypes = {
//   // Props from caller
//   sizes: PropTypes.array,

//   // Props from redux
//   item: PropTypes.object,

//   // Props from other HOC
//   classes: PropTypes.object.isRequired,
//   intl: PropTypes.object.isRequired,
// }



function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  if(!id) return {item: null}

  return {
    item: state.items.list.find(item => item.id === id),
    sizes: state.characteristics.sizes,
    loggedIn: state.user.loggedIn,
  };
}

const mapDispatchToProps = {
  removeItem: itemsActions.removeItem,
  savePicture: itemsActions.savePicture,
};

const connectedDetails = withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));

export default injectIntl(withStyles(styles, { withTheme: true })(connectedDetails));
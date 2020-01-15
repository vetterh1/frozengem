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


import Person from '@material-ui/icons/Person';
import PersonOutline from '@material-ui/icons/PersonOutline';


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
  actions: {
    display: 'flex',
    flexDirection: 'row',

    padding: 0,
    marginTop: theme.spacing(1),

    justifyContent: 'space-between'
  },
});





const SectionBlock = ({iconName = "edit", main, secondary, editTitle, editItems, editPreselectedItems, editCancelLabel, editHandleChange}) => {
    return (
          // Every block has a content part on the left and an action on the right
          <div className={"flex-direction-row flex-align-start"}>
            {/* The content part of the block is in column to allow 2+ lines of content */}
            <div className={"flex-direction-column"}>
              <Typography variant="h6" className={"small-margin-right"}>
                {main || '-'}
              </Typography>
              <Typography variant="body2">
                {secondary}
              </Typography>
            </div>
            {/* The action part of the block is also on column for future use */}
            <div className={"flex-direction-row margin-left"}>
              <ButtonToModal 
                iconOnlyButton
                btnLabel={editTitle}
                btnIcon={getIcon(iconName)} 
                cancelLabel={editCancelLabel}
                onOk={null}
              >
                <CharacteristicsSelection
                  name='size'
                  title={editTitle}
                  handleChange={editHandleChange}
                  items={editItems}
                  preselectedItems={editPreselectedItems}
                />
              </ButtonToModal>
            </div>
          </div>

  );
}






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


  const sizeInIcons = [];
  for( let i = 0; i < item.size; i++) {
    sizeInIcons.push( <Person style={{ fontSize: 20 }} key={i.toString()} /> );
  }
  if(item.size > 1)
    sizeInIcons.push( <PersonOutline style={{ fontSize: 20 }} key={item.size.toString()} /> );



  const zero = {
    id2: "0", 
    label: {en: intl.formatMessage({id: 'item.remove.from_freezer'}), fr: intl.formatMessage({id: 'item.remove.from_freezer'})}, 
    name: {en: intl.formatMessage({id: 'item.remove.nothing'}), fr: intl.formatMessage({id: 'item.remove.nothing'})},
  };
  const sizesWith0 = [zero, ...sizes];

  const dateToDisplay = `${item.__monthExpirationAsText} ${item.__yearExpiration}`;

  const editTitle = intl.formatMessage({id: 'action.edit'});
  const removeTitle = intl.formatMessage({id: 'action.remove'});
  const cancelLabel = intl.formatMessage({id: 'button.cancel'});

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

      <div className={"medium-padding"}>

        <section className={"flex-direction-column"}>
          <div className={"flex-direction-row small-margin-down"}>
            <Typography variant="h3" component="h1">
              {item.__nameOrCategory}
            </Typography>
          </div>
          <div className={"flex-direction-row flex-align-end"}>
            {getIcon("category"+item.category)}
            <Typography variant="h5" className={"small-margin-left"}>
              {item.__categoryText} &nbsp; ({item.__detailsNames})
            </Typography>
          </div>
        </section>

        <Divider className={"margin-top margin-down"}></Divider>
        
        {/* Section with 2 info blocks (on same row) */}
        <section className={"flex-direction-row flex-justify-around"}>
          <SectionBlock 
            iconName='remove'
            main={sizeInIcons} 
            secondary={item.__sizeInText}
            editTitle={removeTitle}
            editItems={sizesWith0}
            editPreselectedItems={item.size}
            editCancelLabel={cancelLabel}
            editHandleChange={handleClickRemove}
          />
          <SectionBlock 
            main={dateToDisplay} 
            secondary={intl.formatMessage(item.__expirationText)}
            editTitle={editTitle}
            editItems={sizesWith0}
            editPreselectedItems={item.size}
            editCancelLabel={cancelLabel}
            editHandleChange={handleClickRemove}
          />
        </section>

        <Divider className={"margin-top margin-down"}></Divider>


        <section className={"flex-direction-row flex-justify-around"}>
          <SectionBlock 
            main={item.__freezerText} 
            secondary="- Freezer -"
            editTitle={editTitle}
            editItems={sizesWith0}
            editPreselectedItems={item.size}
            editCancelLabel={cancelLabel}
            editHandleChange={handleClickRemove}
          />
          <SectionBlock 
            main={item.__locationText} 
            secondary="- Location -"
            editTitle={editTitle}
            editItems={sizesWith0}
            editPreselectedItems={item.size}
            editCancelLabel={cancelLabel}
            editHandleChange={handleClickRemove}
          />
        </section>


        <Divider className={"margin-top margin-down"}></Divider>

        <section className={"flex-direction-row flex-justify-around"}>
          <SectionBlock 
            main={item.__containerText} 
            secondary="- Container -"
            editTitle={editTitle}
            editItems={sizesWith0}
            editPreselectedItems={item.size}
            editCancelLabel={cancelLabel}
            editHandleChange={handleClickRemove}
          />
          <SectionBlock 
            main={item.__colorText} 
            secondary="- Color -"
            editTitle={editTitle}
            editItems={sizesWith0}
            editPreselectedItems={item.size}
            editCancelLabel={cancelLabel}
            editHandleChange={handleClickRemove}
          />
        </section>


      </div>

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
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { injectIntl, FormattedMessage, defineMessages } from "react-intl";
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import { withUserInfo } from '../with/withUserInfo';
import { withItems } from '../with/withItems';
import ItemsList from './utils/ItemsList'
import Filters from './Filters'
import formatServerErrorMsg from '../utils/formatServerErrorMsg'
import Box from '@material-ui/core/Box'; // ! must be at the end of the material-ui imports !




const messages = defineMessages({ 
  // removeConfirmationTitle: {
  //   id: 'item.remove.confirmation.title',
  //   defaultMessage: 'Remove this item?',
  // },  
  // removeConfirmationText: {
  //   id: 'item.remove.confirmation.text',
  //   defaultMessage: 'This item will not be shown anymore. Use this when you remove an item from your freezer.',
  // },  
  // removeConfirmationCancel: {
  //   id: 'item.remove.confirmation.cancel',
  //   defaultMessage: 'Cancel',
  // },
  // removeConfirmationRemove: {
  //   id: 'item.remove.confirmation.remove',
  //   defaultMessage: 'Remove',
  // },    
  removeError: {
    id: 'item.remove.error',
    defaultMessage: 'Sorry, removing this item failed. Please try again...',
  },  
  removeSuccess: {
    id: 'item.remove.success',
    defaultMessage: 'Item removed!',
  },
  sizeChangeError: {
    id: 'item.sizeChange.error',
    defaultMessage: 'Sorry, changing quantity failed. Please try again...',
  },  
  sizeChangeSuccess: {
    id: 'item.sizeChange.success',
    defaultMessage: 'Quantity updated!',
  },
  cameraError: {
    id: 'camera.error',
    defaultMessage: 'Sorry, saving this picture failed. Please try again...',
  },  
  cameraSuccess: {
    id: 'camera.success',
    defaultMessage: 'Picture saved!',
  },
});



const styles = theme => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: 'auto',
  },
  container: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
});


const Dashboard = ({items, classes, intl, userInfo, enqueueSnackbar, closeSnackbar}) => {

  console.debug('[--- FC ---] Functional component: Dashboard');

  const [arrayItems, setArrayItems] = React.useState(null);

  // First render: get the items from the server
  useEffect(() => {

    const getItems = async () => {
      const result = await items.get(userInfo.accessToken, userInfo.id);
      if(!result) {
        console.error('ItemsList: could not retrieve items' );
      }
      const sortedItems = result.data.sort((a, b) => (a.expirationDate > b.expirationDate) ? 1 : -1)
      setArrayItems(sortedItems);
    };
    getItems();
  }, []);



  const [filteredArrayItems, setFilteredArrayItems] = React.useState([]);
  const [category, setCategory] = React.useState(null);

  const [removeModalOpened, setRemoveModalOpened] = React.useState(false);
  const [itemToRemove, setItemToRemove] = React.useState(null);

  const [detailsModalOpened, setDetailsModalOpened] = React.useState(false);
  const [itemShownInDetails, setItemShownInDetails] = React.useState(null);




  const getRemoved = async () => {
    const result = await items.get(userInfo.accessToken, userInfo.id, true);
    if(!result) {
      console.error('ItemsList: could not retrieve removed items' );
    }
    const removedItems = result.data.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1)
    return removedItems;
  }


  const updateFilterArrayAndCategory = async (_category) => {
    let _filteredArrayItems = [];
    switch(_category) {
      case 'all': {
        _filteredArrayItems = arrayItems;
        break;
      }
      case 'latest': {
        const nowInMs = Date.now();
        const oneWeekInMs = 1 * 7 * 24 * 60 * 60 * 1000;
        // const oneMonthInMs = 1 * 30 * 24 * 60 * 60 * 1000;
        const filter1 = arrayItems.filter(item => item.updatedAt > nowInMs - oneWeekInMs);
        _filteredArrayItems = filter1.sort((a, b) => (a.updatedAt < b.updatedAt) ? 1 : -1)
        break;
      }
      case 'removed': {
        _filteredArrayItems = await getRemoved();
        break;
      }
      default: {
        _filteredArrayItems = arrayItems.filter(item => item.category === _category);
        break;
      }                  
    }
    setCategory(_category);
    setFilteredArrayItems(_filteredArrayItems);
  }


  const onCategoryChange = (category) => {
    updateFilterArrayAndCategory(category);
  }

  
  const updateStateArray = (arrayName, item, remove = false) => {
    let arrayToUpdate = null;
    switch(arrayName) {
      case 'filteredArrayItems': arrayToUpdate = filteredArrayItems; break;
      default: arrayToUpdate = arrayItems; break;
    }
    console.log('arrayToUpdate:', arrayToUpdate);

    // Find the updated item in array:
    let indexItem = arrayToUpdate.findIndex(({id}) => id === item.id);
    let newArray = [];
    if(remove) {
      newArray = [
        ...arrayToUpdate.slice(0, indexItem),
        ...arrayToUpdate.slice(indexItem + 1)
      ];
    } else {
      newArray = [
        ...arrayToUpdate.slice(0, indexItem),
        item,
        ...arrayToUpdate.slice(indexItem + 1)
      ];
    }

    switch(arrayName) {
      case 'filteredArrayItems': setFilteredArrayItems(newArray); break;
      default: setArrayItems(newArray); break;
    }
  }


  const onItemChange = (item) => {
    console.log("Dashboard.onItemChange: ", item.id);

    // Update both the current (filtered list) and the entire list
    updateStateArray('filteredArrayItems', item);
    updateStateArray('arrayItems', item);
  }



  // Set the received value in the state 
  // (replacing any existing one)
  const onSavePicture = async (item, pictureData, thumbnailData) => {
    try {
      const { updatePictureItemToServer } = items;
      const itemUpdated = await updatePictureItemToServer(item.id , pictureData, thumbnailData, userInfo);
      onItemChange(itemUpdated);
      const key = enqueueSnackbar(
        intl.formatMessage(messages.cameraSuccess), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {closeSnackbar(key);}}
      ); 
      // console.log('itemUpdated: ', itemUpdated);
    } catch (error) {
      const key = enqueueSnackbar(
        formatServerErrorMsg(error, intl.formatMessage(messages.cameraError), 'ItemCard.savePicture'), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {closeSnackbar(key);}}
      ); 
    }
  }



  const onRemoveItem = async () => {
    try {
      const { removeItemOnServer } = items;
      await removeItemOnServer(itemToRemove.id , userInfo);
      onItemRemoved(itemToRemove);
      setItemToRemove(null);
      setRemoveModalOpened(false);
        const key = enqueueSnackbar(
        intl.formatMessage(messages.removeSuccess), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {closeSnackbar(key);}}
      ); 
      // console.log('itemUpdated: ', itemUpdated);
    } catch (error) {
      const key = enqueueSnackbar(
        formatServerErrorMsg(error, intl.formatMessage(messages.removeError), 'ItemCard.removeItem'), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {closeSnackbar(key);}}
      ); 
    }
  }


  const onChangeSize = async (item, size) => {
    try {
      const { removeItemOnServer } = items;
      const itemUpdated = await removeItemOnServer(item.id , userInfo, size);
      onItemChange(itemUpdated);
      // onItemRemoved(item);
      const key = enqueueSnackbar(
        intl.formatMessage(messages.sizeChangeSuccess), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {closeSnackbar(key);}}
      ); 
      // console.log('itemUpdated: ', itemUpdated);
    } catch (error) {
      const key = enqueueSnackbar(
        formatServerErrorMsg(error, intl.formatMessage(messages.sizeChangeError), 'ItemCard.ChangeSize'), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {closeSnackbar(key);}}
      ); 
    }
  }




  const onItemRemoved = (item) => {
    // Update both the current (filtered list) and the entire list
    updateStateArray('filteredArrayItems', item, true);
    updateStateArray('arrayItems', item, true);    
    // Back side: remove from server
    // This is done directly in the caller (ItemCard.handleClickRemove)
  }


  const onConfirmRemoveItem = (item, size) => {
    if(size === '0') {
      setItemToRemove(item);
      setRemoveModalOpened(true);
    } else {
      onChangeSize(item, size);
    }
  }

  const handleCloseRemoveModal = () => {
    setItemToRemove(null);
    setRemoveModalOpened(false);
  }





  const onShowDetails = (item) => {
    setItemShownInDetails(item);
    setDetailsModalOpened(true);
  }

  const handleCloseDetailsModal = () => {
    setItemShownInDetails(null);
    setDetailsModalOpened(false);
  }




  if(!arrayItems || arrayItems.length === 0) return (
    <Box mt={4} display="flex" flexDirection="column" >
      <Typography component="h1" variant="h4" color="primary" align="center" gutterBottom>
        <FormattedMessage id="dashboard.empty.title" defaultMessage="You'll found here the content of your freezer." />
      </Typography>
      <Typography variant="h6" align="center" gutterBottom >
        <FormattedMessage id="dashboard.empty.subtitle" defaultMessage="Use the Add button below to start..." />
      </Typography>
    </Box>      
  );

  return (
    <React.Fragment>

      <Dialog
        open={removeModalOpened}
        onClose={handleCloseRemoveModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"><FormattedMessage id="item.remove.confirmation.title" defaultMessage="Remove this item?" /></DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage id="item.remove.confirmation.text" defaultMessage="This item will not be shown anymore. Use this when you remove an item from your freezer." />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRemoveModal} color="primary">
            <FormattedMessage id="item.remove.confirmation.cancel" defaultMessage="Cancel" />
          </Button>
          <Button onClick={onRemoveItem} color="primary" autoFocus>
            <FormattedMessage id="item.remove.confirmation.remove" defaultMessage="Remove" />
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.layout}>
        <Filters language={userInfo.language} category={category} onCategoryChange={onCategoryChange} />
        <Container maxWidth="md" className={classes.container}>
          <ItemsList arrayItems={filteredArrayItems} onSavePicture={onSavePicture} onRemoveItem={onConfirmRemoveItem} onShowDetails={onShowDetails} />
        </Container>
      </div>          

    </React.Fragment>
  );
}



Dashboard.propTypes = {
  // Props from caller
  items: PropTypes.object.isRequired,
  // Props from other HOC
  userInfo: PropTypes.object.isRequired,
  // items: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}


export default injectIntl(withSnackbar(withItems(withUserInfo(withStyles(styles)(Dashboard)))));
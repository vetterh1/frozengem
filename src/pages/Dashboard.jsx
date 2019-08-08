import React from 'react';
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
import { withUserInfo } from '../auth/withUserInfo';
import { withItems } from '../auth/withItems';
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
  cameraError: {
    id: 'camera.error',
    defaultMessage: 'Sorry, saving this picture failed. Please try again...',
  },  
  cameraSuccess: {
    id: 'camera.success',
    defaultMessage: 'Picture saved!',
  },
  cameraReplace: {
    id: 'camera.replace',
    defaultMessage: 'Retake picture',
  },  
  cameraAdd: {
    id: 'camera.add',
    defaultMessage: 'Add picture',
  },
});



const styles = theme => ({
  layout: {
    display: "flex",
    flexDirection: "column",
    width: 'auto',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
});





class Dashboard extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    items: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      arrayItems:[], 
      arrayFilters:[], 
      filteredArrayItems:[],
      category: null,

      removeModalOpened: false,
      itemToRemove: null,
    };

    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onItemRemoved = this.onItemRemoved.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onConfirmRemoveItem = this.onConfirmRemoveItem.bind(this);
    this.handleCloseRemoveModal = this.handleCloseRemoveModal.bind(this);
  }



  getItems = async () => {
    const {items, userInfo} = this.props;

    const result = await items.get(userInfo.accessToken, userInfo.id);
    if(!result) {
      console.error('ItemsList: could not retrieve items' );
    }
    const sortedItems = result.data.sort((a, b) => (a.expirationDate > b.expirationDate) ? 1 : -1)
    this.setState({arrayItems: sortedItems});
  }

  componentDidMount() {
    this.getItems();
  }


  onCategoryChange = (category) => {
    const { arrayItems } = this.state;
    const filteredArrayItems = category === 'all' ? arrayItems : arrayItems.filter(item => item.category === category);
    this.setState({
      category: category, 
      filteredArrayItems: filteredArrayItems
    });
  }

  onItemChange = (item) => {
    const { filteredArrayItems } = this.state;

    // Find the updated item in array:
    let indexItem = filteredArrayItems.findIndex(({id}) => id === item.id);
    const newArray = [
      ...filteredArrayItems.slice(0, indexItem),
      item,
      ...filteredArrayItems.slice(indexItem + 1)
    ];

    this.setState({filteredArrayItems: newArray});
  }



    // Set the received value in the state 
  // (replacing any existing one)
  onSavePicture = async (item, pictureData, thumbnailData) => {
    const {items, userInfo, enqueueSnackbar, closeSnackbar, intl} = this.props;

    try {
      const { updatePictureItemToServer } = items;
      const itemUpdated = await updatePictureItemToServer(item.id , pictureData, thumbnailData, userInfo);
      this.onItemChange(itemUpdated);
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



  onRemoveItem = async () => {
    const {items, userInfo, enqueueSnackbar, closeSnackbar, intl} = this.props;

    const item = this.state.itemToRemove;
    this.setState({itemToRemove: null, removeModalOpened: false})


    try {
      const { removeItemOnServer } = items;
      await removeItemOnServer(item.id , userInfo);
      this.onItemRemoved(item);
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




  onItemRemoved = (item) => {
    const { filteredArrayItems } = this.state;

    // Front side: remove the item from array:
    let indexItem = filteredArrayItems.findIndex(({id}) => id === item.id);
    const newArray = [
      ...filteredArrayItems.slice(0, indexItem),
      ...filteredArrayItems.slice(indexItem + 1)
    ];
    this.setState({filteredArrayItems: newArray});

    // Back side: remove from server
    // This is done directly in the caller (ItemCard.handleClickRemove)
  }


  onConfirmRemoveItem = (item) => {
    this.setState({itemToRemove: item, removeModalOpened: true})
  }

  handleCloseRemoveModal = () => {
    this.setState({itemToRemove: null, removeModalOpened: false})
  }




  render() {
    console.debug('[--- R ---] Render: Dashboard' );

    const { classes, userInfo } = this.props;
    const { category, filteredArrayItems, arrayItems, removeModalOpened } = this.state;

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
          onClose={this.handleCloseRemoveModal}
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
            <Button onClick={this.handleCloseRemoveModal} color="primary">
              <FormattedMessage id="item.remove.confirmation.cancel" defaultMessage="Cancel" />
            </Button>
            <Button onClick={this.onRemoveItem} color="primary" autoFocus>
              <FormattedMessage id="item.remove.confirmation.remove" defaultMessage="Remove" />
            </Button>
          </DialogActions>
        </Dialog>

        <div className={classes.layout}>
          <Filters language={userInfo.language} category={category} onCategoryChange={this.onCategoryChange} />
          <Container maxWidth="md">
            <ItemsList arrayItems={filteredArrayItems} onSavePicture={this.onSavePicture} onRemoveItem={this.onConfirmRemoveItem} />
          </Container>
        </div>          

      </React.Fragment>
    );
  }
}

export default injectIntl(withSnackbar(withItems(withUserInfo(withStyles(styles)(Dashboard)))));
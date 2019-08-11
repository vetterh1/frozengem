import * as log from 'loglevel';
import React from 'react';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import { injectIntl, defineMessages } from "react-intl";
// import { defineMessages } from 'react-intl.macro';
import { withStyles } from '@material-ui/core/styles';
import { withUserInfo } from '../../auth/withUserInfo';
import { withItemCharacteristics } from '../../auth/withItemCharacteristics';
import { withItems } from '../../auth/withItems';
// import DetailsForm from './DetailsForm';
// import ContainerForm from './ContainerForm';
// import ContainerColorForm from './ContainerColorForm';
import CharacteristicsSelection from '../utils/CharacteristicsSelection';
// import FreezerForm from './FreezerForm';
// import LocationForm from './LocationForm';
// import Results from './Results';
import StepWizard from 'react-step-wizard';
import { withSnackbar } from 'notistack';
// import setStateAsync from '../../utils/setStateAsync';


const styles = theme => ({
  button: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },  
  divWizardPage: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    flex: "1 1 auto", 
  },
  maxHeight: {
    display: "flex",
    flexGrow: 1,
  },
  normalHeight: {
    display: "flex",
    flexGrow: 0,
  },  
});

const logAddWizard = log.getLogger('logAddWizard');
// loglevelServerSend(logAddWizard); // a setLevel() MUST be run AFTER this!
logAddWizard.setLevel('debug');
logAddWizard.debug('--> entering AddWizard.jsx');



const messages = defineMessages({ 
  error: {
    id: 'item.add.error',
    defaultMessage: 'Sorry, saving this item failed. Please try again...',
  },  
  successPicture: {
    id: 'camera.success',
    defaultMessage: 'Your photo has been added successfuly!',
  },  
  errorPicture: {
    id: 'camera.error',
    defaultMessage: 'Sorry, saving this picture failed. Please try again...',
  },
  titleCategory: {
    id: 'add.category.title',
    defaultMessage: 'What are you storing?',
  },  
  titleContainer: {
    id: 'add.container.title',
    defaultMessage: 'What container are you using?',
  },
  titleColor: {
    id: 'add.color.title',
    defaultMessage: 'What color is your {container}?',
  },
  titleSize: {
    id: 'add.size.title',
    defaultMessage: 'How much quantity are you storing?',
  },
  titleFreezer: {
    id: 'add.freezer.title',
    defaultMessage: 'In which freezer are you storing it?',
  },  
  titleLocation: {
    id: 'add.location.title',
    defaultMessage: 'Where exactly do you store it?',
  },
});



const AddWizard = ({userInfo, items, itemCharacteristics, intl, enqueueSnackbar, closeSnackbar, classes}) => {

  const stepsNumber = 8;
  
  const [item, setItemValues] = React.useState(
    {
      id: null,
      category: null,
      details: [],
      container: null,
      containerColors: [],      
      color: null,
      size: null,
      freezer: null,
      location: null,
      name: "",
      expirationDate: null,
      expirationInMonth: 0,
      code: null,
    }
  );
  const [cameraDialogState, setCameraDialogState] = React.useState(false);
  


  const handleBack = async (updates, updateServer = false) => {
    await handleChange(updates, updateServer);
    return 1;
  }

  const handleBackToColorOrNot = async (updates, updateServer = false) => {
    await handleChange(updates, updateServer);
    return item.containerColors.length > 0 ? 1 : 2;
  }




  // Set the received value in the state 
  // (replacing any existing one)
  const handleChange = async (updates, updateServer = false) => {

    // Update the item with the new values
    setItemValues({ ...item, ...updates });

    if(updateServer) {
      try {
        const itemUpdated = await items.updateItemToServer(item.id , updates, userInfo);
        handleChange({code: itemUpdated.code})
      } catch (error) {
        console.error('AddWizard.handleChange error: ' , error);
        const key =enqueueSnackbar(
         intl.formatMessage(messages.error), 
          {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {closeSnackbar(key);}}
        ); 
        return null;
      }
    }
    return 1;
  }





  
  const handleChangeToColorOrNot = async (updates, updateServer = false) => {
    let containerColors = [];

    // If container changes, check if it has a color:
    const container = updates['container'];
    if(container)
      containerColors = itemCharacteristics.colors.filter(color => color.parents.find(oneParent => oneParent === container));

    await handleChange({...updates, containerColors}, updateServer);
    return containerColors.length > 0 ? 1 : 2;
  }







  // Add the received value to the state value lists if it does not exist yet
  // If it already exists: remove it
  const handleArrayToggle = (change) => {
    const {name, value} = change;
    const existingValues = item[name];
    const alreadyExists = existingValues.find(valueInList => valueInList === value);
    let newValues;
    if(alreadyExists){
      newValues = existingValues.filter(valueInList => valueInList !== value);
    } else {
      newValues = [...existingValues, value];
    }
    setItemValues({
      ...item,
      [name]: newValues
    });    
  }

  const onStepChange = async ({activeStep}) => {
    console.log("AddWizard.onStepChange: ", activeStep);
    if(activeStep === stepsNumber) {
      console.log("Item start of onStepChange: ", item);

      try {

        // Expiration date calculation
        const { category, details } = item;
        const expirationInMonth = itemCharacteristics.computeExpiration(category, details);
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + expirationInMonth, 1);
        console.log("Date after " + expirationInMonth + " months:", expirationDate);
        setItemValues({
          ...item,
          expirationDate,
          expirationInMonth
        });    
        console.log("State middle of onStepChange: ", item);

        // Server save
        const itemUpdated = await items.saveItemToServer(item, userInfo);

        // Update state with code & id generated by the server:
        handleChange({code: itemUpdated.code, id: itemUpdated.id})

      } catch (error) {
        console.error('AddWizard.onStepChange error: ' , error);
        const key =enqueueSnackbar(
         intl.formatMessage(messages.error), 
          {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {closeSnackbar(key);}}
        ); 
      }
    }
  }



 
  // Set the received value in the state 
  // (replacing any existing one)
  const savePicture = async (pictureData, thumbnailData) => {

    try {
      await items.updatePictureItemToServer(item.id , pictureData, thumbnailData, userInfo);
      const key = enqueueSnackbar(
        intl.formatMessage(messages.successPicture), 
        {variant: 'success', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {closeSnackbar(key);}}
      );  
    } catch (error) {
      console.error('AddWizard.handleChange error: ' , error);
      const key = enqueueSnackbar(
        intl.formatMessage(messages.errorPicture), 
        {variant: 'error', anchorOrigin: {vertical: 'bottom',horizontal: 'center'}, onClick: () => {closeSnackbar(key);}}
      ); 
    }
  }

  const { isAuthenticated, language } = userInfo;

  if (!isAuthenticated()) return <Redirect to='/' />;

  // console.log("----------> item : ", item);


  return (
      <div className={classes.divWizardPage}>
        <StepWizard
          isHashEnabled 
          className={"flex-normal-height flex-direction-column"} 
          classNameWrapper={'flex-normal-height flex-direction-column'}
          onStepChange={onStepChange}
        >
          {/* !!!! update variable stepsNumber whenever this list changes !!!! */}
          {/* <DetailsForm hashKey={'details'} language={language} handleChange={handleChange} handleArrayToggle={handleArrayToggle} state={state} />
           */}
          <CharacteristicsSelection
            hashKey={'category'}
            name='category'
            title={intl.formatMessage(messages.titleCategory)}
            handleChange={handleChange}
            items={itemCharacteristics.categories}
            preselectedItems={item.category}
            showNavigation
            backDisabled
          />
          <CharacteristicsSelection
            hashKey={'container'}
            name='container'
            title={intl.formatMessage(messages.titleContainer)}
            handleChange={handleChangeToColorOrNot}
            handleBack={handleBack}
            items={itemCharacteristics.containers}
            preselectedItems={item.container}
            showNavigation
          />          
          <CharacteristicsSelection
            hashKey={'color'}
            name='color'
            title={intl.formatMessage(messages.titleColor, {container: "parentName.toLowerCase()"})}
            handleChange={handleChange}
            handleBack={handleBack}
            items={item.containerColors}
            preselectedItems={item.color}
            showNavigation
          />
          <CharacteristicsSelection
            hashKey={'size'}
            name='size'
            title={intl.formatMessage(messages.titleSize)}
            handleChange={handleChange}
            handleBack={handleBackToColorOrNot}
            items={itemCharacteristics.sizes}
            preselectedItems={item.size}
            showNavigation
          />
          <CharacteristicsSelection
            hashKey={'freezer'}
            name='freezer'
            title={intl.formatMessage(messages.titleFreezer)}
            handleChange={handleChange}
            handleBack={handleBack}
            items={itemCharacteristics.freezers}
            preselectedItems={item.freezer}
            showNavigation
          />
          <CharacteristicsSelection
            hashKey={'location'}
            name='location'
            title={intl.formatMessage(messages.titleLocation)}
            handleChange={handleChange}
            handleBack={handleBack}
            items={itemCharacteristics.locations}
            preselectedItems={item.location}
            showNavigation
          />            
                    {/* <Results hashKey={'results'} language={language} handleChange={handleChange} resetState={resetState} state={state} handleAddPicture={savePicture} /> */}
          {/* !!!! update variable stepsNumber whenever this list changes !!!! */}
          </StepWizard>
      </div>
    );
}


AddWizard.propTypes = {
  userInfo: PropTypes.object.isRequired,
  items: PropTypes.object.isRequired,
  itemCharacteristics: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  closeSnackbar: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default injectIntl(withSnackbar(withItems(withItemCharacteristics(withUserInfo(withStyles(styles, { withTheme: true })(AddWizard))))));







  
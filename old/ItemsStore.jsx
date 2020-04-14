// TODO Delete this file ItemsStore.jsx once no other file is using it

/* eslint-disable array-callback-return */


import React from "react";
import * as log from 'loglevel';
// import stringifyOnce from '../utils/stringifyOnce.js'
import { defineMessages } from "react-intl";

import qs from 'qs';
import axios from 'axios';
import config from './config'
import {Months} from '../i18n/i18nDates';
import { ExpirationLevel } from "./ItemCharacteristicsStore";
import PanToolIcon from '@material-ui/icons/PanTool';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import TimerIcon from '@material-ui/icons/Timer';
import DoneIcon from '@material-ui/icons/Done';

const logItems = log.getLogger('logItems');
// loglevelServerSend(logItems); // a setLevel() MUST be run AFTER this!
logItems.setLevel('debug');
logItems.debug('--> entering Items.jsx');







const messages = defineMessages({ 
  expirationMessagePassed: {
    id: 'expiration.message.passed',
    defaultMessage: 'Expired!',
  },
  expirationMessageNext_30_days: {
    id: 'expiration.message.next_30_days',
    defaultMessage: 'Expires in a few days!',
  },
  expirationMessageWithin_3_months: {
    id: 'expiration.message.within_3_months',
    defaultMessage: 'Expires withing 3 months',
  },
  expirationMessageLater: {
    id: 'expiration.message.later',
    defaultMessage: 'Expires in more than 3 months',
  },
});







export const ItemsContext = React.createContext();



export class Items extends React.Component {
  state = {
    saveItemToServer: (item, user) => this.saveItemToServer(item, user),
    updateItemToServer: (idItem, updates, user) => this.updateItemToServer(idItem, updates, user),
    updatePictureItemToServer: (idItem, picture, thumbnail, user) => this.updatePictureItemToServer(idItem, picture, thumbnail, user),
    removeItemOnServer: (item, user, size) => this.removeItemOnServer(item, user, size),
    getFromServer: (token, user, itemCharacteristics, userInfo, theme, removed = false) => this.getFromServer(token, user, itemCharacteristics, userInfo, theme, removed),
    addUtilityFieldsToItem: (item, itemCharacteristics, userInfo, theme) => this.addUtilityFieldsToItem(item, itemCharacteristics, userInfo, theme),
  };



  /*
    Ex of item received:
      category: "V"
      code: "V0121"
      color: ""
      container: "B"
      createdAt: "2019-06-27T11:52:28.031Z"
      details: "DHOM,DRAW"
      expirationDate: "2019-12-27T12:52:27.850Z"
      freezer: "O"
      id: "5d14adfc1546b6356c48a24c"
      location: "M"
      description: ""
      size: 4
      tableData: {id: 0}
      updatedAt: "2019-06-27T11:52:28.031Z"
      user: "5d07775232fd681dfa7a9b25"

    Added here:
        __detailsArray
        __expirationLevel
        __avatarBackgroundColor
        __cardBackgroundColor
        __iconExpiration
        __expirationText
        __categoryText
        __descriptionOrCategory
        __sizeInText
        __detailsNames
        __imageExists
        __yearExpiration
        __monthExpirationAsText
  
    Note on itemCharacteristics, userInfo, theme: 
      needed for adding the __xxx variables
      
  */

  async getFromServer(token, user, itemCharacteristics, userInfo, theme, removed = false) {
    console.debug('|--- SERVER CALL ---|--- GET ---| Items.get loads items from server');
    const params = { 'access_token': token, 'user': user };
    const removedOption = removed ? "/removed" : "";
    const options = {
      method: 'GET',
      url: `${config.boUrl}/items${removedOption}?${qs.stringify(params)}`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    };

    try {
      const response = await axios(options);
      response.data.forEach(item => {
        this.addUtilityFieldsToItem(item, itemCharacteristics, userInfo, theme);
      });
      // console.log('Items.get response: ' , response.data);
      return response;

    } catch (error) {
      console.error('Items.get error: ' , error);
      throw error;
    }
  }

  /*
      Adds:
      __detailsArray
      __expirationLevel
      __avatarBackgroundColor
      __cardBackgroundColor
      __iconExpiration
      __expirationText
      __categoryText
      __containerText
      __colorText
      __freezerText
      __locationText
      __descriptionOrCategory
      __sizeInText
      __detailsNames
      __imageExists
      __yearExpiration
      __monthExpirationAsText
  */

  addUtilityFieldsToItem(item, itemCharacteristics, userInfo, theme) {
    item.__detailsArray = item.details ? item.details.split(",") : [];
    item.__expirationLevel = itemCharacteristics.computeExpirationLevel(item.expirationDate);
    switch (item.__expirationLevel) {
      case ExpirationLevel.EXPIRATION_PASSED:
        item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.expired;
        item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.expired;
        item.__iconExpiration = <PanToolIcon />;
        item.__expirationText = messages.expirationMessagePassed;
        break;
      case ExpirationLevel.EXPIRATION_NEXT_30_DAYS:
        item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.next_30_days;
        item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.next_30_days;
        item.__iconExpiration = <PriorityHighIcon />;
        item.__expirationText = messages.expirationMessageNext_30_days;
        break;
      case ExpirationLevel.EXPIRATION_WITHIN_3_MONTHS:
        item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.within_3_months;
        item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.within_3_months;
        item.__iconExpiration = <TimerIcon />;
        item.__expirationText = messages.expirationMessageWithin_3_months;
        break;
      default:
        item.__avatarBackgroundColor = theme.palette.itemCard.avatarBackgroundColor.later;
        item.__cardBackgroundColor = theme.palette.itemCard.cardBackgroundColor.later;
        item.__iconExpiration = <DoneIcon />;
        item.__expirationText = messages.expirationMessageLater;
        break;
    } 

    
    item.__categoryText = itemCharacteristics.getCategoryName(item.category, userInfo.language);
    item.__containerText = itemCharacteristics.getContainerName(item.container, userInfo.language);
    item.__colorText = itemCharacteristics.getColorName(item.color, userInfo.language);
    item.__freezerText = itemCharacteristics.getFreezerName(item.freezer, userInfo.language);
    item.__locationText = itemCharacteristics.getLocationName(item.location, userInfo.language);
    item.__descriptionOrCategory = item.description && item.description.length > 0 ? item.description : item.__categoryText;
    item.__sizeInText = itemCharacteristics.getSizeLabel(item.size, userInfo.language);
    const detailsNamesArray = itemCharacteristics.getDetailsNamesArray(item.__detailsArray, userInfo.language);
    item.__detailsNames = detailsNamesArray ? detailsNamesArray.join( ', ') : null;
    item.__imageExists = item.pictureName || item.thumbnailName;

    const expirationAsDate = new Date(item.expirationDate);
    item.__yearExpiration = expirationAsDate.getFullYear();
    const monthExpiration = expirationAsDate.getMonth();
    item.__monthExpirationAsText = Months[userInfo.language][monthExpiration];
  }


          
  
  async saveItemToServer(item, user) {
    console.debug('|--- SERVER CALL ---|--- POST ---| Items.saveItemToServer: ', item);
    const data = { 'access_token': user.accessToken, ...item };
    data.details = item.details.join();
    const options = {
      method: 'POST',
      url: `${config.boUrl}/items`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      // console.log('saveItemToServer options: ' , options);
      const response = await axios(options);
      // console.log('saveItemToServer OK: ' , response.data);
      return response.data;
    } catch (error) {
      console.error('register error: ' , error);
      throw error;
    }
  }
  
  
        
  
    
  async updateItemToServer(idItem, updates, user) {
    console.debug('|--- SERVER CALL ---|--- PUT ---| Items.updateItemToServer: ', idItem, updates);
    const data = { 'access_token': user.accessToken, ...updates };
    const options = {
      method: 'PUT',
      url: `${config.boUrl}/items/${idItem}`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      console.error('register error: ' , error);
      throw error;
    }
  }
  
  
        
  
    
  async updatePictureItemToServer(idItem, picture, thumbnail, user) {
    console.debug('|--- SERVER CALL ---|--- PUT ---| Items.updatePictureItemToServer: ', idItem);

    //
    // Prepare the multipart parameters for the form-data
    // with the id, the token and the 2 images (picture and thumbnail)
    //
    // (!) the name of the images MUST be setup here and will be used as filename
    // on the server side
    //
    let formData = new FormData() // instantiate it
    formData.set("id", idItem);
    formData.set("access_token", user.accessToken);
    formData.append("picture", picture, `${idItem}-picture-${Date.now()}.jpg`);
    formData.append("picture", thumbnail, `${idItem}-thumbnail-${Date.now()}.jpg`);

    const options = {
      method: 'POST',
      url: `${config.boUrl}/items/picture`,
      crossdomain : true,
      headers: { 'content-type': 'multipart/form-data' },
      data: formData,
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      console.error('updatePictureItemToServer error: ' , error);
      throw error;
    }
  }
  
  

  async removeItemOnServer(idItem, user, size) {
    console.debug('|--- SERVER CALL ---|--- POST ---| Items.removeItemOnServer: ', idItem, size);
    const data = { 'access_token': user.accessToken };
    if(size) data['size'] = size;
    const options = {
      method: 'POST',
      url: `${config.boUrl}/items/remove/${idItem}`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      const response = await axios(options);
      return response.data;
    } catch (error) {
      console.error('removeItemOnServer error: ' , error);
      throw error;
    }
  }
  
  
        
  

  
  
    
  render() {
      const { state, props: { children } } = this;
      return <ItemsContext.Provider value={state}>{children}</ItemsContext.Provider>;
    }
}

export const ItemsConsumer = ItemsContext.Consumer;

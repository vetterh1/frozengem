/* eslint-disable array-callback-return */


import React from "react";
import * as log from 'loglevel';
// import stringifyOnce from '../utils/stringifyOnce.js'
import qs from 'qs';
import axios from 'axios';
import config from './config'


const logItems = log.getLogger('logItems');
// loglevelServerSend(logItems); // a setLevel() MUST be run AFTER this!
logItems.setLevel('debug');
logItems.debug('--> entering Items.jsx');


export const ItemsContext = React.createContext();



export class Items extends React.Component {
  state = {
    saveItemToServer: (item, user) => this.saveItemToServer(item, user),
    updateItemToServer: (idItem, updates, user) => this.updateItemToServer(idItem, updates, user),
    updatePictureItemToServer: (idItem, picture, user) => this.updatePictureItemToServer(idItem, picture, user),
    get: (token, user) => this.get(token, user),
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
    name: ""
    size: 4
    tableData: {id: 0}
    updatedAt: "2019-06-27T11:52:28.031Z"
    user: "5d07775232fd681dfa7a9b25"

    Notes:
    - transformed here: 
      - detailsArray: (2) ["DHOM", "DRAW"]

*/

  async get(token, user) {
    console.info('|--- SERVER CALL ---|--- GET ---| Items.get loads items from server');
    const params = { 'access_token': token, 'user': user };
    const options = {
      method: 'GET',
      url: `${config.boUrl}/items?${qs.stringify(params)}`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    };

    try {
      const response = await axios(options);
      response.data.forEach(item => {
        item.detailsArray = item.details ? item.details.split(",") : [];
      });
      // console.log('Items.get response: ' , response.data);
      return response;

    } catch (error) {
      console.error('Items.get error: ' , error);
      throw error;
    }
  }

        
        
  
  async saveItemToServer(item, user) {
    console.info('|--- SERVER CALL ---|--- POST ---| Items.saveItemToServer: ', item);
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
    console.info('|--- SERVER CALL ---|--- PUT ---| Items.updateItemToServer: ', idItem);
    const data = { 'access_token': user.accessToken, ...updates };
    const options = {
      method: 'PUT',
      url: `${config.boUrl}/items/${idItem}`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      // console.log('updateItemToServer options: ' , options);
      const response = await axios(options);
      // console.log('updateItemToServer OK: ' , response.data);
      return response.data;
    } catch (error) {
      console.error('register error: ' , error);
      throw error;
    }
  }
  
  
        
  
    
  async updatePictureItemToServer(idItem, picture, user) {
    const data = { 'access_token': user.accessToken, picture };
    const options = {
      method: 'PUT',
      url: `${config.boUrl}/items/${idItem}/picture`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      console.log('updatePictureItemToServer options: ' , options);
      await axios(options);
      const responseItem = await this.updateItemToServer(idItem, {picture: true}, user);
      console.log('updatePictureItemToServer OK: ' , responseItem);
      return responseItem;
    } catch (error) {
      console.error('updatePictureItemToServer error: ' , error);
      throw error;
    }
  }
  
  
        
  
  
  
  
    
  render() {
      const { state, props: { children } } = this;
      return <ItemsContext.Provider value={state}>{children}</ItemsContext.Provider>;
    }
}

export const ItemsConsumer = ItemsContext.Consumer;

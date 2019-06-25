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
    get: (token) => this.get(token),
  };





// data={[
//   { category: 'T', expiration: '1/1/2020', name: null, code: 'T00' },
//   { category: 'T', expiration: '2/2/2020', name: 'Truc', code: 'T01' },
//   { category: 'T', expiration: '1/3/2020', name: 'Autre truc', code: 'T02' },
//   { category: 'V', expiration: '1/4/2020', name: 'Carottes', code: 'V00' },
// ]}

  async get(token) {
    
    console.log('Items.get token: ' , token);

    const params = { 'access_token': token };
    const options = {
      method: 'GET',
      url: `${config.boUrl}/items?${qs.stringify(params)}`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    };

    try {
      // return [
      //   { category: 'X', expiration: '1/1/2020', name: null, code: 'T00' },
      //   { category: 'T', expiration: '2/2/2020', name: 'Truc', code: 'T01' },
      //   { category: 'T', expiration: '1/3/2020', name: 'Autre truc', code: 'T02' },
      //   { category: 'V', expiration: '1/4/2020', name: 'Carottes', code: 'V00' },
      // ];
  
      const response = await axios(options);
      console.log('Items.get response: ' , response.data);
      return response;

    } catch (error) {
      console.error('Items.get error: ' , error);
      throw error;
    }
  }

        
        
  
  async saveItemToServer(item, user) {
    const data = { 'access_token': user.accessToken, ...item };
    const options = {
      method: 'POST',
      url: `${config.boUrl}/items`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      const response = await axios(options);
      console.log('saveItemToServer OK: ' , response.data);
      return response.data;
    } catch (error) {
      console.error('register error: ' , error);
      return null;
    }
  }
  
  
        
  
  
  
  
    
  render() {
      const { state, props: { children } } = this;
      return <ItemsContext.Provider value={state}>{children}</ItemsContext.Provider>;
    }
}

export const ItemsConsumer = ItemsContext.Consumer;

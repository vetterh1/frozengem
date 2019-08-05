/* eslint-disable array-callback-return */


import React from "react";
import * as log from 'loglevel';
// import stringifyOnce from '../utils/stringifyOnce.js'
import qs from 'qs';
import axios from 'axios';
import config from '../data/config'


const logUserInfoStore = log.getLogger('logUserInfoStore');
logUserInfoStore.setLevel('debug');
logUserInfoStore.debug('--> entering UserInfoStore.jsx');


export const UserInfoContext = React.createContext();



export class UserInfoStore extends React.Component {
  state = {
      accessToken: null,
      name: null,
      language: "en",
      isAuthenticated: () => this.isAuthenticated(),
      loadStateFromLocalStorage: () => this.loadStateFromLocalStorage(),
      loadFromServer: (token) => this.loadFromServer(token),
      getHome: () => this.getHome(),
      joinHome: (home) => this.joinHome(home),
      leaveHome: (home) => this.leaveHome(home),
      joinNewHome: (home) => this.joinNewHome(home),
      setLanguage: (l) => this.setLanguage(l),
      login: (email, password) => this.login(email, password),
      logout: () => this.logout(),
      registerToServer: (email, password, name) => this.registerToServer(email, password, name),
  };


    
  componentDidMount() {
      this.state.loadStateFromLocalStorage();
  }


  isAuthenticated() {
    // Check whether the current time is past the access token's expiry time
    // const expiresAt = parseInt(localStorage.getItem('expiresAt'));
    // const now = Date.now()
    // const auththenticated = now < expiresAt;
    // console.log('isAuthenticated: ', auththenticated, expiresAt, now);
    // return auththenticated;

    // Super simple & not secure (on client side) method:
    
    // console.log('isAuthenticated: token,result = ', this.state.accessToken, this.state.accessToken !== null);
    return this.state.accessToken !== null;
  }



  getHome() {
    return this.state.home;
  }



  saveStateAndSession(userInfos) {
    localStorage.setItem('accessToken', userInfos.accessToken);
    this.setState({...userInfos});
  }


  loadStateFromLocalStorage() {
    if(this.state.accessToken) return;

    const accessToken = localStorage.getItem('accessToken');
    const name = localStorage.getItem('name');
    console.log('loadStateFromLocalStorage: accessToken, name = ', accessToken, name);

    if(accessToken) {
      if(!name) {
        this.loadFromServer(accessToken);
      }
    }
  }

  
  async setLanguage (language) {
      console.info('|--- SERVER CALL ---|--- POST ---| UserInfoStore.setLanguage: ', language);

      // Update state:
      this.setState({language});

      // don't save if not authenticated
      if(!this.isAuthenticated()) return null;

      // Update user on server:
      const data = { 'access_token': this.state.accessToken, language };
      const options = {
        method: 'PUT',
        url: `${config.boUrl}/users/${this.state.id}`,
        crossdomain : true,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
      };
  
      try {
        await axios(options);
        return null;
      } catch (error) {
        console.error('setLanguage error: ' , error);
      }      
  }



  async login(email, password) {
    console.info('|--- SERVER CALL ---|--- POST ---| UserInfoStore.login: ', email);
    const masterKey = config.masterKey;
    const data = { 'access_token': masterKey };
    const options = {
      method: 'POST',
      url: `${config.boUrl}/auth`,
      auth: {
        username: email,
        password: password
      },      
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      const response = await axios(options);
      const {user, token} = response.data;
      console.log('login OK: ' , response, user, token);
      this.saveStateAndSession({
        accessToken: token,
        ...user
      });
      return user.name;

    } catch (error) {
      console.error('login error: ' , error);
      throw error;
    }
  }
  


logout() {

  // Clear everything on local storage
  localStorage.clear();

  this.setState({name: null, accessToken: null});
    
    // navigate to the home route done in <Logout> component
  }



  async registerToServer(email, password, name) {
    console.info('|--- SERVER CALL ---|--- POST ---| UserInfoStore.registerToServer: ', email);
    const masterKey = config.masterKey;
    const data = { 'access_token': masterKey, email, password, name };
    const options = {
      method: 'POST',
      url: `${config.boUrl}/users`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      const response = await axios(options);
      const {user, token} = response.data;
      console.log('register OK: ' , response, user, token);
      this.saveStateAndSession({
        accessToken: token,
        ...user
      });
      return user.name;

    } catch (error) {
      console.error('register error: ' , error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('data: ', error.response.data);
        console.error('status: ', error.response.status);
        console.error('headers: ', error.response.headers);

      } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.error('request: ', error.request);
      } else {
          // Something happened in setting up the request that triggered an Error
          console.error('unknown: ', error.message);
      }
    
      throw error;
    }
  }



  async loadFromServer(token) {
    console.info('|--- SERVER CALL ---|--- GET ---| UserInfoStore.loadFromServer');
    const params = { 'access_token': token };
    const options = {
      method: 'GET',
      url: `${config.boUrl}/users/me?${qs.stringify(params)}`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
    };

    try {
      const response = await axios(options);
      console.log('loadFromServer response: ' , response);
      this.setState({...response.data, accessToken:token});
      
      return null;

    } catch (error) {
      console.error('loadFromServer error: ' , error);
      throw error;
    }
  }





  async joinHome(home) {
    console.info('|--- SERVER CALL ---|--- PUT ---| UserInfoStore.joinHome: ', home);
    const data = { 'access_token': this.state.accessToken, home };
    const options = {
      method: 'PUT',
      url: `${config.boUrl}/users/${this.state.id}/home/join`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      const response = await axios(options);
      console.log('Join home response: ' , response);

      const {home, homeOrder} = response.data.user;
      this.setState({home: home, homeOrder: homeOrder});
      
      return null;

    } catch (error) {
      console.error('register error: ' , error);
      throw error;
    }
  }




  async leaveHome() {
    console.info('|--- SERVER CALL ---|--- PUT ---| UserInfoStore.leaveHome');
    const data = { 'access_token': this.state.accessToken };
    const options = {
      method: 'PUT',
      url: `${config.boUrl}/users/${this.state.id}/home/leave`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      const response = await axios(options);
      console.log('leave home response: ' , response);

      const {home, homeOrder} = response.data.user;
      this.setState({home: home, homeOrder: homeOrder});
      
      return null;

    } catch (error) {
      console.error('register error: ' , error);
      throw error;
    }
  }





  
  
  async joinNewHome(name, label) {
    console.info('|--- SERVER CALL ---|--- PUT ---| UserInfoStore.joinNewHome: ', name);
    const data = { 'access_token': this.state.accessToken, name, label };
    const options = {
      method: 'PUT',
      url: `${config.boUrl}/users/${this.state.id}/home/new`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      const response = await axios(options);
      console.log('Join new home response: ' , response);

      const {home, homeOrder} = response.data.user;
      this.setState({home: home, homeOrder: homeOrder});
      
      return null;

    } catch (error) {
      console.error('register error: ' , error);
      throw error;
    }
  }


  
  
  
    
  render() {
    const { state, props: { children } } = this;
    return <UserInfoContext.Provider value={state}>{children}</UserInfoContext.Provider>;
  }
}

export const UserInfoConsumer = UserInfoContext.Consumer;

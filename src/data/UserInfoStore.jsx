/* eslint-disable array-callback-return */


import React from "react";
import * as log from 'loglevel';
import stringifyOnce from '../utils/stringifyOnce.js'
import qs from 'qs';
import axios from 'axios';
import config from '../data/config'


const logUserInfoStore = log.getLogger('logUserInfoStore');
// loglevelServerSend(logUserInfoStore); // a setLevel() MUST be run AFTER this!
logUserInfoStore.setLevel('debug');
logUserInfoStore.debug('--> entering UserInfoStore.jsx');




// (!) Should arrive localized from server (!)

const defaultUserInfo = {
    version: 1,    
    language: "en"
};

export const UserInfoContext = React.createContext();



export class UserInfoStore extends React.Component {
  state = {
      language: "en",
      isAuthenticated: () => this.isAuthenticated(),
      loadStateFromLocalStorage: () => this.loadStateFromLocalStorage(),
      getHome: () => this.getHome(),
      joinHome: (home) => this.joinHome(home),
      setLanguage: (l) => this.setLanguage(l),
      login: (email, password) => this.login(email, password),
      logout: () => this.logout(),
      registerToServer: (email, password, name) => this.registerToServer(email, password, name),


      // load: () => this.load(),
      // save: () => this.save(),
      // switchToFR: () => {this.setState({language: "fr"}, () => this.save())},
      // switchToEN: () => {this.setState({language: "en"}, () => this.save())},
      // getLanguage: () => {return this.state.language},
  };


    
  componentDidMount() {
      // this.state.load();
      this.state.loadStateFromLocalStorage();
  }






  // userInfo = null;                // User infos from server (or local storage)
  previouslyUsedLanguage = localStorage.getItem('previouslyUsedLanguage');  // Language used last time on this computer

  expiresIn = 60 * 60 * 24 * 365 * 1000; // 1 year in milliseconds!
  // expiresIn = 60 * 1000; // 1mn in milliseconds!



  isAuthenticated() {
    // Check whether the current time is past the access token's expiry time
    const expiresAt = parseInt(localStorage.getItem('expiresAt'));
    const now = Date.now()
    const auththenticated = now < expiresAt;
    console.log('isAuthenticated: ', auththenticated, expiresAt, now);
    return auththenticated;
  }

  getHome() {
    return this.state.home;
  }


  // getLanguage() {
  //   // console.log('UserInfo: userInfo.language=', this.userInfo ? this.userInfo.language : "N/A");
  //   // console.log('UserInfo: userInfo.previouslyUsedLanguage=', this.previouslyUsedLanguage);

  //   if(this.userInfo && this.userInfo.language) return this.userInfo.language;
  //   if(this.previouslyUsedLanguage) return this.previouslyUsedLanguage;
  //   return defaultLanguage;
  // }

  setLanguageOld(language) {
    // update this object
    this.previouslyUsedLanguage = language;
    if(this.userInfo) this.userInfo.language = language;
    // update local storage
    localStorage.setItem('previouslyUsedLanguage', language);
    localStorage.setItem('language', language);

    // TODO: update server
  }


  saveStateAndSession(userInfos) {
      // Set the time that the access token will expire at
      userInfos['expiresAt'] = JSON.stringify((this.expiresIn) + new Date().getTime());

    Object.keys(userInfos).map(key => {
        localStorage.setItem(key, userInfos[key]);
    });

    const listUserInfos = Object.keys(userInfos).join();
    localStorage.setItem("listUserInfos", listUserInfos);

    this.setState({...userInfos});
  }


  loadStateFromLocalStorage() {

    if(this.state.expiresAt) return;

    const listStringUserInfos = localStorage.getItem('listUserInfos');
    if(!listStringUserInfos) return;
    const listUserInfos = listStringUserInfos.split(',');
    let infos = {};
    listUserInfos.forEach((infoKey) => {infos[infoKey] = localStorage.getItem(infoKey)});
    this.setState({...infos});
  }

  
  load() {
      // Get from local storage first
      const rawFromCache = localStorage.getItem('UserInfo');
      let needLocalSave = false;
      let userInfo = null;
      if(rawFromCache) {
          userInfo = JSON.parse(rawFromCache);
      }
      
      // if no local storage or older than default values, use default
      if(!rawFromCache || !userInfo || userInfo.version < defaultUserInfo.version) {
          // if no local storage: use default values
          userInfo = {...defaultUserInfo};
          // and save them in local storage for next time
          needLocalSave = true;
      }

      // Server query to get the latest
      // should check if version is higher 

      if(needLocalSave) {
          localStorage.setItem('UserInfo', JSON.stringify(userInfo));
      }

      this.setState(userInfo);

      console.log('UserInfoStore: userInfo', stringifyOnce(userInfo));
  }

  save() {
      localStorage.setItem('UserInfo', JSON.stringify(this.state));
  }


  setLanguage (l) {
      console.log('UserInfoStore.setLanguage: ', l);
      this.setState({language: l},() => this.save())
  }



  async login(email, password) {
      const boUrl = config.boUrl;
      const masterKey = config.masterKey;
      const data = { 'access_token': masterKey };
      const options = {
        method: 'POST',
        url: `${boUrl}/auth`,
        auth: {
          username: email,
          password: password
        },      
        // withCredentials : true, 
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

      // Clear local storage:
      Object.keys(this.state).map(key => {
          localStorage.removeItem(key);
      });
      // To be sure!
      localStorage.removeItem('expiresAt');
      localStorage.removeItem('accessToken');

      this.setState({expiresAt: null, accessToken: null});
      
      // navigate to the home route done in <Logout> component
    }
  


    async registerToServer(email, password, name) {
      const boUrl = config.boUrl;
      const masterKey = config.masterKey;
      const data = { 'access_token': masterKey, email, password, name };
      const options = {
        method: 'POST',
        url: `${boUrl}/users`,
        // withCredentials : true, 
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
        throw error;
      }
    }
  
  
  
  
  


    async joinHome(home) {
      const boUrl = config.boUrl;
      const data = { 'access_token': this.state.accessToken, home };
      const options = {
        method: 'PUT',
        url: `${boUrl}/users/${this.state.id}/home/join`,
        // withCredentials : true, 
        crossdomain : true,
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify(data),
      };
  
      try {
        const response = await axios(options);
        console.log('Join home response: ' , response);

        const {home, homeOrder} = response.data.user;
        localStorage.setItem("home", home);
        localStorage.setItem("homeOrder", homeOrder);

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

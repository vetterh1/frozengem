/* eslint-disable class-methods-use-this */

import * as log from 'loglevel';
// import 'es6-promise/auto';
// import 'isomorphic-fetch';
// import { loglevelServerSend } from '../utils/loglevel-serverSend';
import stringifyOnce from '../utils/stringifyOnce';
// import history from '../misc/history';
import qs from 'qs';
import axios from 'axios';
import config from '../data/config'


const logUserInfo = log.getLogger('logUserInfo');
// loglevelServerSend(logUserInfo); // a setLevel() MUST be run AFTER this!
logUserInfo.setLevel('debug');
logUserInfo.debug('--> entering Auth.jsx');




// (!) Should arrive localized from server (!)

const defaultUserInfo = {
  version: 1,    
  language: "en"
};


// TODO when adding a new language:
// - add an import in the import section at the top
// - add an require above
// - add to languagesList array below
// - add to addLocaleData method below

const languagesList =
  ['EN', 'FR'];

const languageBrowser =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;

const languageBrowserWithoutRegionCode =
  languageBrowser.toLowerCase().split(/[_-]+/)[0];

const defaultLanguage =
  languagesList.indexOf(languageBrowserWithoutRegionCode) >= 0 ? languageBrowserWithoutRegionCode : 'en';



export default class UserInfo {
  constructor() {
    this.getProfile = this.getProfile.bind(this);
    this.setSession = this.setSession.bind(this);
    this.login = this.login.bind(this);
    this.loadOfflineProfile = this.loadOfflineProfile.bind(this);
    this.save = this.save.bind(this);
  }


  userInfo = null;                // User infos from server (or local storage)
  previouslyUsedLanguage = localStorage.getItem('previouslyUsedLanguage');  // Language used last time on this computer

  expiresIn = 60 * 60 * 24 * 365; // 1 year!
  authenticated = false;

  getLanguage() {
    // console.log('UserInfo: userInfo.language=', this.userInfo ? this.userInfo.language : "N/A");
    // console.log('UserInfo: userInfo.previouslyUsedLanguage=', this.previouslyUsedLanguage);

    if(this.userInfo && this.userInfo.language) return this.userInfo.language;
    if(this.previouslyUsedLanguage) return this.previouslyUsedLanguage;
    return defaultLanguage;
  }

  setLanguage(language) {
    // update this object
    this.previouslyUsedLanguage = language;
    if(this.userInfo) this.userInfo.language = language;
    // update local storage
    localStorage.setItem('previouslyUsedLanguage', language);
    localStorage.setItem('language', language);

    // TODO: update server
  }


  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((this.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    localStorage.setItem('email', authResult.email);
    localStorage.setItem('name', authResult.name);
    localStorage.setItem('language', authResult.language);
    localStorage.setItem('previouslyUsedLanguage', authResult.language);
    localStorage.setItem('houseOrder', authResult.houseOrder);
    this.authenticated = true;
  }



  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');

    // Clear user info
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('language');
    localStorage.removeItem('houseOrder');
    localStorage.removeItem('expires_at');
 
    this.userInfo = null;
    this.authenticated = false;
    localStorage.removeItem('user');

    // navigate to the home route done in <Logout> component
  }



  isAuthenticated() {
    // Check whether the current time is past the access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }


  getAccessToken() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('No access token found');
    }
    return accessToken;
  }

  getProfile(callback) {
  // TODO
    // const accessToken = this.getAccessToken();
    // this.auth0.client.userInfo(accessToken, (err, profile) => {
    //   if (profile) {
    //     this.userInfo = profile;
    //     profile.authId = profile.sub;
    //     profile.displayedName = profile.given_name || profile.nickname || profile.name;

    //     localStorage.setItem('user', JSON.stringify(profile));
    //   }
    //   callback(err, profile);
    // });
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
      this.setSession({
        accessToken: token,
        ...user
      });
      return user.name;

    } catch (error) {
      console.error('login error: ' , error);
      throw error;
    }
  }



  loadOfflineProfile() {
    // Get from local storage first
    const rawFromCache = localStorage.getItem('UserInfo');
    let needLocalSave = false;
    this.userInfo = null;
    if(rawFromCache) {
      this.userInfo = JSON.parse(rawFromCache);
    }
    
    // if no local storage or older than default values, use default
    if(!rawFromCache || !this.userInfo || this.userInfo.version < defaultUserInfo.version) {
        // if no local storage: use default values
        this.userInfo = {...defaultUserInfo};
        // and save them in local storage for next time
        needLocalSave = true;
    }

    // Server query to get the latest
    // should check if version is higher 

    if(needLocalSave) {
        this.save();
    }
    console.log('UserInfoStore: userInfo', stringifyOnce(this.userInfo));
  }

  save() {
      localStorage.setItem('UserInfo', JSON.stringify(this.userInfo));
  }

}
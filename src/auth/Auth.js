/* eslint-disable class-methods-use-this */

import * as log from 'loglevel';
// import 'es6-promise/auto';
// import 'isomorphic-fetch';
// import { loglevelServerSend } from '../utils/loglevel-serverSend';
// import stringifyOnce from '../utils/stringifyOnce';
// import history from '../misc/history';
import qs from 'qs';
import axios from 'axios';
import config from '../data/config'


const logAuth = log.getLogger('logAuth');
// loglevelServerSend(logAuth); // a setLevel() MUST be run AFTER this!
logAuth.setLevel('debug');
logAuth.debug('--> entering Auth.jsx');


export default class Auth {
  constructor() {
    this.getProfile = this.getProfile.bind(this);
    this.setSession = this.setSession.bind(this);
    this.login = this.login.bind(this);
  }


  userProfile = null;
  expiresIn = 60 * 60 * 24 * 365; // 1 year!
  authenticated = false;



  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((this.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('email', authResult.email);
    localStorage.setItem('name', authResult.name);
    localStorage.setItem('expires_at', expiresAt);
    this.authenticated = true;
  }



  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('expires_at');
 
    this.userProfile = null;
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
    //     this.userProfile = profile;
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
        email: user.email,
        name: user.name,
        idToken: user.id,
      });
      return user.name;

    } catch (error) {
      console.error('login error: ' , error);
      throw error;
    }
  }



}
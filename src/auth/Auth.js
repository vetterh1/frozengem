/* eslint-disable class-methods-use-this */

import * as log from 'loglevel';
// import 'es6-promise/auto';
// import 'isomorphic-fetch';
// import { loglevelServerSend } from '../utils/loglevel-serverSend';
import stringifyOnce from '../utils/stringifyOnce';
import history from '../misc/history';


const logAuth = log.getLogger('logAuth');
// loglevelServerSend(logAuth); // a setLevel() MUST be run AFTER this!
logAuth.setLevel('debug');
logAuth.debug('--> entering Auth.jsx');


export default class Auth {
  constructor() {
    this.getProfile = this.getProfile.bind(this);
  }


  userProfile = null;
  expiresIn = 60 * 60 * 24 * 365; // 1 year!


  login() {
// TODO
//    this.auth0.authorize();
  }


  handleAuthentication() {
// TODO

    // this.auth0.parseHash((err, authResult) => {
    //   if (authResult && authResult.accessToken && authResult.idToken) {
    //     logAuth.debug(stringifyOnce(authResult, null, 2));
    //     this.setSession(authResult);
    //     this.getProfile((err, profile) => {
    //       logAuth.debug(stringifyOnce(profile, null, 2)); 
    //       this.sendProfileToServer(profile);
    //     });
    //     history.replace('/');
    //   } else if (err) {
    //     history.replace('/');
    //     logAuth.error(`Error: ${stringifyOnce(err, null, 2)}. Check the console for further details (authResult=${stringifyOnce(authResult, null, 2)}.`);
    //     alert(`Error: ${err.error}. Check the console for further details.`);
    //     // TODO: better error message to user than alert!
    //   } else {
    //     logAuth.debug(stringifyOnce(authResult, null, 2));
    //   }
    // });
  }



  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((this.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('email', authResult.email);
    localStorage.setItem('name', authResult.name);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    // history.replace('/');
  }



  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');

    this.userProfile = null;
    localStorage.removeItem('user');
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

  sendProfileToServer(profile) {
    logAuth.debug('{ Auth.sendProfileToServer: ', profile);

    // // Call Server to get the user userDbId by giving the authId:
    // fetch('/api/users/addOrUpdateByAuthId', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({user: profile}),
    // })
    // .then(response => response.json())
    // .then((json) => {
    //   logAuth.debug('   json result: ', JSON.stringify(json));
    //   localStorage.setItem('userDbId', json.user.id)
    // })
    // .catch(() => {
    //   logAuth.error('   fetch failed');
    //   localStorage.removeItem('userDbId')
    // });    

    logAuth.debug('} Auth.sendProfileToServer');

  }

}
/* eslint-disable class-methods-use-this */

import * as log from 'loglevel';
import auth0 from 'auth0-js';
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


  auth0 = new auth0.WebAuth({
    domain: 'foodmaniac.eu.auth0.com',
    clientID: 'szRI6GkIh2Fev31kccfMnWLzuR5YsKrx',
    redirectUri: `${window.location.origin}/callback`,
    audience: 'https://foodmaniac.eu.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid profile',
  });

  userProfile = null;



  login() {
    this.auth0.authorize();
  }


  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        logAuth.debug(stringifyOnce(authResult, null, 2));
        this.setSession(authResult);
        this.getProfile((err, profile) => {
          logAuth.debug(stringifyOnce(profile, null, 2)); 
          this.sendProfileToServer(profile);
        });
        history.replace('/');
      } else if (err) {
        history.replace('/');
        logAuth.error(`Error: ${stringifyOnce(err, null, 2)}. Check the console for further details (authResult=${stringifyOnce(authResult, null, 2)}.`);
        alert(`Error: ${err.error}. Check the console for further details.`);
        // TODO: better error message to user than alert!
      } else {
        logAuth.debug(stringifyOnce(authResult, null, 2));
      }
    });
  }


  /*
    Result of log when session ok:
    26/01/2018 à 15:03:11 - debug: {
    "accessToken": "OBzlRDb2TiEcepoY--60hslt999VAwrt",
    "idToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6IlJVWTRRVUpCUVVFMk9UTkZNakZHUWtSQk1VTkJSVFV5UVVRNE1rTkNSamxDTlRaQk5rSkRSQSJ9.eyJuaWNrbmFtZSI6InZldHRlcmgxIiwibmFtZSI6InZldHRlcmgxQHlhaG9vLmZyIiwicGljdHVyZSI6Imh0dHBzOi8vcy5ncmF2YXRhci5jb20vYXZhdGFyL2FlMWEwMWViYjY2OTIyNWRiYWRlMDNkMzIzNGViODE1P3M9NDgwJnI9cGcmZD1odHRwcyUzQSUyRiUyRmNkbi5hdXRoMC5jb20lMkZhdmF0YXJzJTJGdmUucG5nIiwidXBkYXRlZF9hdCI6IjIwMTgtMDEtMjZUMTQ6MDM6MDkuNzYzWiIsImlzcyI6Imh0dHBzOi8vZm9vZG1hbmlhYy5ldS5hdXRoMC5jb20vIiwic3ViIjoiYXV0aDB8NWEyMDBkYzFhOTE2NzYwYTgwYjhiZTZkIiwiYXVkIjoibHpLeUF1TjltdE82cTBJdEZQb3c3d0hCUXNxcWFqM0IiLCJpYXQiOjE1MTY5NzUzODksImV4cCI6MTUxNzAxMTM4OSwiYXRfaGFzaCI6InhNT2YteXR6LTZ2TWtuVHYxek9fM3ciLCJub25jZSI6IlNjZVVzYzBfWFBBVTExZ1E3WGJseGFGOVpkczV3VklpIn0.Lz2o36yjAwQr2DdGoHraeJkdYuvz-RlJobf27HEZS2xk8ixTuqFkdEFPjieolRn7PBCIza2_nXQgkgYUXP2Cm3JqQaMzxt9DCSISlPEZu8qe9-rl534nuJSnrXc3UfirUmrXLax4rxtbh3-n9aHlPbzDHVeCPrOK6zashQV1JdtcU9AnloqKrSfigUbAoK-0i-A0vEYt5jWGDQxp83tcjfglNDesu7QWrDkBAcNZfH2z6Zsb4GvMB1EkjvnoaZkU2d4OmUrOy8S60Cai1gs2bC4L8i2ADKwgiNCocwQNXHfMcx342X735YIUHK5cN-tBtLSt2l-X6AVb8kQuQS4gww",
    "idTokenPayload": {
      "nickname": "vetterh1",
      "name": "vetterh1@yahoo.fr",
      "picture": "https://s.gravatar.com/avatar/ae1a01ebb669225dbade03d3234eb815?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fve.png",
      "updated_at": "2018-01-26T14:03:09.763Z",
      "iss": "https://foodmaniac.eu.auth0.com/",
      "sub": "auth0|5a200dc1a916760a80b8be6d",
      "aud": "lzKyAuN9mtO6q0ItFPow7wHBQsqqaj3B",
      "iat": 1516975389,
      "exp": 1517011389,
      "at_hash": "xMOf-ytz-6vMknTv1zO_3w",
      "nonce": "SceUsc0_XPAU11gQ7XblxaF9Zds5wVIi"
    },
    "appState": null,
    "refreshToken": "(see object with key appState)",
    "state": "DzDYmNatCN62kHKUhz889STEfMr_.Rar",
    "expiresIn": 7200,
    "tokenType": "Bearer",
    "scope": "(see object with key appState)"
  }
*/

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/');
  }



  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
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
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        profile.authId = profile.sub;
        profile.displayedName = profile.given_name || profile.nickname || profile.name;

        localStorage.setItem('user', JSON.stringify(profile));
      }
      callback(err, profile);
    });
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
/* eslint-disable array-callback-return */


import React from "react";
import * as log from 'loglevel';
// import stringifyOnce from '../utils/stringifyOnce.js'
import qs from 'qs';
import axios from 'axios';
import config from '../data/config'


const logUserServices = log.getLogger('logUserServices');
logUserServices.setLevel('debug');
logUserServices.debug('--> entering UserServices.jsx');



export const userService = {
    isAuthenticated,
    setLanguage,
    setNavigationStyle,
    login,
    logout,
    registerToServer,
    loadFromServer, 
    joinHome,
    joinNewHome,
    leaveHome
};


// function login2(username, password) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password })
//     };

//     return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
//         .then(handleResponse)
//         .then(user => {
//             // store user details and jwt token in local storage to keep user logged in between page refreshes
//             localStorage.setItem('user', JSON.stringify(user));

//             return user;
//         });
// }

// function logout2() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('user');
// }


// function register2(user) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user)
//     };

//     return fetch(`${config.apiUrl}/users/register`, requestOptions).then(handleResponse);
// }

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }

















function isAuthenticated() {
  // Super simple & not secure (on client side) method:
  // console.log('isAuthenticated: accessToken = ', localStorage.getItem('accessToken'));
  return localStorage.getItem('accessToken');
}



async function _updateServer (key, value) {
    console.info('|--- SERVER CALL ---|--- POST ---| userServices._updateServer: ', key, value);

    // don't save if not authenticated
    if(!this.isAuthenticated()) return null;

    // Update user on server:
    const data = { 'access_token': this.state.accessToken, [key]: value };
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
      console.error('_updateServer error: ' , error);
    }      
}


async function setLanguage (language) {
    await this._updateServer("language", language);
}

async function setNavigationStyle (navigationStyle) {
  await this._updateServer("navigationStyle", navigationStyle);
}



async function login(email, password) {
  console.info('|--- SERVER CALL ---|--- POST ---| userServices.login: ', email);
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
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;

  } catch (error) {
    console.error('login error: ' , error);
    throw error;
  }
}



function logout() {

  // Clear everything on local storage
  localStorage.clear();

  // navigate to the home route done in <Logout> component
}



async function registerToServer(email, password, name) {
  console.info('|--- SERVER CALL ---|--- POST ---| userServices.registerToServer: ', email);
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
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;

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



async function loadFromServer(token) {
  console.info('|--- SERVER CALL ---|--- GET ---| userServices.loadFromServer');
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
    // this.setState({...response.data, accessToken:token});
    
    return null;

  } catch (error) {
    console.error('loadFromServer error: ' , error);
    throw error;
  }
}





async function joinHome(home) {
  console.info('|--- SERVER CALL ---|--- PUT ---| userServices.joinHome: ', home);
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
    // this.setState({home: home, homeOrder: homeOrder});
    
    return null;

  } catch (error) {
    console.error('register error: ' , error);
    throw error;
  }
}




async function leaveHome() {
  console.info('|--- SERVER CALL ---|--- PUT ---| userServices.leaveHome');
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
    // this.setState({home: home, homeOrder: homeOrder});
    
    return null;

  } catch (error) {
    console.error('register error: ' , error);
    throw error;
  }
}







async function joinNewHome(name, label) {
  console.info('|--- SERVER CALL ---|--- PUT ---| userServices.joinNewHome: ', name);
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
    // this.setState({home: home, homeOrder: homeOrder});
    
    return null;

  } catch (error) {
    console.error('register error: ' , error);
    throw error;
  }
}

// import stringifyOnce from '../utils/stringifyOnce.js'
import qs from 'qs';
import axios from 'axios';
import config from '../data/config'


export const userServices = {
    isAuthenticated,
    setLanguage,
    setNavigationStyle,
    login,
    autologin, 
    logout,
    registerToServer,
    joinHome,
    joinNewHome,
    leaveHome
};


//
//
//
//
//   -------------------- DONE & WORKING -------------------- 
//
//
//
//

function isAuthenticated() {
  // Super simple & not secure (on client side) method:
  // console.log('isAuthenticated: accessToken = ', localStorage.getItem('accessToken'));
  return localStorage.getItem('accessToken');
}


async function _updateServer (key, value) {
    console.info('|--- SERVER CALL ---|--- POST ---| userServices._updateServer: ', key, value);

    // don't save if not authenticated
    if(!isAuthenticated()) return null;

    // Update user on server:
    const data = { 'access_token': localStorage.getItem('accessToken'), [key]: value };
    const options = {
      method: 'PUT',
      url: `${config.boUrl}/users/${localStorage.getItem('id')}`,
      crossdomain : true,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(data),
    };

    try {
      await axios(options);
      return null;
    } catch (error) {
      console.error('_updateServer error: ' , error);
      throw error;
    }      
}



async function setLanguage (language) {
  await _updateServer("language", language);
}


async function setNavigationStyle (navigationStyle) {
  await _updateServer("navigationStyle", navigationStyle);
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
    const {user, items, token} = response.data;
    console.log('login OK: ' , response, user, items, token);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('id', user.id);
    localStorage.setItem('user', JSON.stringify(user));
    // Add token to user
    user.accessToken = token;
    return {user, items};

  } catch (error) {
    console.error('login error: ' , error);
    throw error;
  }
}


// const autologin = () => async (dispatch) => {
async function autologin() {

  console.info('|--- SERVER CALL ---|--- GET ---| userServices.autologin');

  // No token, no autologin!
  const token = localStorage.getItem('accessToken');
  if(!token) throw new Error({ error: "no token!" });

  const params = { 'access_token': token };
  const options = {
    method: 'GET',
    url: `${config.boUrl}/users/me?${qs.stringify(params)}`,
    crossdomain : true,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
  };

  try {
    const response = await axios(options);
    const {user} = response.data;
    console.log('autologin response: ' , response);
    localStorage.setItem('id', user.id);
    localStorage.setItem('user', JSON.stringify(user));
    // Add token to user
    user.accessToken = token;
    return user;
  } catch (error) {
    console.error('autologin error: ' , error);
    throw error;
  }
}




function logout() {

// Clear everything on local storage
localStorage.clear();

// navigate to the home route done in <Logout> component
}




















//
//
//
//
//   -------------------- NOT YET CONVERTED TO REDUX -------------------- 
//
// TODO Convert the methodes below to Redux
//
//



//
// TODO Implement reducer + userServices.register() (below) + check aserActions.register()
//

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
    localStorage.setItem('id', user.id);
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
    const {user} = response.data;
    console.log('Join home response: ' , response);

    // const {home, homeOrder} = user;
    // this.setState({home: home, homeOrder: homeOrder});
    
    return user;

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

    // const {home, homeOrder} = response.data.user;
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
    const {user} = response.data;
    console.log('Join new home response: ' , response);

    // const {home, homeOrder} = user;
    // this.setState({home: home, homeOrder: homeOrder});
    
    return user;

  } catch (error) {
    console.error('register error: ' , error);
    throw error;
  }
}

// import stringifyOnce from "utils/stringifyOnce"
import qs from "qs";
import axios from "axios";
import config from "data/config";

export const userServices = {
  isAuthenticated,
  setLanguage,
  setDensity,
  setNavigationStyle,
  setHelpMessageSeen,
  login,
  autologin,
  logout,
  register,
  joinHome,
  joinNewHome,
  leaveHome
};

function isAuthenticated() {
  // Super simple & not secure (on client side) method:
  // console.debug('isAuthenticated: accessToken = ', localStorage.getItem('accessToken'));
  return localStorage.getItem("accessToken");
}

async function _updateServer(key, value) {
  console.debug(
    "|--- SERVER CALL ---|--- POST ---| userServices._updateServer: ",
    key,
    value
  );

  // don't save if not authenticated
  if (!isAuthenticated()) return null;

  // Update user on server:
  const data = {
    access_token: localStorage.getItem("accessToken"),
    [key]: value
  };
  const options = {
    method: "PUT",
    url: `${config.boUrl}/users/${localStorage.getItem("id")}`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data)
  };

  try {
    await axios(options);
    return null;
  } catch (error) {
    console.error("_updateServer error: ", error);
    throw error;
  }
}

// Save the language passed in parameter in the user record on the server
// Returns: null

async function setLanguage(language) {
  await _updateServer("language", language);
}

// Save the density passed in parameter in the user record on the server
// Returns: null

async function setDensity(density) {
  await _updateServer("density", density);
}

// Save the navigation style passed in parameter in the user record on the server
// Returns: null

async function setNavigationStyle(navigationStyle) {
  await _updateServer("navigationStyle", navigationStyle);
}

// Save the navigation style passed in parameter in the user record on the server
// Returns: null

async function setHelpMessageSeen(helpMessageSeen) {
  await _updateServer("helpMessageSeen", helpMessageSeen);
}

// Retreive the user record from the server
// (and store some essential user info in localStorage for convenience & futur autologin)
// Input: user login information (email, password)
// Returns: user info

async function login(email, password) {
  console.debug(
    "|--- SERVER CALL ---|--- POST ---| userServices.login: ",
    email
  );
  const masterKey = config.masterKey;
  const data = { access_token: masterKey };
  const options = {
    method: "POST",
    url: `${config.boUrl}/auth`,
    auth: {
      username: email,
      password: password
    },
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data)
  };
  // alert(stringifyOnce(options));

  try {
    const response = await axios(options);
    const { user, token } = response.data;
    console.debug("login OK: ", response, user, token);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("id", user.id);
    localStorage.setItem("user", JSON.stringify(user));
    // Add token to user
    user.accessToken = token;
    return user;
  } catch (error) {
    console.error("login error: ", error);
    throw error;
  }
}

// Autologin by retreiving the user record from the server
// (and store some essential user info in localStorage for convenience & futur autologin)
// Input: nothing (uses the access_token from localStorage)
// Returns: user info

async function autologin() {
  console.debug("|--- SERVER CALL ---|--- GET ---| userServices.autologin");

  // No token, no autologin!
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error({ error: "no token!" });

  const params = { access_token: token };
  const options = {
    method: "GET",
    url: `${config.boUrl}/users/me?${qs.stringify(params)}`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" }
  };

  try {
    const response = await axios(options);
    const { user } = response.data;
    console.debug("autologin response: ", response);
    localStorage.setItem("id", user.id);
    localStorage.setItem("user", JSON.stringify(user));
    // Add token to user
    user.accessToken = token;
    return user;
  } catch (error) {
    console.error("autologin error: ", error);
    throw error;
  }
}

// Logout the user by removing all the local storage info (his access_token, his user name,...)
// Input: nothing
// Returns: nothing

function logout() {
  // Clear everything on local storage
  localStorage.clear();

  // navigate to the home route done in <Logout> component
}

// Create a new user record on the server
// (and store some essential user info in localStorage for convenience & futur autologin)
// Input: user information (email, password, name, language)
// Returns: user info

async function register(email, password, name, language) {
  console.debug(
    "|--- SERVER CALL ---|--- POST ---| userServices.register: ",
    email
  );
  const masterKey = config.masterKey;
  const data = { access_token: masterKey, email, password, name, language };
  const options = {
    method: "POST",
    url: `${config.boUrl}/users`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data)
  };

  try {
    const response = await axios(options);
    const { user, token } = response.data;
    console.debug("register OK: ", response, user, token);
    localStorage.setItem("accessToken", token);
    localStorage.setItem("id", user.id);
    localStorage.setItem("user", JSON.stringify(user));
    // Add token to user
    user.accessToken = token;
    return user;
  } catch (error) {
    console.error("register error: ", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("data: ", error.response.data);
      console.error("status: ", error.response.status);
      console.error("headers: ", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error("request: ", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("unknown: ", error.message);
    }

    throw error;
  }
}

// Update the user record on the server by adding it the home information
// Input: home
// Returns: updated user info with home info

async function joinHome(home) {
  console.debug(
    "|--- SERVER CALL ---|--- PUT ---| userServices.joinHome: ",
    home
  );
  const data = { access_token: localStorage.getItem("accessToken"), home };
  const options = {
    method: "PUT",
    url: `${config.boUrl}/users/${localStorage.getItem("id")}/home/join`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data)
  };

  try {
    const response = await axios(options);
    const { user } = response.data;
    console.debug("Join home response: ", response);
    return user;
  } catch (error) {
    console.error("register error: ", error);
    throw error;
  }
}

// Remove the home info from the user record on the server
// Input: nothing
// Returns: updated user info with home info removed

async function leaveHome() {
  console.debug("|--- SERVER CALL ---|--- PUT ---| userServices.leaveHome");
  const data = { access_token: localStorage.getItem("accessToken") };
  const options = {
    method: "PUT",
    url: `${config.boUrl}/users/${localStorage.getItem("id")}/home/leave`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data)
  };

  try {
    const response = await axios(options);
    console.debug("leave home response: ", response);
    return null;
  } catch (error) {
    console.error("register error: ", error);
    throw error;
  }
}

// Update the user record on the server by updating a new home information
// Input: home
// Returns: updated user info with new home info

async function joinNewHome(name, label) {
  console.debug(
    "|--- SERVER CALL ---|--- PUT ---| userServices.joinNewHome: ",
    name
  );
  const data = {
    access_token: localStorage.getItem("accessToken"),
    name,
    label
  };
  const options = {
    method: "PUT",
    url: `${config.boUrl}/users/${localStorage.getItem("id")}/home/new`,
    crossdomain: true,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: qs.stringify(data)
  };

  try {
    const response = await axios(options);
    const { user } = response.data;
    console.debug("Join new home response: ", response);

    // const {home, homeOrder} = user;
    // this.setState({home: home, homeOrder: homeOrder});

    return user;
  } catch (error) {
    console.error("register error: ", error);
    throw error;
  }
}

import * as ACTIONS from "../_constants/action-types";
import { userServices } from "../_services/userServices";
import { characteristicsActions } from "./characteristicsActions";
import { itemsActions } from "./itemsActions";
import { notifierActions } from "./notifierActions";
import { gtmPush } from "../utils/gtmPush";

export const userActions = {
  login,
  autologin,
  logout,
  register,
  joinHome,
  joinNewHome,
  setLanguage,
  setDensity,
  setNavigationStyle,
  setDetailsHelpCompleted
};

function setLanguage(language) {
  return async dispatch => {
    try {
      await userServices.setLanguage(language);
      dispatch({ type: ACTIONS.SET_LANGUAGE, language });

      // Change items language
      dispatch(itemsActions.updateAllItemsUtilityFields());
    } catch (error) {
      console.error("setLanguage failed", language);
    }
  };
}

function setDensity(density) {
  return async dispatch => {
    try {
      await userServices.setDensity(density);
      dispatch({ type: ACTIONS.SET_DENSITY, density });

      // Change items density
      dispatch(itemsActions.updateAllItemsUtilityFields());
    } catch (error) {
      console.error("setDensity failed", density);
    }
  };
}

function setNavigationStyle(navigationStyle) {
  return async dispatch => {
    try {
      await userServices.setNavigationStyle(navigationStyle);
      dispatch({ type: ACTIONS.SET_NAVIGATION_STYLE, navigationStyle });
    } catch (error) {
      console.error("setNavigationStyle failed", navigationStyle);
    }
  };
}

function setDetailsHelpCompleted(detailsHelpCompleted) {
  return async dispatch => {
    try {
      await userServices.setDetailsHelpCompleted(detailsHelpCompleted);
      dispatch({
        type: ACTIONS.SET_DETAILS_HELP_COMPLETED,
        detailsHelpCompleted
      });
    } catch (error) {
      console.error("setDetailsHelpCompleted failed", detailsHelpCompleted);
    }
  };
}

function afterLoginOrRegister(isRegister, user, dispatch, displayNotifier) {
  // Add user info to redux store
  dispatch({ type: ACTIONS.LOGIN_SUCCESS, user });

  // Start fetching the characteristics from the server
  dispatch(characteristicsActions.fetchCharacteristics());

  // Fetch the items from the server and store them in redux store
  dispatch(itemsActions.fetchItems());

  // Success message
  if (displayNotifier) {
    dispatch(
      notifierActions.addIntlNotifier(
        isRegister ? "home.join.success" : "login.success",
        "success"
      )
    );
  }

  // navigate to the home route
  //   history.push('/'); --> does not work, so has to be done in the caller components
  //   ex: <Redirect to='/' /> in loginForm

  return user.name;
}

function login(email, password) {
  return async dispatch => {
    try {
      let user = await userServices.login(email, password);

      gtmPush({
        event: "Login",
        action: "Login",
        value: "Success"
      });

      return afterLoginOrRegister(false, user, dispatch, true);
    } catch (error) {
      console.debug("userActions.login error - email: ", email);

      gtmPush({
        event: "Login",
        action: "Login",
        value: "Error"
      });

      dispatch({ type: ACTIONS.LOGIN_FAILURE, error: error.toString() });

      alert(error.toString())
      // Error message
      const unauthorized = error.response && error.response.status === 401;
      const message = unauthorized ? "login.unauthorized" : "login.error";
      dispatch(notifierActions.addIntlNotifier(message, "error"));
    }
  };
}

function autologin() {
  return dispatch => {
    console.debug(
      "***************** autologin() - should run only once! ***************** "
    );

    userServices.autologin().then(
      user => {
        gtmPush({
          event: "Login",
          action: "Autologin",
          value: "Success"
        });

        return afterLoginOrRegister(false, user, dispatch, false);
      },
      error => {
        // No error message ==> autologin is silent!

        gtmPush({
          event: "Login",
          action: "Autologin",
          value: "Error"
        });
      }
    );
  };
}

/*
    DO NOT USE THE ASYNC VERSION OF AUTOLOGIN
    AS IT'S USED IN APP.JS useEffect

function autologin() {
    return async dispatch => {
        try {
            let user = await userServices.autologin();
            return afterLoginOrRegister(false, user, dispatch);
        } catch (error) {
            // No error message ==> autologin is silent!
        }
    };
}
*/

function logout() {
  userServices.logout();
  return { type: ACTIONS.LOGOUT };
}

function register(email, password, name) {
  return async (dispatch, getState) => {
    try {
      // Get current selected language
      const { language } = getState().user;

      let user = await userServices.register(email, password, name, language);

      // Add user info to redux store
      dispatch({ type: ACTIONS.LOGIN_SUCCESS, user });

      // Success message
      dispatch(notifierActions.addIntlNotifier("register.success", "success"));

      // navigate to the choose home page
      // done in the caller RegisterWizard

      return user;
    } catch (error) {
      // Error message
      let errorKey = "register.error";
      if (error.request && error.response.status === 409)
        errorKey = "register.alreadyexist";
      dispatch(notifierActions.addIntlNotifier(errorKey, "error"));
    }
  };
}

function joinHome(idHome) {
  return async dispatch => {
    try {
      let user = await userServices.joinHome(idHome);
      return afterLoginOrRegister(true, user, dispatch, true);
    } catch (error) {
      dispatch(
        notifierActions.addIntlNotifier(
          error.response.status === 404
            ? "home.join.error_not_found"
            : "home.join.error",
          "error"
        )
      );
    }
  };
}

function joinNewHome(name, label) {
  return async dispatch => {
    try {
      let user = await userServices.joinNewHome(name, label);
      return afterLoginOrRegister(true, user, dispatch, true);
    } catch (error) {
      dispatch(notifierActions.addIntlNotifier("home.join.error", "error"));
    }
  };
}

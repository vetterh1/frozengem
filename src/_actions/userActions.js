import { SET_LANGUAGE, SET_NAVIGATION_STYLE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE  } from "../_constants/action-types";
import { userServices } from '../_services/userServices';
import { notifierActions } from './notifierActions';
import { history } from '../misc/history';

export const userActions = {
    login,
    autologin,
    logout,
    register,
    setLanguage,
    setNavigationStyle,
};


function setLanguage(language) {
  return async dispatch => {

    userServices.setLanguage(language);
    dispatch({ type: SET_LANGUAGE, language });
  };
}

function setNavigationStyle(navigationStyle) {
  return async dispatch => {

    userServices.setNavigationStyle(navigationStyle);
    dispatch({ type: SET_NAVIGATION_STYLE, navigationStyle });
  };
}


function login(email, password) {
    return async dispatch => {
        dispatch({ type: LOGIN_REQUEST });

        userServices.login(email, password)
            .then(
                user => { 
                    dispatch({ type: LOGIN_SUCCESS, user });

                    // Success message
                    dispatch(notifierActions.addIntlNotifier('login.success', 'success'));

                    // navigate to the home route
                    history.push('/');

                    return user.name;
                },
                error => {
                    dispatch({ type: LOGIN_FAILURE, error: error.toString() });

                    // Error message
                    const unauthorized = error.response && error.response.status  === 401; 
                    const message = unauthorized ? 'login.unauthorized' : 'login.error';
                    dispatch(notifierActions.addIntlNotifier(message, 'error'));
                }
            );
    };
}


function autologin() {
    return dispatch => {
        userServices.autologin()
            .then(
                user => { 
                    dispatch({ type: LOGIN_SUCCESS, user });

                    // Success message
                    dispatch(notifierActions.addIntlNotifier('login.success', 'success'));

                    // navigate to the home route
                    history.push('/');

                    return user.name;
                },
                error => {
                    // No error message ==> autologin is silent!
                }
            );
    };
}

function logout() {
    userServices.logout();
    return { type: LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch({ type: REGISTER_REQUEST });

        userServices.register(user)
            .then(
                user => { 
                    dispatch({ type: REGISTER_SUCCESS, user });
                    // history.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch({ type: REGISTER_FAILURE, error: error.toString() });
                }
            );
    };
}

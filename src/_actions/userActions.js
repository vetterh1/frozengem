import { SET_LANGUAGE, SET_NAVIGATION_STYLE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, 
  LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE  } from "../_constants/action-types";
import { userService } from '../_services/userServices';
import { notifierActions } from './notifierActions';
import { history } from '../misc/history';

export const userActions = {
    login,
    logout,
    register,
    setLanguage,
    setNavigationStyle
};


function setLanguage(language) {
  return async dispatch => {

    userService.setLanguage(language);
    dispatch({ type: SET_LANGUAGE, language });
  };
}

function setNavigationStyle(navigationStyle) {
  return async dispatch => {

    userService.setNavigationStyle(navigationStyle);
    dispatch({ type: SET_NAVIGATION_STYLE, navigationStyle });
  };
}


function login(email, password) {
    return async dispatch => {
        dispatch(requestSent());

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));

                    // Success message
                    dispatch(notifierActions.addIntlNotifier('login.success', 'success'));

                    // navigate to the home route
                    history.push('/');

                    return user.name;
                },
                error => {
                    dispatch(failure(error.toString()));

                    // Error message
                    const unauthorized = error.response && error.response.status  === 401; 
                    const message = unauthorized ? 'login.unauthorized' : 'login.error';
                    dispatch(notifierActions.addIntlNotifier(message, 'error'));
                }
            );
    };

    function requestSent() { return { type: LOGIN_REQUEST } }
    function success(user) { return { type: LOGIN_SUCCESS, user } }
    function failure(error) { return { type: LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request());

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    // history.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: REGISTER_REQUEST } }
    function success(user) { return { type: REGISTER_SUCCESS, user } }
    function failure(error) { return { type: REGISTER_FAILURE, error } }
}

import { defineMessages } from "react-intl";

import qs from 'qs';
import axios from 'axios';
import config from '../data/config'


import { SET_LANGUAGE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE  } from "../_constants/action-types";
import { userService } from '../_services/userServices';
// import { alertActions } from './';
// import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    setLanguage,
};


function setLanguage(language) {
  return { type: SET_LANGUAGE, language };
}

function login(email, password) {
    console.log('userActions.login ==> email: ' , email);

    return async dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    // history.push('/');
                    return user.name;
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(email) { return { type: LOGIN_REQUEST } }
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

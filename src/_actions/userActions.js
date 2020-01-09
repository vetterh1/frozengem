import * as ACTIONS from "../_constants/action-types";
import { userServices } from '../_services/userServices';
import { characteristicsActions } from './characteristicsActions';
import { itemsActions } from './itemsActions';
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



function afterLoginOrRegister(isRegister, user, dispatch) {
    
    // Add user info & items to redux store
    dispatch({ type: ACTIONS.LOGIN_SUCCESS, user });

    // Start fetching the characteristics from the server
    dispatch(characteristicsActions.fetchCharacteristics())

    // Start fetching the items from the server
    dispatch(itemsActions.fetchItems())

    // Success message
    dispatch(notifierActions.addIntlNotifier(isRegister ? 'register.success' : 'login.success', 'success'));

    // navigate to the home route
    history.push('/');

    return user.name;
}


function login(email, password) {
    return async dispatch => {
        try {
            let user = await userServices.login(email, password);
            return afterLoginOrRegister(false, user, dispatch);
        } catch (error) {
            console.log("userActions.login error - email: ", email);
            
            dispatch({ type: ACTIONS.LOGIN_FAILURE, error: error.toString() });

            // Error message
            const unauthorized = error.response && error.response.status === 401;
            const message = unauthorized ? 'login.unauthorized' : 'login.error';
            dispatch(notifierActions.addIntlNotifier(message, 'error'));
        }
    };
}
 
function autologin() {
    return dispatch => {
        console.log('autologin() - should run only once!');
        
        userServices.autologin()
            .then(
                user => {
                    return afterLoginOrRegister(false, user, dispatch);
                },
                error => {
                    // No error message ==> autologin is silent!
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





//
// TODO Implement reducer + userServices.register() + check aserActions.register() (below)
//

function register(email, password, name) {
    return async dispatch => {
        try {
            let user = await userServices.register(email, password, name);
            return afterLoginOrRegister(true, user, dispatch);
        } catch (error) {
            // Error message
            let errorKey = 'register.error';
            if (error.request && error.response.status === 409)
              errorKey = 'register.alreadyexist';            
            dispatch(notifierActions.addIntlNotifier(errorKey, 'error'));        }
    };
}    



/*

OLD NON ASYNC AWAIT VERSIONS



//
// TODO Implement reducer + userServices.register() + check aserActions.register() (below)
//

function register(user) {
    return dispatch => {
        dispatch({ type: ACTIONS.REGISTER_REQUEST });

        userServices.register(user)
            .then(
                ({ user, items }) => {
                    // Add user info & items to redux store
                    dispatch({ type: ACTIONS.REGISTER_SUCCESS, user });
                    dispatch({ type: ACTIONS.FETCH_ITEMS_SUCCESS, items });

                    // history.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch({ type: ACTIONS.REGISTER_FAILURE, error: error.toString() });
                }
            );
    };
}
*/

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SET_LANGUAGE, SET_NAVIGATION_STYLE } from "../_constants/action-types";

const initialState = { loggingIn: false, loggedIn: false, language: "en"};

export function user(state = initialState, action) {
  switch (action.type) {

    case LOGIN_REQUEST:
      return {
        loggingIn: true,
        language: state.language,
      };

    case LOGIN_SUCCESS:
      return {
        loggedIn: true,
        ...action.user
      };

    case LOGIN_FAILURE:
      return {
        language: state.language,
      };

    case LOGOUT:
      return {
        language: state.language,
      };

    case SET_LANGUAGE:
        return {
          ...state,
          language: action.language,
        };

    case SET_NAVIGATION_STYLE:
      return {
        ...state,
        navigationStyle: action.navigationStyle,
      };
    
    default:
      return state
  }
}
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from "../_constants/action-types";

const userStoredLocally = JSON.parse(localStorage.getItem('user'));
const language = "en";
const initialState = userStoredLocally ? { loggedIn: true, user: userStoredLocally, language: userStoredLocally.language } : { language };

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
    default:
      return state
  }
}
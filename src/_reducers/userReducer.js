import * as ACTIONS from "../_constants/action-types";

const initialState = { loggedIn: false, language: "en"};

export function user(state = initialState, action) {
  switch (action.type) {


    //
    // Login / register
    //

    case ACTIONS.LOGIN_REQUEST:
      return {
        loggedIn: false,
        language: state.language,
      };

    case ACTIONS.LOGIN_SUCCESS:
      console.log("ACTIONS.LOGIN_SUCCESS - action:", action);
      
      return {
        loggedIn: true,
        ...action.user,
        language: action.user.language,
      };

    case ACTIONS.LOGIN_FAILURE:
      return {
        loggedIn: false,
        language: state.language,
      };

    case ACTIONS.LOGOUT:
      return {
        loggedIn: false,
        language: state.language,
      };



    //
    // Misc user actions
    //

    case ACTIONS.SET_LANGUAGE:
        return {
          ...state,
          language: action.language,
        };

    case ACTIONS.SET_NAVIGATION_STYLE:
      return {
        ...state,
        navigationStyle: action.navigationStyle,
      };
    
    default:
      return state
  }
}
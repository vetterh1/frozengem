import * as ACTIONS from "../_constants/action-types";

const initialState = { loggingIn: false, loggedIn: false, language: "en"};

export function user(state = initialState, action) {
  switch (action.type) {


    //
    // Login
    //

    case ACTIONS.LOGIN_REQUEST:
      return {
        loggingIn: true,
        loggedIn: false,
        language: state.language,
      };

    case ACTIONS.LOGIN_SUCCESS:
      console.log("ACTIONS.LOGIN_SUCCESS - action:", action);
      
      return {
        loggingIn: false,
        loggedIn: true,
        ...action.user,
        language: action.user.language,
      };

    case ACTIONS.LOGIN_FAILURE:
      return {
        loggingIn: true,
        loggedIn: false,
        language: state.language,
      };

    case ACTIONS.LOGOUT:
      return {
        loggingIn: false,
        loggedIn: false,
        language: state.language,
      };


    //
    // Register
    //

    //
    // TODO Implement reducer (below) + userServices.register() + check aserActions.register()
    //


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
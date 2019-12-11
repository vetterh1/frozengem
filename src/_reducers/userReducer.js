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
        language: state.language,
      };

    case ACTIONS.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        ...action.user
      };

    case ACTIONS.LOGIN_FAILURE:
      return {
        language: state.language,
      };

    case ACTIONS.LOGOUT:
      return {
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
import * as ACTIONS from "_constants/action-types";

const initialState = {
  loggedIn: false,
  language: "en",
  density: 2,
  helpMessageSeen: false,
  showHelpDetails: false
};

export function user(state = initialState, action) {
  switch (action.type) {
    //
    // Login / register
    //

    case ACTIONS.LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: false,
        language: state.language
      };

    case ACTIONS.LOGIN_SUCCESS:
      console.debug("ACTIONS.LOGIN_SUCCESS - action:", action);

      return {
        ...state,
        loggedIn: true,
        ...action.user,
        language: action.user.language
      };

    case ACTIONS.LOGIN_FAILURE:
      return {
        ...state,
        loggedIn: false,
        language: state.language
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        loggedIn: false,
        language: state.language
      };

    //
    // Misc user actions
    //

    case ACTIONS.SET_LANGUAGE:
      return {
        ...state,
        language: action.language
      };

    case ACTIONS.SET_DENSITY:
      return {
        ...state,
        density: action.density
      };
  
    case ACTIONS.SET_NAVIGATION_STYLE:
      return {
        ...state,
        navigationStyle: action.navigationStyle
      };

    case ACTIONS.SET_HELP_MESSAGE_SEEN:
      return {
        ...state,
        helpMessageSeen: action.helpMessageSeen
      };

    case ACTIONS.SET_SHOW_HELP_DETAILS:
      return {
        ...state,
        showHelpDetails: action.showHelpDetails
      };
  
    default:
      return state;
  }
}

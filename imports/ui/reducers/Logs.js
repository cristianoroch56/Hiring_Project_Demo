import {
  NAV_CLICKED,
  HOMEPAGE_VISITED,
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  SUBMITTING_FORM,
  COMMENT_VIEWED
} from "../constants/ActionTypes";

const INIT_STATE = {
  url: null,
  navClicked: "0",
  homepageVisited: "0",
  user: null,
  loggedIn: "0",
  loggedOut: "0",
  submittingForm: "0",
  commentViewed: "0",
  document: null
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case NAV_CLICKED: {
      return {
        ...state,
        url: action.payload,
        navClicked: String(Number(state.navClicked) + 1)
      }
    }
    case HOMEPAGE_VISITED: {
      return {
        ...state,
        homepageVisited: String(Number(state.homepageVisited) + 1)
      }
    }
    case USER_LOGGED_IN: {
      return {
        ...state,
        loggedIn: String(Number(state.loggedIn) + 1),
        user: action.payload
      }
    }
    case USER_LOGGED_OUT: {
      return {
        ...state,
        loggedOut: String(Number(state.loggedOut) + 1),
        user: action.payload
      }
    }
    case SUBMITTING_FORM: {
      return {
        ...state,
        submittingForm: String(Number(state.submittingForm) + 1),
      }
    }
    case COMMENT_VIEWED: {
      return {
        ...state,
        commentViewed: String(Number(state.commentViewed) + 1),
        document: action.payload
      }
    }
    default:
      return {
        ...state
      };
  }
}

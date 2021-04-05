import {
  REGISTER_SUCCESS,
  SIGNIN_SUCCESS,
  SIGNOUT_SUCCESS,
  FETCH_USER,
} from "../constants/ActionTypes";

const INIT_STATE = {
  authUser: Meteor.user(),
  userId: Meteor.userId()
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS: {
      return {
        ...state,
        authUser: {},
        userId: null
      }
    }
    case SIGNIN_SUCCESS: {
      return {
        ...state,
        authUser: Meteor.user() || {},
        userId: Meteor.userId()
      }
    }
    case SIGNOUT_SUCCESS: {
      return {
        ...state,
        authUser: {},
        userId: null
      }
    }
    case FETCH_USER: {
      return {
        ...state,
        authUser: Meteor.user() || {},
        userId: Meteor.userId()
      }
    }
    default:
      return {
        ...state,
        authUser: Meteor.user() || {},
        userId: Meteor.userId()
      };
  }
}

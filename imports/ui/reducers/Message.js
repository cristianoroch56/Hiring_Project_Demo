import {
  MESSAGE_DELETED
} from "../constants/ActionTypes";

const INIT_STATE = {
  deleted: "0",
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case MESSAGE_DELETED: {
      return {
        deleted: Number(state.deleted) === 10 ? "0" : String(state.deleted + 1)
      }
    }
    default:
      return {
        ...state
      };
  }
}

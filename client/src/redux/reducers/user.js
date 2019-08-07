import {
  CURRENT_USER,
  SET_AUTHORIZATION,
  SET_INVITE_NOTIFICATION
} from "../types";

const initState = {
  currentUser: null,
  isAuthorized: false,
  inviteNotification: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case SET_AUTHORIZATION:
      return {
        ...state,
        isAuthorized: action.payload
      };
    case SET_INVITE_NOTIFICATION:
      return {
        ...state,
        inviteNotification: action.payload
      };
    default:
      return state;
  }
};

import {
  CURRENT_USER,
  SET_AUTHORIZATION,
  SET_INVITE_NOTIFICATION,
  SET_IS_ONLINE
} from "../types";

const initState = {
  currentUser: null,
  isAuthorized: false,
  inviteNotification: []
  // isOnline: []
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
    // case SET_IS_ONLINE:
    //   return {
    //     ...state,
    //     isOnline: action.payload.map(val => val)
    //   };
    default:
      return state;
  }
};

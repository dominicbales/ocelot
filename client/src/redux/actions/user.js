import {
  CURRENT_USER,
  SET_AUTHORIZATION,
  SET_INVITE_NOTIFICATION,
  SET_IS_ONLINE
} from "../types";
import axios from "axios";
import decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { localURL } from "../../../api";

export const setUser = data => ({
  type: CURRENT_USER,
  payload: data
});

export const setAuthorization = data => {
  return {
    type: SET_AUTHORIZATION,
    payload: data
  };
};

export const setInviteNotification = data => {
  return {
    type: SET_INVITE_NOTIFICATION,
    payload: data
  };
};

// export const setIsOnline = data => {
//   console.log("inside set online action");
//   return {
//     type: SET_IS_ONLINE,
//     payload: data
//   };
// };

export const fetchUserInviteNotification = userId => async dispatch => {
  const result = await axios.get(
    `${localURL}api/user/invite/user/${userId}/notification`
  );
  dispatch(setInviteNotification(result.data));
};

export const signin = data => async dispatch => {
  const result = await axios.post(`${localURL}api/user/login`, data);
  // Save to localstorage
  const { token } = result.data;
  // Set token to localstorage
  localStorage.setItem("jwtToken", token);
  // Set token to Auth header
  setAuthToken(token);
  //Decode token to get user data
  const decoded = decode(token);
  // console.log("decode:", decoded);
  //Set current user
  dispatch(setUser(decoded));
};

//Log user out
export const signout = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem("jwtToken");
  //Remove auth header for future request
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setUser(null));
  dispatch(setAuthorization(false));
};

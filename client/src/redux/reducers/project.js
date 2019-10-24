import {
  SET_PROJECTS,
  SET_ACTIVE_PROJECT,
  SET_PROJECT_BOARDS,
  SET_IS_ONLINE,
  CLEAR_PROJECT_STATE
} from "../types";

const initState = {
  projects: [],
  activeProject: null,
  isOnline: [],
  boards: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };
    case SET_ACTIVE_PROJECT:
      return {
        ...state,
        activeProject: action.payload
      };
    case SET_PROJECT_BOARDS:
      return {
        ...state,
        boards: [...action.payload]
      };
    case SET_IS_ONLINE:
      return {
        ...state,
        isOnline: action.payload.map(val => val)
      };
    case CLEAR_PROJECT_STATE:
      return {
        ...initState
      };
    default:
      return state;
  }
};

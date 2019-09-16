import { SET_PROJECTS, SET_ACTIVE_PROJECT, SET_PROJECT_BOARDS } from "../types";

const initState = {
  projects: [],
  activeProject: {},
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
    default:
      return state;
  }
};

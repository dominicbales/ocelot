import { SET_ISSUES, SET_ISSUE, SET_ISSUE_COMMENTS } from "../types";

const initState = {
  issues: [],
  issue: [],
  issueComments: []
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_ISSUES:
      return {
        ...state,
        issues: action.payload
      };
    case SET_ISSUE:
      return {
        ...state,
        issue: action.payload
      };
    case SET_ISSUE_COMMENTS:
      return {
        ...state,
        issueComments: action.payload
      };
    default:
      return state;
  }
};

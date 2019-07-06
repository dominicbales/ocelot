import { SET_ISSUES, SET_ISSUE, SET_ISSUE_COMMENTS } from "../types";
import axios from "axios";
import { localURL } from "../../../api";

export const setIssues = data => ({
  type: SET_ISSUES,
  payload: data
});

export const setIssue = data => ({
  type: SET_ISSUE,
  payload: data
});

export const setIssueComments = data => ({
  type: SET_ISSUE_COMMENTS,
  payload: data
});

export const fetchIssues = (projectID, pageNum) => async dispatch => {
  try {
    const result = await axios.get(
      `${localURL}api/issues/${projectID}?page=${pageNum}`
    );
    dispatch(setIssues(result.data));
  } catch (err) {
    console.log("Error fetching project:", err);
  }
};

export const fetchIssue = issueId => async dispatch => {
  try {
    const result = await axios.get(`${localURL}api/issues/issue/${issueId}`);
    dispatch(setIssue(result.data));
  } catch (err) {
    console.log("couldnt fetch Issue");
  }
};

export const fetchIssueComments = issueId => async dispatch => {
  try {
    let comment = await axios.get(`${localURL}api/issues/comment/${issueId}`);
    dispatch(setIssueComments(comment.data));
  } catch (err) {
    console.log("couldnt fetch Issue Comments");
  }
};

export const addIssue = (projectID, data) => async dispatch => {
  await axios.post(`${localURL}api/issues/${projectID}`, data);
};

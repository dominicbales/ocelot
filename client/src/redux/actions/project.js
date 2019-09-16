import { SET_PROJECTS, SET_ACTIVE_PROJECT, SET_PROJECT_BOARDS } from "../types";
import axios from "axios";
import { localURL } from "../../../api";

export const setProjects = data => ({
  type: SET_PROJECTS,
  payload: data
});

export const setActiveProject = data => ({
  type: SET_ACTIVE_PROJECT,
  payload: data
});

export const setProjectBoards = data => ({
  type: SET_PROJECT_BOARDS,
  payload: data
});

export const fetchProjectBoards = projectId => async dispatch => {
  console.log("inside fetch board:", projectId);
  const result = await axios.get(`${localURL}api/boards/project/${projectId}`);
  console.log("resut in fetch board action:", result);
  dispatch(setProjectBoards(result.data));
};

// Fetch multiple project by ownership
export const fetchProjectsByOwnership = id => async dispatch => {
  const result = await axios.get(`${localURL}api/projects/${id}`);
  dispatch(setProjects(result.data));
  // auto sets activeproject, remove when no longer needed
  // dispatch(setActiveProject(result.data[0]))
};

//Fetch multiple projects by user array
export const fetchProjectsByUserArray = id => async dispatch => {
  const result = await axios.get(`${localURL}api/projects/by/user/${id}`);
  dispatch(setProjects(result.data));
};

// fetch one project
export const fetchProject = id => async dispatch => {
  try {
    const result = await axios.get(`${localURL}api/projects/project/${id}`);
    dispatch(setActiveProject(result.data));
  } catch (err) {
    console.log("Error fetching project:", err);
  }
};

export const addProjects = (id, data) => async dispatch => {
  await axios.post(`${localURL}api/projects/${id}`, data);
};

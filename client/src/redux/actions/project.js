import {SET_PROJECTS,SET_ACTIVE_PROJECT} from '../types';
import axios from 'axios';
import {localURL} from '../../../api'

export const setProjects = (data) => ({
    type: SET_PROJECTS,
    payload: data
    
});

export const setActiveProject = (data) => ({
    type: SET_ACTIVE_PROJECT,
    payload: data
})

// Fetch multiple project
export const fetchProjects =  (id) => async (dispatch) => {
    const result = await axios.get(`${localURL}api/projects/${id}`);
    dispatch(setProjects(result.data))
    // auto sets activeproject, remove when no longer needed
    dispatch(setActiveProject(result.data[0]))
}

// fetch one project
export const fetchProject = (id) => async (dispatch) => {
    try {
        const result = await axios.get(`${localURL}api/projects/project/${id}`);
        dispatch(setActiveProject(result.data))
    } catch(err) {
        console.log('Error fetching project:', err)
    }
}

export const addProjects = (id, data) => async (dispatch) => {
    await axios.post(`${localURL}api/projects/${id}`, data)
}
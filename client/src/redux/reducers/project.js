import {SET_PROJECTS, SET_ACTIVE_PROJECT} from '../types';

const initState = {
    projects: [],
    activeProject: {}
}

export default (state = initState, action) => {
    switch(action.type) {
        case SET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case SET_ACTIVE_PROJECT:
            return {
                ...state,
                activeProject: action.payload
            }
        default:
            return state;
    }
}
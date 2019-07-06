import {CURRENT_USER, SET_AUTHORIZATION} from '../types';

const initState = {
    currentUser: null,
    isAuthorized: false
};

export default (state = initState, action) => {
    switch(action.type) {
        case CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case SET_AUTHORIZATION:
            return {
                ...state,
                isAuthorized: action.payload
            }
        default:
            return state;
    }
}
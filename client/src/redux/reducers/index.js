import { combineReducers } from 'redux';
import User from './user';
import Project from './project'
import Issue from './issue'

const rootReducer = combineReducers({
    User,
    Project,
    Issue
});

export default rootReducer;
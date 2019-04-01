import { combineReducers } from 'redux';
import authedUser from './authedUser';
import tweets from './tweets';
import users from './users';

// we need to do this because the createStore function only accepts a single reducer
export default combineReducers({ authedUser, tweets, users });
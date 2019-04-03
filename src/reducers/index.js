import { combineReducers } from 'redux';
import authedUser from './authedUser';
import tweets from './tweets';
import users from './users';
import { loadingBarReducer } from 'react-redux-loading';

// we need to do this because the createStore function only accepts a single reducer
export default combineReducers({ authedUser, tweets, users, loadingBar: loadingBarReducer });
// we are also adding our loading bar reducer, to allow us to manipulate our loading
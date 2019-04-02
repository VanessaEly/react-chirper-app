import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import logger from './logger';

// since the handleInitialData() action creator in src/actions/shared.js returns a function,
// we'll need to install the react-thunk package

// It’s important to note that the value of the next parameter will be determined by the applyMiddleware function.
// All middleware will be called in the order it is listed in that function.
// In our case, the next will be dispatch because logger is the last middleware listed in that function.
export default applyMiddleware(thunk, logger); // adding middlewares

// const thunk = store => next => action => {
//     // if we call dispatch using a function (like API promises) istead of an object
//     if (typeof action === 'function') return action(store.dispatch);
//     return next(action);
// }


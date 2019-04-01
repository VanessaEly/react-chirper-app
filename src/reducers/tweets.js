// A Reducer describes how an application's state changes. You’ll often see the Object Spread Operator (...)
// used inside of a reducer because a reducer must return a new object instead of mutating the old state.

// Reducers have the following signature: (previousState, action) => newState
import { RECEIVE_TWEETS } from '../actions/tweets';

// Default state is set to an empty object
export default function tweets(state = {}, action) {
    switch(action.type) {
        case RECEIVE_TWEETS :
            // returning the current state merged with the tweets of our action
            return { ...state, ...action.tweets };
        default :
            return state;
    }
};
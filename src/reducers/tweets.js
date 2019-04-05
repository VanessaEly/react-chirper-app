// A Reducer describes how an application's state changes. You’ll often see the Object Spread Operator (...)
// used inside of a reducer because a reducer must return a new object instead of mutating the old state.
// Each reducer slices its own part of state

// Reducers have the following signature: (previousState, action) => newState
import { RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets';

// Default state is set to an empty object
export default function tweets(state = {}, action) {
    switch(action.type) {
        case RECEIVE_TWEETS :
            // returning the current state merged with the tweets of our action
            return { ...state, ...action.tweets };
        case TOGGLE_TWEET :
            // spread all the previous tweets on the new object
            return {
                // keep the old state (spread all properties)
                ...state,
                // but change only the toggled tweet object
                [action.id]: {
                    //  keep the toggled tweet state
                    ...state[action.id],
                    // but change only the likes array
                    likes: action.hasLiked === true
                        // returning the likes list with all ids except the authedUser
                        ? state[action.id].likes.filter(likerId => likerId !== action.authedUser)
                        // returning the likes list plus the authedUser
                        : state[action.id].likes.concat([action.authedUser]),
                }
            };
        default :
            return state;
    }
};
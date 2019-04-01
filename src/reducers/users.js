import { RECEIVE_USERS } from '../actions/users';

// Default state is set to an empty object
export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS :
            // returning the current state merged with the users of our action
            return { ...state, ...action.users };
        default :
            return state;
    }
};
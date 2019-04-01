import { SET_AUTHED_USER } from '../actions/authedUser';

// Default state is set to null
export default function authedUser (state = null, action) {
    switch(action.type) {
        case SET_AUTHED_USER :
            // returning the id that was passed to the action
            return action.id;
        default :
            return state;
    }
};
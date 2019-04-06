import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveTweets } from './tweets';
import { setAuthedUser } from './authedUser';
// loading action creators that can be imported by redux loading component
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = 'tylermcginnis';

export const handleInitialData = () => {
    return (dispatch) => {
        // starting loading
        dispatch(showLoading());
        getInitialData().then(({ users, tweets }) => {
            // saving data received into the store. Dispatch receives an action and is handled by the reducer
            dispatch(receiveUsers(users));
            dispatch(receiveTweets(tweets));
            dispatch(setAuthedUser(AUTHED_ID));
            // ending loading
            dispatch(hideLoading());
        });
    }
};
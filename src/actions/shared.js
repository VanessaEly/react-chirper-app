import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveTweets } from './tweets';
import { setAuthedUser } from './authedUser';

const AUTHED_ID = 'tylermcginnis';

export const handleInitialData = () => {
    return (dispatch) => {
        getInitialData().then(({ users, tweets }) => {
            // saving data received into the store. Dispatch receives an action and is handled by the reducer
            dispatch(receiveUsers(users));
            dispatch(receiveTweets(tweets));
            dispatch(setAuthedUser(AUTHED_ID));
        });
    }
};
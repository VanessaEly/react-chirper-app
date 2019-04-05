import { saveLikeToggle } from '../utils/api';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

// Actions are plain JavaScript objects. Actions must have a type property that indicates
// the type of action being performed. Types should typically be defined as string constants.
// Action functions return an action object which will be handled by the reducer
export const receiveTweets = (tweets) => {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    };
};

const toggleTweet = ({ id, authedUser, hasLiked }) => {
    return {
        type: TOGGLE_TWEET,
        id,
        authedUser,
        hasLiked,
    };
};

// returning a function action to be dispatched, instead of a simple object (possible due to react-thunk)
export const handleToggleTweet = (info) => {
    return dispatch => {
        // Optimistic update practice being used, to improve the user's experience
        // first we update the store, and if something goes wrong we update it back
        dispatch(toggleTweet(info));
        return saveLikeToggle(info).catch((err) => {
            console.warn('Error in handleToggleTweet: ', err);
            dispatch(toggleTweet(info));
            alert('There was an error liking the tweet, please try again.');
        });
    };
}
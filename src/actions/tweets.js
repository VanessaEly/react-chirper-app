import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

// Actions are plain JavaScript objects. Actions must have a type property that indicates
// the type of action being performed. Types should typically be defined as string constants.
// Action functions return an action object which will be handled by the reducer
export const receiveTweets = (tweets) => {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    };
};

export const addTweet = (tweet) => {
    return {
        type: ADD_TWEET,
        tweet,
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

export const handleAddTweet = (text, replyingTo) => {
    // getState can be used to get the current state of our store
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        // calling API's saveTweet
        return saveTweet({
            text,
            author: authedUser,
            replyingTo,
        }) // if success, dispatch the addTweet action using the returned tweet and hide the loading
        .then(tweet => dispatch(addTweet(tweet)))
        .then(() => dispatch(hideLoading()));
    };
}

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
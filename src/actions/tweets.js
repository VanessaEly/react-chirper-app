export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';

// Actions are plain JavaScript objects. Actions must have a type property that indicates
// the type of action being performed. Types should typically be defined as string constants.
// Action functions return an action object which will be handled by the reducer
export const receiveTweets = (tweets) => {
    return {
        type: RECEIVE_TWEETS,
        tweets,
    };
};
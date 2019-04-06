import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti/index';
import { handleToggleTweet } from '../actions/tweets';
import { Link, withRouter } from 'react-router-dom'; 

class Tweet extends Component {
  // function used to redirect to parent Tweet
  toParent = (e, id) => {
    e.preventDefault();
    // we are able to use this because of react-router-dom's withRouter function.
    this.props.history.push(`/tweet/${id}`);
  }
  handleLike = (e, id) => {
    e.preventDefault();
    const { dispatch, tweet, authedUser } = this.props;
    // calling a function action (which handles external calls). This is possible due to react-thunk.
    // When ready, this action will call the action that returns an object and really triggers the reducer
    dispatch(handleToggleTweet({ id: tweet.id, hasLiked: tweet.hasLiked, authedUser }));
  }

  render() {
    const { tweet } = this.props;

    if (tweet === null) return <div className="tweet">This tweet doesn't exist.</div>

    // decomposing the tweet variable into multiple variables
    const { name, avatar, timestamp, text, hasLiked, likes, replies, parent, id } = tweet;

    return (
      <Link to={`/tweet/${id}`} className='tweet'>
        <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
        <div className='tweet-info'>
            <div>
                <span>{name}</span>
                <div>{formatDate(timestamp)}</div>
                {parent && (
                    <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                        Replying to @{parent.author}
                    </button>
                )}
                <p>{text}</p>
            </div>
            <div className='tweet-icons'>
                <TiArrowBackOutline className='tweet-icon' />
                <span>
                    {// only show number of replies if its not 0
                        replies !== 0 && replies
                    }
                </span>
                <button className='heart-button' onClick={this.handleLike}>
                    {// if its liked, show red heart, else show oulined heart
                        hasLiked === true
                        ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                        : <TiHeartOutline className='tweet-icon' />
                    }
                </button>
                <span>
                    {// only show number of likes if its not 0
                        likes !== 0 && likes
                    }
                </span>
            </div>
        </div>
      </Link>
    )
  }
}

// mapStateToProps is called whenever the store is updated
// mapStateToProps(state, [ownProps]), id is actually a component prop
// setting the information we want to pass from the state of our redux store into our tweet component
function mapStateToProps({ authedUser, users, tweets }, { id }) {
    // getting the actual tweet
    const tweet = tweets[id];
    // if there's a tweet, getting parent tweet (checking if the tweet is a response to another tweet)
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
    return {
        authedUser, // we need the authedUser to know which user is doing actions like responding or liking a tweet
        // if there's a tweet, format the tweet, else return null
        tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) : null,
    };
};

// pass all router props to our connected tweet component
export default withRouter(connect(mapStateToProps)(Tweet));
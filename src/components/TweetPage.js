import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';
import NewTweet from './NewTweet';

class TweetPage extends Component {
  render() {
    const { id, replies } = this.props;
    return (
      <div>
        <Tweet id={id} />
        <NewTweet id={id} />
        {replies.length !== 0 && <h3 className='center'>Replies</h3>}
        <ul>
          {replies.map((replyId) => (
            <li key={replyId}>
              <Tweet id={replyId}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

// Mapping which properties we need from our store state
const mapStateToProps = ({ authedUser, tweets, users}, props) => {
    const { id } = props.match.params;

    return {
        id,
        // we need to show all the replies to that tweet
        replies: !tweets[id] ? [] : tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp),
    }
};

// Transforming this component into a connected component, because now it has acces to our store state using the 
// connect function
export default connect(mapStateToProps)(TweetPage);
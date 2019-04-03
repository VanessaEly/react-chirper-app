import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';

class Dashboard extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3 className='center'>Your Timeline</h3>
        <ul className='dashboard-list'>
            {// looping through all tweetIds that were returned by our mapStateToProps function
            }
            {this.props.tweetIds.map((id) => (
                <li key={id}>
                    <Tweet id={id}></Tweet>
                </li>
            ))}
        </ul>
      </div>
    );
  };
};

// mapStateToProps - If this argument is specified, the new component will subscribe to Redux store updates.
// This means that any time the store is updated, mapStateToProps will be called. The results of mapStateToProps
// must be a plain object, which will be merged into the component’s props. If you don't want to subscribe to store updates,
// pass null or undefined in place of mapStateToProps.
// mapStateToProps(state, [ownProps])
function mapStateToProps ({ tweets }) {
    // adding tweetids to the state that we are interested into
    return {
        // getting all tweet ids and sorting them by timestamp
        tweetIds: Object.keys(tweets).sort((a, b) => tweets[b].timestamp - tweets[a].timestamp),
    };
};

export default connect(mapStateToProps)(Dashboard);
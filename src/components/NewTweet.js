import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';
import { Redirect } from 'react-router-dom';

class NewTweet extends Component {
  state = {
    text: '',
  };
  handleChange = (e) => {
    const text = e.target.value;
    // updating component state instead of redux state because it doesn't need to be shared
    this.setState(() => ({
      text,
      toHome: false,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault(); // to avoid reload
    const { text } = this.state;
    // receiving the dispatch method, which is given to this class using react-redux connect method
    const { dispatch, id } = this.props;
    // add tweet to the store
    // We communicate with the store by dispatching actions. dispatch is a method on the store.
    // That means that the New Tweet Component needs to be connect()ed to Redux.
    // Once a component is connected to the store,it will have dispatch on its props.
    dispatch(handleAddTweet(text, id));
    // set state receives a function that needs to return and object with the changes that will be made into the store
    // In this case, we are setting the text content to ''
    this.setState(() => ({
      text: '',
      // if an id was passed (we are on the replies page and not in the new tweet page), we won't go to the home page
      toHome: id ? false : true,
    }));
  };
  render() {
    const { text, toHome } = this.state;

    if (toHome === true) return <Redirect to='/' />
    
    const tweetLeft = 280 - text.length;
    
    return (
      <div>
        <h3 className='center'>Compose new Tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280} />
          {tweetLeft <= 100 && (
            <div className='tweet-lenght'>
              {tweetLeft}
            </div>
          )}
          <button type='submit' className='btn' disabled={text === ''}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

// connect gives us access to dispatch method
export default connect()(NewTweet);
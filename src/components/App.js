import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route }from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Dashboard from './Dashboard';
import NewTweet from './NewTweet';
import TweetPage from './TweetPage';
// loading component being added, we need to add it inside our app render method so it can be used by our whole app
import LoadingBar from 'react-redux-loading';
import Nav from './Nav';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  };

  render() {
    return (
      <Router>
        {
          // Fragment allows us to pass a single child to the router element (which is required, as it is in the render
          // method, without needing to create an extra div in our DOM)
        }
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            { // only load the dashboard if the loading property is true
              this.props.loading
                ? null
                : <div>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/tweet/:id' component={TweetPage} />
                    <Route path='/new' component={NewTweet} />
                  </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

// This function is used to make sure that we won't render the UI while authedUser variable isn't filled
function mapStateToProps ({ authedUser}) {
  return {
    loading: authedUser === null,
  }
};

// Using the connect() function upgrades a component to a container.
// Containers can read state from the store and dispatch actions.
// in order to have access to dispatch, we need to connect our app.
// Since we don't need anything from the state, we can leave the first invocation empty
export default connect(mapStateToProps)(App)

// connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

// mapDispatchToProps - If an object is passed, each function inside it is assumed to be a Redux action creator.
// An object with the same function names, but with every action creator wrapped into a dispatch call so they may
// be invoked directly, will be merged into the component’s props. If a function is passed, it will be given dispatch
// as the first parameter. It’s up to you to return an object that somehow uses dispatch to bind action creators
// in your own way. (Tip: you may use the bindActionCreators() helper from Redux.)
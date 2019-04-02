import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  };

  render() {
    return (
      <div>
        Starter Code
      </div>
    )
  }
}

// Using the connect() function upgrades a component to a container.
// Containers can read state from the store and dispatch actions.
// in order to have access to dispatch, we need to connect our app.
// Since we don't need anything from the state, we can leave the first invocation empty
export default connect()(App)
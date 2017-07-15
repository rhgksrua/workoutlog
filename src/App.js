import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './reset.css';
import './App.css';
import Exercise from './components/exercise/Exercise';
import Date from './components/date/Date';
import AddExerciseButton from './components/exercise/AddExerciseButton';
import Navigation from './components/nav/Navigation';

import { connect } from 'react-redux';
import { authUserFetch, logOut } from './actions/userActions';

import Home from './Home';
import UserPage from './components/user/UserPage';

class App extends Component {
  componentDidMount() {
    // fetch user data using json token
    this.props.authUser();
  }
  render() {
    const { username, logOut } = this.props;
    return (
      <div className="App">
        <Navigation username={username} logOut={logOut}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:username" component={UserPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { user: { username } } = state;
  return { username };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authUser: function() {
      dispatch(authUserFetch());
    },
    logOut: function() {
      dispatch(logOut());
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

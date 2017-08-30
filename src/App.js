import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { authUserFetch, logOut } from './actions/userActions';

//import './reset.css';
import './App.css';

import Navigation from './components/nav/Navigation';
import Home from './Home';
import Summary from './components/exercise/Summary';
import AddExercise from './components/exercise/AddExercise';
import ExerciseSummary from './components/exercise/ExerciseSummary';
import SignUp from './SignUp';
import OwnerRoute from './components/routing/OwnerRoute';

export class App extends Component {
  render() {
    const {
      username,
      logOut,
      authUser
    } = this.props;
    return (
      <div className="container">
        <Navigation username={username} logOut={logOut} authUser={authUser}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/signup" component={SignUp} />
          <OwnerRoute path="/:username/add" component={AddExercise} />
          <OwnerRoute
            path="/:username/:muscle/:exercise"
            component={ExerciseSummary}
          />
          <OwnerRoute path="/:username" component={Summary} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  username: PropTypes.string,
  logOut: PropTypes.func
};

const mapStateToProps = (state, props) => {
  const {
    user: {
      username
    }
  } = state;
  return { username };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authUser: function(currentPath) {
      dispatch(authUserFetch(currentPath));
    },
    logOut: function() {
      dispatch(logOut());
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

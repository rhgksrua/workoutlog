import React, { Component } from 'react';
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

class App extends Component {
  componentDidMount() {
    // fetch user data using json token
    // does not check for path
    //this.props.authUser();
  }
  render() {
    const { username, logOut } = this.props;
    return (
      <div className="container">
        <Navigation username={username} logOut={logOut}/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/:username/add" component={AddExercise} />
          {/* <RerouteOther path="/:username/:muscle/:exercise" component={ExerciseSummary} /> */}
          <Route path="/:username/:muscle/:exercise" component={ExerciseSummary} />
          {/* <Route path="/:username/summary" component={ExerciseSummary} /> */}
          <Route path="/:username" component={Summary} />
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
    authUser: function(currentPath) {
      dispatch(authUserFetch(currentPath));
    },
    logOut: function() {
      dispatch(logOut());
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

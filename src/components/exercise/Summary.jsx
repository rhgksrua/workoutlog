import React, { Component } from 'react';
import { connect } from 'react-redux';

import Exercises from '../exercise/Exercises';
import Exercise from '../exercise/Exercise';

import { authUserFetch } from '../../actions/userActions';

class Summary extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const currentPath = this.props.match.params.username;
    this.props.authUser(currentPath);
  }
  componentDidUpdate() {
    const currentPath = this.props.match.params.username;
    this.props.authUser(currentPath);
  }
  render() {
    console.log(this.props.exercises);
    const { exercises: { allExercises } } = this.props;
    return (
      <div>
        <h1>Summary</h1>
        <p>grab summary from server</p>
        <p>show summary on this page</p>
        <p>SHOW DATE</p>
        <Exercises exercises={allExercises} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { exercises } = state;
  return { exercises };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authUser: function(currentPath) {
      dispatch(authUserFetch(currentPath));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserPage.css';
import { isOwnerFetch } from '../../actions/userActions';
import Exercise from '../exercise/Exercise';
import AddExercise from '../exercise/AddExercise';
import Sets from '../exercise/Sets';
import muscles from '../../assets/muscles.json';

/**
 *
 * PROTECTED ROUTE
 * need to verify user before showing anything here.
 *
 * fetch user data, if not owner than do not show anything on this page
 *
 **/

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.pingserver = this.pingserver.bind(this);
  }
  pingserver() {
    const { ping, match: { params: { username } } } = this.props;
    ping(username);
  }
  render() {
    return (
      <div className="user-page-container">
        <p>Hi, {this.props.match.params.username}</p>
        <h3>- Today (show date here) +</h3>
        <button onClick={this.pingserver}>PING</button>
        <AddExercise />
        <Exercise />
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  console.log('state inside userpage', state);
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    ping: function() {
      dispatch(isOwnerFetch());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);


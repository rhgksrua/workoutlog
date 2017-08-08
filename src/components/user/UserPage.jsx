import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserPage.css';
import { isOwnerFetch } from '../../actions/userActions';
import Exercise from '../exercise/Exercise';
import AddExercise from '../exercise/AddExercise';
import Sets from '../exercise/Sets';
import muscles from '../../assets/muscles.json';
import { authUserFetch } from '../../actions/userActions';

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
  componentDidMount() {
    const currentPath = this.props.match.params.username;
    //this.props.authUser(currentPath);
  }
  componentDidUpdate() {
    const currentPath = this.props.match.params.username;
    //this.props.authUser(currentPath);
  }
  /**
   * 
   * Check page permission
   *
   */
  render() {
    return (
      <div className="user-page-container">
        <p>Hi, {this.props.username}</p>
        {this.props.owner ?
        <div>
          <h3>- Today (show date here) +</h3>
          <AddExercise />
          <Exercise />
        </div>
        :
        <p>No permission</p>
        }
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  const { exercises, user: { username, owner } } = state;
  return { username, owner };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authUser: function(currentPath) {
      dispatch(authUserFetch(currentPath));
    },
    ping: function(user) {
      dispatch(isOwnerFetch(user));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { isOwnerFetch } from '../../actions/userActions';


/**
 * Hides summary page if missing muscle and exercise
 *
 * @returns {undefined}
 */
export class OwnerRoute extends Component {
  componentWillMount() {
    const { location, isOwner } = this.props;
    
    isOwner(location.pathname);
  }
  render() {
    // grab currentExercise from reducer
    //
    const { 
      dirty,
      pending,
      authUser,
      match,
      location,
      username,
      owner,
      component: Component, ...rest
    } = this.props;

    // check for log in status here

    let currentPath;
    try {
      currentPath = location.pathname.split('/')[1];
    } catch (e) {
      currentPath = '/';
    }

    return (
      <Route {...rest} render={props => {
        if (!dirty || pending) {
          return <div>Loading</div>
        }
        // should check username and the current path
        return username === currentPath ? (
          <Component {...props} />
          ) : (
          <Redirect to={{
            pathname: '/signup',
            state: { from: props.location }
            }} 
          />
          );
      }}/>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { user: { username, pending, owner, dirty } } = state;
  return { username, pending, dirty, owner };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    isOwner: function(currentPath) {
      dispatch(isOwnerFetch(currentPath));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnerRoute));



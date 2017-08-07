import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { authUserFetch } from './actions/userActions';


/**
 * Hides summary page if missing muscle and exercise
 *
 * @returns {undefined}
 */
class AuthRoute extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { location, authUser } = this.props;
    console.log('--- SENT TO SERVER', location.pathname);
    
    authUser(location.pathname);
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
      owner,
      component: Component, ...rest
    } = this.props;
    //console.log('--- match', location);

    // check for log in status here

    return (
      <Route {...rest} render={props => {
        console.log('-- dirty pending', dirty, pending);
        if (!dirty || pending) {
          console.error('NOT DIRTY');
          return <div>Loading</div>
        }
        console.log('-- OWNER', owner);
        return owner ? (
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
  const { user: { pending, owner, dirty } } = state;
  return { pending, dirty, owner };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authUser: function(currentPath) {
      dispatch(authUserFetch(currentPath, true));
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRoute));


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { isOwnerFetch } from '../../actions/userActions';


/**
 * Hides summary page if missing muscle and exercise
 *
 * @returns {undefined}
 */
class OwnerRoute extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { location, isOwner } = this.props;
    console.log('--- SENT TO SERVER', location.pathname);
    
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

    console.log('-- props', this.props);


    // check for log in status here

    //console.log('---- match param username', location.pathname);
    const currentPath = location.pathname.split('/')[1];
    console.log('currentPath ---', currentPath);

    return (
      <Route {...rest} render={props => {
        console.log('-- dirty pending', dirty, pending);
        if (!dirty || pending) {
          console.error('NOT DIRTY');
          return <div>Loading</div>
        }
        console.log('-- OWNER', owner);
        // should check username and the current path
        console.log('*** username currentPath', username, currentPath);
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



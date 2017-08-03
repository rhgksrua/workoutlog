import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Route,
  Redirect,
  withRouter

} from 'react-router-dom';

/**
 * Hides summary page if missing muscle and exercise
 *
 * @returns {undefined}
 */
class AuthRoute extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // grab currentExercise from reducer
    //
    const { 
      username,
      component: Component, ...rest 
    } = this.props;


    return (
      <Route {...rest} render={props => (
        username ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
              pathname: '/signup',
              state: { from: props.location }
            }} 
          />
        )
      )}/>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { user: { username} } = state;
  return { username };
};

export default withRouter(connect(mapStateToProps, null)(AuthRoute));


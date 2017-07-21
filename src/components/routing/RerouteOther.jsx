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
class RerouteOther extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // grab currentExercise from reducer
    //
    const { 
      currentExercise: { muscle, exercise }, 
      component: Component, ...rest 
    } = this.props;

    console.log('----- muscle ex', muscle, exercise );

    return (
      <Route {...rest} render={props => (
        muscle && exercise ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
              pathname: '/',
              state: { from: props.location }
            }} 
          />
        )
      )}/>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { currentExercise } = state;
  return { currentExercise };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RerouteOther));

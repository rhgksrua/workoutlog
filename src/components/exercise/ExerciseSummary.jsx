import React, { Component } from 'react';
import { connect } from 'react-redux';

// shows all sets for a single exercise

class ExerciseSummary extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log('---- PROPS', this.props);
    const { currentExercise: { muscle, exercise } } = this.props;
    // need to grab current exercise and muscle
    return (
      <div>
        <p>Exercise Summary</p>
        <p>This is were user sets rep and weight</p>
        <p>{muscle}</p>
        <p>{exercise}</p>
        
      </div>
    )
  }
}


const mapStateToProps = (state, props) => {
  const { currentExercise } = state;
  return { currentExercise };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSummary);


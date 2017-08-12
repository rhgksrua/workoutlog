import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Exercise from './Exercise';

class Exercises extends Component {
  render() {
    const { exercises } = this.props;
    let exerciseElements = null;
    if (!exercises) {
      exerciseElements = [];
    } else {
      exerciseElements = exercises.map((exercise, index) => {
        return (
          <Exercise 
            key={index}
            name={exercise.exercise} 
            muscle={exercise.muscle} 
            sets={exercise.sets} 
          />
        );
      });
    }
    return (
      <div>
        {exerciseElements}
      </div>
    );
  }
}

Exercises.propTypes = {
  exercises: PropTypes.array
};

export default Exercises;

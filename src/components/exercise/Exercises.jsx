import React, { Component } from 'react';
import Exercise from './Exercise';

class Exercises extends Component {
  render() {
    const { exercises } = this.props;
    const exerciseElements = exercises.map((exercise, index) => {
      return (
        <Exercise 
          key={index}
          name={exercise.exercise} 
          muscle={exercise.muscle} 
          sets={exercise.sets} 
        />
      );
    });
    return (
      <div>
        {exerciseElements}
      </div>
    );
  }

}

export default Exercises;

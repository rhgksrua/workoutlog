import React, { Component } from 'react';
import Sets from './Sets';

class Exercise extends Component {
  render() {

    const exerStyles = {
      display: 'inline-block'
    };
    
    const muscleStyles = {
      display: 'inline-block',
      backgroundColor: '#E91E63',
      marginLeft: '10px'
    };
    return (
      <div className="exercise-container">
        <p style={exerStyles}>Name of Exercise</p>
        <p style={muscleStyles} className="muscle-name">Muscle Name</p>
        <Sets />
      </div>
    );
  }
}

export default Exercise;

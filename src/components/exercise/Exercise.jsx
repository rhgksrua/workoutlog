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

    const { name, muscle, sets } = this.props;
    return (
      <div className="exercise-container">
        <p style={exerStyles}>{name}</p>
        <p style={muscleStyles} className="muscle-name">{muscle}</p>
        <Sets sets={sets} />
      </div>
    );
  }
}

export default Exercise;

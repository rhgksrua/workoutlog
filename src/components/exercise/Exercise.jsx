import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sets from './Sets';

class Exercise extends Component {
  render() {
    const exerStyles = {
      display: 'inline-block'
    };
    
    const muscleStyles = {
      display: 'inline-block',
      padding: '5px',
      borderRadius: '4px',
      color: '#fff',
      backgroundColor: '#E91E63',
      marginLeft: '10px'
    };

    const { 
      name, 
      muscle, 
      sets, 
      updateSet,
      deleteSet
    } = this.props;
    return (
      <div className="section exercise-container">
        <div>
          <p style={exerStyles}>{name}</p>
          <p style={muscleStyles} className="muscle-name">{muscle}</p>
        </div>
        <Sets 
          sets={sets} 
          updateSet={updateSet}
          deleteSet={deleteSet}
        />
      </div>
    );
  }
}

Exercise.propTypes = {
  name: PropTypes.string,
  muscle: PropTypes.string,
  sets: PropTypes.array
};

export default Exercise;

import React, { Component } from 'react';
import Set from './Set';

class Exercise extends Component {
  render() {
    return (
      <div>
        <p>Muscle group: Chest</p>
        <p>Exercise name: Bench press</p>
        <Set />
      </div>
    );
  }
}

export default Exercise;

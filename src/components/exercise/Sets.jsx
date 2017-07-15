import React, { Component } from 'react';
import Set from './Set';

// contains rep and weight

class Sets extends Component {
  render() {
    return (
      <div className="sets-container">
        <Set />
        <Set />
        <Set />
      </div>
    );
  }
}

export default Sets;

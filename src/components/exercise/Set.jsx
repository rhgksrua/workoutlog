import React, { Component } from 'react';

class Set extends Component {
  render() {
    const { rep, weight } = this.props;
    return (
      <div className="set-container">
        <p>Rep: {rep}</p>
        <p>Weight: {weight} lbs</p>
      </div>
    );
  }
}

export default Set;


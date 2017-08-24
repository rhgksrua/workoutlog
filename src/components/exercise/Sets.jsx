import React, { Component } from 'react';
import Set from './Set';

// contains rep and weight

class Sets extends Component {
  render() {
    const { sets, updateSet } = this.props;
    let setsElements;
    if (!sets) {
      setsElements = [];
    } else {
      setsElements = sets.map((set, index) => {
        return (
          <Set 
            key={index}
            id={set._id}
            reps={set.reps}
            weight={set.weight}
            updateSet={updateSet}
          />
        );
      });
    }

    return (
      <div className="section sets-container">
        {setsElements}
      </div>
    );
  }
}

export default Sets;

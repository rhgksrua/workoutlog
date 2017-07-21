import React, { Component } from 'react';
import Set from './Set';

// contains rep and weight

class Sets extends Component {
  render() {
    console.log('------- sets', this.props.sets);
    const { sets } = this.props;
    const setsElements = sets.map((set, index) => {
      return (
        <Set 
          key={index}
          rep={set.rep}
          weight={set.weight}
        />
      );
    });

    return (
      <div className="sets-container">
        {setsElements}
      </div>
    );
  }
}

export default Sets;

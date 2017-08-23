import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Set extends Component {
  render() {
    const { reps, weight } = this.props;
    const columnStyle = {
    };
    const columnsStyle = {
      backgroundColor: '#d8d8d8',
      marginBottom: '20px'
    };

    const editStyle = {
      height: '100%',
      width: '100%'
    };

    return (
      <div style={columnsStyle} className="columns">
        <div  className="column">
          <div style={columnStyle} className="notification">NOTE</div>
        </div>
        <div  className="column">
          <div style={columnStyle} className="notification">{reps} reps</div>
        </div>
        <div className="column">
          <div style={columnStyle} className="notification">{weight} lbs</div>
        </div>
        <div className="column">
          <button style={editStyle} className="button">EDIT</button>
        </div>
      </div>
    );
  }
}

Set.propTypes = {
  reps: PropTypes.number,
  weight: PropTypes.number
};

export default Set;


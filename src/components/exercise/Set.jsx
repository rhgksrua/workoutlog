import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Set extends Component {
  state = {
    editMode: false,
    reps: this.props.reps,
    weight: this.props.weight
  }
  handleClick = (e) => {
    console.log('edit mode change');
    this.setState({
      editMode: !this.state.editMode
    });
  }
  handleDelete = (e) => {
    console.log('delete set');
    const { deleteSet, id } = this.props;
    deleteSet(id);
  }
  handleUpdate = (e) => {
    console.log('updated values', this.state.reps, this.state.weight);
    // update changed values here
    // send data to server and redux storage.
    const { updateSet, id } = this.props;
    updateSet({
      reps: this.state.reps, 
      weight: this.state.weight,
      id
    });
    this.setState({
      editMode: !this.state.editMode
    });
  }
  handleNoteChange = (e) => {
    // need to implement
  }
  handleRepChange = (e) => {
    const newVal = e.target.value;
    this.setState({
      reps: newVal < 0 ? 0 : e.target.value
    });
  }
  handleWeightChange = (e) => {
    const newWeight = e.target.value;
    this.setState({
      weight: newWeight < 0 ? 0 : e.target.value
    });
  }
  render() {
    const { reps, weight } = this.props;
    const columnStyle = {
    };
    const columnsStyle = {
      backgroundColor: '#d8d8d8',
      marginBottom: '20px'
    };

    const inputStyle = {
      height: '100%',
      width: '100%'
    };

    const editStyle = {
      height: '100%',
      width: '100%'
    };

    const deleteStyle = {
      ...editStyle,
      backgroundColor: 'red',
      color: 'white'
    };

    return (
      <div>
        {!this.state.editMode ? (
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
            <button 
              style={editStyle} 
              className="button" 
              onClick={this.handleClick}
            >
              EDIT
            </button>
          </div>
          <div className="column">
            <button 
              style={deleteStyle} 
              className="button" 
              onClick={this.handleDelete}
            >
              DELETE
            </button>
          </div>
        </div>
        ) : (
        <div style={columnsStyle} className="columns">
          <div className="column">
            <input 
              style={inputStyle} 
              className="notification" 
              type="text" 
              value={this.state.note} 
              onChange={this.handleNoteChange} 
            />
          </div>
          <div className="column">
            <input 
              style={inputStyle} 
              className="notification" 
              type="text" 
              value={this.state.reps} 
              onChange={this.handleRepChange} 
            />
          </div>
          <div className="column">
            <input 
              style={inputStyle} 
              className="notification" 
              type="text" 
              value={this.state.weight} 
              onChange={this.handleWeightChange} 
            />
          </div>
          <div className="column">
            <button 
              style={editStyle} 
              className="button" 
              onClick={this.handleUpdate}
            >
              UPDATE
            </button>
          </div>
          <div className="column">
            <button 
              style={deleteStyle} 
              className="button" 
              onClick={this.handleDelete}
            >
              DELETE
            </button>
          </div>
        </div>
        )}
      </div>
    );
  }
}

Set.propTypes = {
  reps: PropTypes.number,
  weight: PropTypes.number
};

export default Set;


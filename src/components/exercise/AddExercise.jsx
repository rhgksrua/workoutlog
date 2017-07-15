import React, { Component } from 'react';

class AddExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {value: 'one'};
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidUpdate() {
    console.log('STATE', this.state);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    console.log(event.target.value);
  }
  render() {
    return (
      <div className="add-exercise-container">
        <p>Type</p>
        <select value={this.state.value} onChange={this.handleChange}>
          <option value="one">Chest</option>
          <option value="two">Back</option>
          <option value="three">Shoulder</option>
          <option value="four">Legs</option>
        </select>
        <p>Exercise (changes for type of muscle)</p>
        <select>
          <option value="one">Bench Press</option>
          <option value="two">two</option>
          <option value="three">three</option>
          <option value="four">four</option>
        </select>
        <button>Add</button>
      </div>
    );
  }
}

export default AddExercise;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SetForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reps: 0,
      weight: 0
    };

    this.handleRepChange = this.handleRepChange.bind(this);
    this.handleRepIncrease = this.handleRepIncrease.bind(this);
    this.handleRepDecrease = this.handleRepDecrease.bind(this);
    this.handleWeightChange = this.handleWeightChange.bind(this);
    this.handleWeightIncrease = this.handleWeightIncrease.bind(this);
    this.handleWeightDecrease = this.handleWeightDecrease.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleRepChange(e) {
    const val = parseInt(e.target.value, 10);
    this.setState({
      reps: val
    });
  }
  handleRepIncrease() {
    this.setState({
      reps: this.state.reps + 1
    });
  }
  handleRepDecrease() {
    const decVal = this.state.reps - 1;
    this.setState({
      reps: decVal < 0 ? 0 : decVal
    });
  }
  handleWeightChange(e) {
    this.setState({
      weight: parseInt(e.target.value, 10)
    });
  }
  handleWeightIncrease() {
    this.setState({
      weight: this.state.weight + 5
    });
  }
  handleWeightDecrease() {
    const decVal = this.state.weight - 5;
    this.setState({
      weight: decVal < 0 ? 0 : decVal
    });
  }
  handleSubmit() {
    const { 
      year, 
      month, 
      date,
      muscle,
      exercise,
      addSet
    } = this.props;

    addSet({ ...this.state }, muscle, exercise, year, month, date);
  }
  render() {
    const incDecBtnStyle = {
      width: '50px'
    };
    return (
      <div className={"section"}>
        <div className={"columns"}>
          <div className={"column"}>
            <label>rep</label>
            <input 
              className={"input"} 
              type="text" 
              value={this.state.reps} 
              onChange={this.handleRepChange} 
            />
            <button 
              style={incDecBtnStyle} 
              className={"button"} 
              onClick={this.handleRepDecrease}
            >
              -
            </button>
            <button 
              style={incDecBtnStyle} 
              className={"button"} 
              onClick={this.handleRepIncrease}
            >
              +
            </button>
          </div>
          <div className={"column"}>
            <label>weight</label>
            <input 
              className={"input"} 
              type="text" 
              value={this.state.weight} 
              onChange={this.handleWeightChange} 
            />
            <button 
              style={incDecBtnStyle} 
              className={"button"} 
              onClick={this.handleWeightDecrease}
            >
              -
            </button>
            <button 
              style={incDecBtnStyle} 
              className={"button"} 
              onClick={this.handleWeightIncrease}
            >
              +
            </button>
          </div>
        </div>
        <button 
          className={"button"} 
          onClick={this.handleSubmit}
        >
          SAVE
        </button>
      </div>
    );
  }
};

SetForm.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  date: PropTypes.number,
  muscle: PropTypes.string,
  exercise: PropTypes.string,
  addSet: PropTypes.func
};

export default SetForm;

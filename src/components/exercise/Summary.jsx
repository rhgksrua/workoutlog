import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

import Exercises from '../exercise/Exercises';

import { setDate, fetchAllSets } from '../../actions/exerciseActions';

export class Summary extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      startDate: moment()
    };
  }
  componentDidMount() {
    const { 
      currentDate: {
        year, 
        month, 
        date
      }
    } = this.props;

    this.props.getAllSets(year, month, date);
  }
  handleChange(userDate) {
    this.setState({
      startDate: userDate
    });
    const year = userDate.year();
    const month = userDate.month();
    const date = userDate.date();

    this.props.setDate(year, month, date);
    this.props.getAllSets(year, month, date);

  }
  render() {
    const { 
      currentDate: {
        year, 
        month, 
        date
      },
      todayExercises
    } = this.props;

    const datePickerStyle = {
      height: '2.25em'
    };

    return (
      <div className={"section"}>
        <h1 className="title">Summary</h1>
        <div className="columns">
          <div className="column">
            <p>{year} {month + 1} {date}</p>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <DatePicker
              className="datepicker"
              style={datePickerStyle}
              todayButton={"Today"}
              selected={this.state.startDate}
              onChange={this.handleChange}
              withPortal
            />
          </div>
        </div>

        <Exercises 
          exercises={todayExercises} 
        />
      </div>
    );
  }
}

const filterToday = (all, year, month, date) => {

  const todayExercise = all.filter(exercise => {
    return exercise.year === year &&
           exercise.month === month &&
           exercise.date  === date;
  });

  return todayExercise;
}

Summary.propTypes = {
  currentDate: PropTypes.object,
  year: PropTypes.number,
  month: PropTypes.number,
  date: PropTypes.number,
  user: PropTypes.object,
  exercises: PropTypes.object,
  allExercises: PropTypes.array
};

const mapStateToProps = (state, props) => {
  const { 
    currentDate, 
    currentDate: {
      year, month, date
    },
    user, 
    exercises, 
    exercises: { 
      allExercises 
    } 
  } = state;
  const todayExercises = filterToday(allExercises, year, month, date);
  return { currentDate, user, exercises, todayExercises };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getAllSets(year, month, date) {
      dispatch(fetchAllSets(year, month, date));
    },
    setDate(year, month, date) {
      dispatch(setDate(year, month, date));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);

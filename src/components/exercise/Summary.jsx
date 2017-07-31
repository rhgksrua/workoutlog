import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import Exercises from '../exercise/Exercises';

import { authUserFetch } from '../../actions/userActions';
import { setDate, fetchAllSets } from '../../actions/exerciseActions';

class Summary extends Component {
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
      },
      authUser,
      match: {
        params: {
          username
        }
      }
    } = this.props;

    const currentPath = username;
    authUser(currentPath);

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
      user: { 
        username = false 
      }, 
      exercises: { 
        allExercises 
      },
      currentDate: {
        year, 
        month, 
        date
      },
      todayExercises
    } = this.props;

    return (
      <div className={"section"}>
        <h1>Summary</h1>
        <p>DATE: {year} {month + 1} {date}</p>

        <DatePicker
          todayButton={"Today"}
          selected={this.state.startDate}
          onChange={this.handleChange}
          withPortal
        />

        <Exercises 
          exercises={todayExercises} 
        />
      </div>
    );
  }
}

const filterToday = (all, year, month, date) => {

  console.log('--- all', all);
  const todayExercise = all.filter(exercise => {
    return exercise.year === year &&
           exercise.month === month &&
           exercise.date  === date;
  });

  console.log('_--------TODAY', todayExercise);
  return todayExercise;
}

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
    authUser(currentPath) {
      dispatch(authUserFetch(currentPath));
    },
    getAllSets(year, month, date) {
      dispatch(fetchAllSets(year, month, date));
    },
    setDate(year, month, date) {
      dispatch(setDate(year, month, date));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Summary);

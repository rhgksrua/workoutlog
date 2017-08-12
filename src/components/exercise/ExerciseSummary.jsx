import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSetAction, fetchSets } from '../../actions/exerciseActions';
import { authUserFetch } from '../../actions/userActions';
import Exercise from './Exercise';
import SetForm from './SetForm';

// shows all sets for a single exercise

export class ExerciseSummary extends Component {

  componentDidMount() {

    const { 
      currentDate: {
        year,
        month,
        date
      },
      match: {
        params: {
          muscle,
          exercise
        }
      }
    } = this.props;

    this.props.getSets(muscle, exercise, year, month, date);

  }

  render() {

    const { 
      currentDate: { year, month, date },
      todayExercise: {
        sets: todaySets = []
      },
      match: {
        params: {
          muscle: muscleParam,
          exercise: exerciseParam
        }
      },
      addSet
    } = this.props;

    return (
      <div>
        <div className={"section"}>
          <p>Date {year} {month} {date}</p>
        </div>
        <SetForm 
          year={year}
          month={month}
          date={date}
          muscle={muscleParam}
          exercise={exerciseParam}
          addSet={addSet}
        />
        <Exercise
          name={exerciseParam}
          muscle={muscleParam}
          sets={todaySets}
        />
      </div>
    );
  }
}


const filterToday = (all, exerciseParam, muscleParam, year, month, date) => {
  const todayExerciseFilter = all.filter(exercise => {
    return exercise.exercise === exerciseParam &&
           exercise.muscle === muscleParam;
  });

  const todayExercise = todayExerciseFilter.filter(exercise => {
    return exercise.year === year &&
           exercise.month === month &&
           exercise.date  === date;
  });

  if (todayExercise.length > 0) {
    return todayExercise[0];
  }

  return {};
}

ExerciseSummary.propTypes = {
  currentDate: PropTypes.object,
  year: PropTypes.string,
  month: PropTypes.string,
  date: PropTypes.string,
};

const mapStateToProps = (state, props) => {

  const { 
    currentDate,
    currentDate: { year, month, date },
    exercises: { allExercises },
  } = state;

  const {
    match: {
      params: {
        muscle: muscleParam,
        exercise: exerciseParam
      }
    }
  } = props;

  const todayExercise = filterToday(allExercises, exerciseParam, muscleParam, year, month, date);

  return { currentDate, todayExercise };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addSet(set, muscle, exercise, year, month, date) {
      dispatch(addSetAction(set, muscle, exercise, year, month, date));
    },
    getSets(muscle, exercise, year, month, date) {
      dispatch(fetchSets(muscle, exercise, year, month, date));
    },
    authUser: function() {
      dispatch(authUserFetch());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSummary);


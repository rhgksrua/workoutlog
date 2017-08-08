import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { fetchExerciseList, setMuscle, setExercise } from '../../actions/exerciseActions';
import defaultExerciseList from '../../assets/muscles.json';
import { authUserFetch } from '../../actions/userActions';

class AddExercise extends Component {
  constructor(props) {
    super(props);
    //console.warn(exerciseList);
    //console.warn(Object.keys(exerciseList.muscles));
    this.handleExerciseList = this.handleExerciseList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { authUser } = this.props;
    //authUser();
  }
  handleExerciseList(e) {
    this.props.getExercises(e.target.value);
  }
  handleSubmit(val) {

    if (!val.muscle || !val.exercise) {
      console.log('NOPE!');
      return;
    }

    const { history, myHandleSumbit, match: { params: { username } } } = this.props;

    myHandleSumbit(val, history, username);
  }
  render() {
    const { currentDate: {
      year, month, date
    }, handleSubmit, form, currentExercise: { muscle } } = this.props;

    let exerciseList;
    let listOfExercises = null;
    let showExercise = null;

    const selectStyle = {
    };

    // get all list of muscles
    const listOfMuscles = Object.keys(defaultExerciseList).map((muscle, key) => {
      return (
        <option style={selectStyle} value={muscle} key={key}>{muscle}</option>
      );
    });

    if (this.props.exerciseList[muscle]) {
      showExercise = true;
      exerciseList = this.props.exerciseList[muscle];
      listOfExercises = exerciseList.map((exercise, key) => {
        return (
          <option style={selectStyle} value={exercise} key={key}>{exercise}</option>
        );
      });
    } else {
      showExercise = false;
      exerciseList = [];
    }

    const fieldStyle = {
      fontSize: '1.14em',
      width: '100%'
    };

    return (
      <div className="section add-exercise-container">
        <div className="columns">
          <div className="column">
            <p>{year} {month} {date}</p>
          </div>
        </div>
        <div className="">
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <div className="columns">
              <div className="column muscle-select-container">
                <label className={"label"} htmlFor="muscle">Muscle</label>
                <Field 
                  style={fieldStyle}
                  className={"select"}
                  name="muscle" 
                  component="select" 
                  onChange={this.handleExerciseList}
                >
                  <option style={selectStyle}></option>
                  {listOfMuscles}
                </Field>
              </div>
              {showExercise && muscle ? (
              <div className="column exercise-select-container">
                <label className={"label"} htmlFor="exercise">Exercise</label>
                <Field 
                  style={fieldStyle}
                  className={"select"}
                  name="exercise" 
                  component="select"
                >
                  <option></option>
                  {listOfExercises}
                </Field>
              </div>
              ) : (
              <div></div>
              )}
            </div>
            <div className="columns">
              <div className="column">
                <button 
                  className={"button"}
                  type="submit"
                  >
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

AddExercise.propTypes = {
  currentDate: PropTypes.object,
  exerciseList: PropTypes.object,
  currentExercise: PropTypes.object
};

const AddExerciseFormWrapper = reduxForm({
  form: 'workout'
})(AddExercise);

const mapStateToProps = (state, props) => {
  const { currentDate, exerciseList, currentExercise } = state;
  return { currentDate, exerciseList, currentExercise };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authUser(currentPath) {
      dispatch(authUserFetch(currentPath));
    },
    getExercises(muscle) {
      console.log('list of exercises for', muscle);
      dispatch(fetchExerciseList(muscle));
    },
    muscleAction(muscle) {
      dispatch(setMuscle(muscle));
    },
    exerciseAction(exercise) {
      dispatch(setExercise(exercise));
    },
    myHandleSumbit(val, history, username) {
      if (!val.muscle || !val.exercise) {
        console.log('NOPE!');
        return false;
      }
      dispatch(setMuscle(val.muscle));
      dispatch(setExercise(val.exercise));
      const path = `/${username}/${val.muscle}/${val.exercise}`;
      history.push(path);


    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExerciseFormWrapper);

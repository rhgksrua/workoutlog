import React, { Component } from 'react';
import { fetchExerciseList, setMuscle, setExercise } from '../../actions/exerciseActions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import defaultExerciseList from '../../assets/muscles.json';
//import { removeSpaces } from '../helper/helper';

class AddExercise extends Component {
  constructor(props) {
    super(props);
    //console.warn(exerciseList);
    //console.warn(Object.keys(exerciseList.muscles));
    this.handleExerciseList = this.handleExerciseList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleExerciseList(e) {
    this.props.getExercises(e.target.value);
  }
  handleSubmit(val) {
    const { history, myHandleSumbit, match: { params: { username } } } = this.props;
    console.log('history', history);
    myHandleSumbit(val, history, username);
  }
  render() {
    console.log('PROPS!!!!1', this.props);
    const { handleSubmit, form, currentExercise: { muscle } } = this.props;

    let exerciseList;
    let listOfExercises = null;
    let showExercise = null;

    // get all list of muscles
    const listOfMuscles = Object.keys(defaultExerciseList).map((muscle, key) => {
      return (
        <option value={muscle} key={key}>{muscle}</option>
      );
    });

    if (this.props.exerciseList[muscle]) {
      showExercise = true;
      exerciseList = this.props.exerciseList[muscle];
      listOfExercises = exerciseList.map((exercise, key) => {
        return (
          <option value={exercise} key={key}>{exercise}</option>
        );
      });
    } else {
      showExercise = false;
      exerciseList = [];
    }

    return (
      <div className="add-exercise-container">
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div>
            <div className="muscle-select-container">
              <label className={"label"} htmlFor="muscle">Muscle</label>
              <Field 
                className={"select"}
                name="muscle" 
                component="select" 
                onChange={this.handleExerciseList}
              >
                <option></option>
                {listOfMuscles}
              </Field>
            </div>
            {showExercise ? (
            <div className="exercise-select-container">
              <label className={"label"} htmlFor="exercise">Exercise</label>
              <Field 
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
          <div>
            <button 
              className={"button"}
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const AddExerciseFormWrapper = reduxForm({
  form: 'workout'
})(AddExercise);

const mapStateToProps = (state, props) => {
  const { exerciseList, currentExercise } = state;
  return { exerciseList, currentExercise };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
      //dispatch(setMuscle(muscle));
      //dispatch(setExercise(exercise));
      //const { muscle, exercise } = this.val;
      if (!val.muscle || !val.exercise) {
        return;
      }
      dispatch(setMuscle(val.muscle));
      dispatch(setExercise(val.exercise));
      const path = `/${username}/${val.muscle}/${val.exercise}`;
      history.push(path);


    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExerciseFormWrapper);

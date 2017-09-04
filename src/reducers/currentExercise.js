import {
  SET_CURRENT_MUSCLE,
  SET_CURRENT_EXERCISE
} from '../actions/actionTypes';

function currentExercise(state = {}, action) {
  switch(action.type) {
    case SET_CURRENT_MUSCLE:
      return { ...state, muscle: action.muscle };
    case SET_CURRENT_EXERCISE:
      return { ...state, exercise: action.exercise };
    default:
      return state;
  }
}

export default currentExercise;

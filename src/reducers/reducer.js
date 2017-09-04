import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import initialList from '../assets/muscles.json';
import moment from 'moment';

import user from './user';
import currentDate from './currentDate';
import exercises from './exercises';
import exerciseList from './exerciseList';
import currentExercise from './currentExercise';

export const allReducers = {
  user,
  exercises,
  exerciseList,
  currentDate,
  currentExercise,
  form: formReducer
};

export default combineReducers(allReducers);

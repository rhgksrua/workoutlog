import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import initialList from '../assets/muscles.json';
import moment from 'moment';

import {
  ADD_USER,
  LOG_OUT,
  IS_OWNER,
  NOT_OWNER,
  ADD_SET,
  SET_DATE,
  ADD_SETS_ALL,
  ADD_ALL_SETS,
  SET_CURRENT_MUSCLE,
  SET_CURRENT_EXERCISE,
  PENDING_USER
} from '../actions/actionTypes';

const userInitialState = {
  dirty: false,
  pending: false,
  username: '',
  owner: false
};

function user(state = userInitialState, action) {
  switch(action.type) {
    case PENDING_USER:
      return { ...state, pending: true, dirty: true };
    case ADD_USER:
      return { 
        ...state, 
        username: action.payload.username, 
        owner: action.payload.owner, 
        pending: false, 
        dirty: true 
      };
    case LOG_OUT:
      return { ...state, username: '', owner: false, pending: false, dirty: true };
    case NOT_OWNER:
      return { ...state, owner: false, pending: false, dirty: true };
    case IS_OWNER:
      // checks if user is the owner of the current page.
      return { ...state, owner: action.owner, pending: false, dirty: true }
    default:
      return state;
  }
}

const today = moment();
const dateInitial = {
  year: today.year(),
  month: today.month(),
  date: today.date()
};

function currentDate(state = dateInitial, action) {
  switch(action.type) {
    case SET_DATE:
      const { year, month, date } = action;
      return { ...state, year, month, date };
    default:
      return state;
  }
}

const initialExercises = {
  allExercises: []
}


function exercises(state = initialExercises, action) {
  switch(action.type) {
    case ADD_SETS_ALL:
      return { ...state, allExercises: [ action.exercise ] };
    case ADD_ALL_SETS:
      return { ...state, allExercises: action.exercises };
    case ADD_SET:
      const { allExercises } = state;

      // copy of exercise array
      const newExercises = allExercises.slice();

      // look for exercise index
      let index = -1;
      for (let i = 0, len = newExercises.length; i < len; i++) {
        let current = newExercises[i];
        if (current.date === action.date &&
          current.month === action.month &&
          current.year === action.year &&
          current.exercise === action.exercise &&
          current.muscle === action.muscle) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        // add new exercise
        newExercises.push({
          date: action.date,
          month: action.month,
          year: action.year,
          muscle: action.muscle,
          exercise: action.exercise,
          sets: [ action.set ]
        });
      } else {
        newExercises[index].sets.push(action.set);
      }
      return { ...state, allExercises: newExercises };
    case LOG_OUT:
      return { ...state, allExercises: [] };
    default:
      return state;
  }
}

function exerciseList(state = initialList, action) {
  let newState;
  switch(action.type) {
    case 'UPDATE_LIST':
      return state;
    case 'ADD_LIST':
      newState = Object.assign({}, state);
      newState[action.name] = action.list; // name string, list array
      return newState;
    default:
      return state;
  }
}

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


export default combineReducers({
  user,
  exercises,
  exerciseList,
  currentDate,
  currentExercise,
  form: formReducer
});

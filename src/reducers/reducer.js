import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import initialList from '../assets/muscles.json';

import {
  ADD_USER,
  LOG_OUT,
  IS_OWNER,
  ADD_MUSCLE,
  ADD_EXERCISE,
  ADD_SET,
  SET_CURRENT_MUSCLE,
  SET_CURRENT_EXERCISE
} from '../actions/actionTypes';

const userInitialState = {
  username: '',
  owner: false
};

function user(state = userInitialState, action) {
  switch(action.type) {
    case ADD_USER:
      //return Object.assign({}, state, {username: action.username});
      return { ...state, username: action.username };
    case LOG_OUT:
      //return Object.assign({}, state, {username: ''});
      return { ...state, username: '', owner: false };
    case IS_OWNER:
      // checks if user is the owner of the current page.
      return { ...state, owner: action.owner }
    default:
      return state;
  }
}

const initialExercises = {
  // 
  // muscle: 'chest'
  // exercise: 'bench press'
  // sets: [ { rep, weight } ]
  //
  //
  // List of all exercises for a day
  
  allExercises: [
    {
      muscle: 'chest',
      exercise: 'bench press',
      sets: [
        {
          rep: 11,
          weight: 100
        },
        {
          rep: 10,
          weight: 90
        }
      ]
    },
    {
      muscle: 'chest',
      exercise: 'incline bench press',
      sets: [
        {
          rep: 9,
          weight: 100
        },
        {
          rep: 19,
          weight: 90
        }
      ]
    }

  ]
}

function exercises(state = initialExercises, action) {
  switch(action.type) {
    case ADD_SET:
      return state;
    default:
      return state;
  }
}

const xinitialList = {
  isFetching: false,
  chest: [
    'bench press',
    'incline bench press',
    'decline bench press',
  ]
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
  currentExercise,
  form: formReducer
});

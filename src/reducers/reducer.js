import { combineReducers } from 'redux';

import {
  ADD_USER,
  LOG_OUT
} from '../actions/actionTypes';

const userInitialState = {
  username: ''
};

function user(state = userInitialState, action) {
  switch(action.type) {
    case ADD_USER:
      //return Object.assign({}, state, {username: action.username});
      return { ...state, username: action.username };
    case LOG_OUT:
      //return Object.assign({}, state, {username: ''});
      return { ...state, username: '' };


    default:
      return state;
  }
}

export default combineReducers({
  user
});

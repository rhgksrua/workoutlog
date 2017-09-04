import initialList from '../assets/muscles.json';

import {
  UPDATE_LIST,
  ADD_LIST
} from '../actions/actionTypes';

function exerciseList(state = initialList, action) {
  let newState;
  switch(action.type) {
    case UPDATE_LIST:
      return state;
    case ADD_LIST:
      newState = Object.assign({}, state);
      newState[action.name] = action.list; // name string, list array
      return newState;
    default:
      return state;
  }
}

export default exerciseList;

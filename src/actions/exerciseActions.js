import {
  ADD_EXERCISE,
  ADD_MUSCLE,
  SET_CURRENT_MUSCLE,
  SET_CURRENT_EXERCISE
} from './actionTypes';

export const setMuscle = (muscle) => {
  return {
    type: SET_CURRENT_MUSCLE,
    muscle
  };
};

export const setExercise = (exercise) => {
  return {
    type: SET_CURRENT_EXERCISE,
    exercise
  };
}

export const getListOfExercises = (muscle) => {
  return {
    type: SET_CURRENT_MUSCLE,
    muscle
  };
}

/**
 *
 * check to see if list needs to be fetched from server
 *
 */
export const fetchExerciseList = (muscle) => {
  return (dispatch, getState) => {
    if (shouldFetchList(getState(), muscle)) {
      // grab new list from server
      console.warn('fetching new list from server');
      return dispatch(fetchListOfExercises(muscle));
    }
    // use existing list from store
    console.warn('list exists');
    return dispatch(getListOfExercises(muscle));
  };
};

export const addNewExerciseList = (name, list) => {
  return {
    type: 'ADD_LIST',
    name,
    list
  };
};

function shouldFetchList(state, muscle) {
  const list = state.exerciseList[muscle];
  if (!list) {
    return true;
  } else if (list.isFetching) {
    return false;
  } else {
    return false;
  }
}

export const fetchListOfExercises = (muscle) => {
  return dispatch => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = {
      headers,
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify({ muscle })
    }
    return fetch(
      `${window.location.protocol}//${window.location.host}/auth/user/exercises`, options)
        .then(data => {
          return data.json();
        })
      .then(data => {
        console.log('response from server', data);
        console.warn('hello?');
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(addNewExerciseList(data.name, data.list));
        dispatch(getListOfExercises(data.name));
      })
      .catch(err => {
        console.error(err);
      });
    
  };
}

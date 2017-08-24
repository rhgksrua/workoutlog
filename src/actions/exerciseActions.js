import fetch from 'isomorphic-fetch';

import {
  ADD_SET,
  ADD_SETS_ALL,
  ADD_ALL_SETS,
  SET_DATE,
  SET_CURRENT_MUSCLE,
  SET_CURRENT_EXERCISE
} from './actionTypes';

// need to rename add sets all

import { getToken } from '../lib/libs';

export const setDate = (year, month, date) => {
  return {
    type: SET_DATE,
    year,
    month,
    date
  }
}

export const addAllSets = exercises => {
  return {
    type: ADD_ALL_SETS,
    exercises
  }
};

export const fetchAllSets = (year, month, date) => {
  return dispatch => {

    const token = getToken();
    if (!token) {
      // should dispatch action that says user does not own the page
      console.log('token missing. User needs to signin');
      return;
    }

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    const options = {
      headers,
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify({ year, month, date })
    }

    return fetch(
      `${window.location.protocol}//${window.location.host}/auth/user/exercises/sets/all`, 
      options)
        .then(data => {
          return data.json();
        })
      .then(data => {
        console.log('response from server', data);
        if (data.error) {
          throw new Error(data.error);
        }
        if (!data.status) {
          console.warn('exercise not found');
        } else {
          dispatch(addAllSets(data.exercises));
        }

      })
      .catch(err => {
        console.error(err);
      });
  };
};

export const fetchSets = (muscle, exercise, year, month, date) => {
  return dispatch => {

    const token = getToken();
    if (!token) {
      // should dispatch action that says user does not own the page
      console.log('token missing. User needs to signin');
      return;
    }
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    const options = {
      headers,
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify({ muscle, exercise, year, month, date })
    }
    return fetch(
      `${window.location.protocol}//${window.location.host}/auth/user/exercises/sets`, options)
        .then(data => {
          return data.json();
        })
      .then(data => {
        console.log('response from server', data);
        if (data.error) {
          throw new Error(data.error);
        }
        if (!data.status) {
          console.warn('exercise not found');
        } else {
          console.log('--- ADDING Initial sets');
          dispatch(addInitialSets(data.exercises[0]));
        }

      })
      .catch(err => {
        console.error(err);
      });
  };
}

/**
 * Add
 *
 * @returns {undefined}
 */
export const addInitialSets = (exercise) => {
  return {
    type: ADD_SETS_ALL,
    exercise
  };
}

export const addSet = (set, muscle, exercise, year, month, date) => {
  return {
    type: ADD_SET,
    set,
    muscle,
    exercise,
    year,
    month,
    date
  };
};

export const addSetAction = (set, muscle, exercise, year, month, date) => {
  return dispatch => {

    const token = getToken();
    if (!token) {
      // should dispatch action that says user does not own the page
      console.log('token missing. User needs to signin');
      return;
    }
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    const options = {
      headers,
      credentials: 'same-origin',
      method: 'put',
      body: JSON.stringify({ set, muscle, exercise, year, month, date })
    }
    return fetch(
      `${window.location.protocol}//${window.location.host}/auth/user/exercises`, options)
        .then(data => {
          return data.json();
        })
      .then(data => {
        console.log('response from server', data);
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(addSet(set, muscle, exercise, year, month, date));
      })
      .catch(err => {
        console.error(err);
      });
    
  };
}


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
    console.log('-- fetchListOfExercises action');
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


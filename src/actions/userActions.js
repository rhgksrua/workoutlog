import 'whatwg-fetch';
import { getToken } from '../lib/libs';
import {
  ADD_USER,
  LOG_OUT,
  IS_OWNER
} from './actionTypes';

export const addUser = (username) => {
  return {
    type: ADD_USER,
    username
  };
};

export const logOut = () => {
  // remove token
  localStorage.removeItem('token');
  return {
    type: LOG_OUT
  };
};

/**
 *
 * Checks if user has access to page
 *
 */
export const isOwner = () => {
  return {
    type: IS_OWNER
  };
}

export const isOwnerFetch = (user) => {
  return dispatch => {
    const token = getToken();
    if (!token) {
      // should dispatch action that says user does not own the page
      console.log('token missing. User needs to signin');
      return;
    }
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    const options = {
      headers,
      credentials: 'same-origin',
      method: 'post',
    }

    return fetch(
      `${window.location.protocol}//${window.location.host}/auth/owner`, options)
        .then(data => {
          return data.json();
        })
      .then(data => {
        console.log('response from server', data);
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(isOwner());
      })
      .catch(err => {
        console.error(err);
      });
  }
};




/**
 *
 * Used to fetch jwt from server
 *
 */
export const authUserFetch = () => {
  return dispatch => {
    const token = getToken();
    if (!token) return;
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    const options = {
      headers,
      credentials: 'same-origin',
      method: 'post',
    }

    return fetch(
      `${window.location.protocol}//${window.location.host}/auth/user`, options)
        .then(data => {
          return data.json();
        })
      .then(data => {
        console.log('response from server', data);
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch(addUser(data.username));
      })
      .catch(err => {
        console.error(err);
      });
  }
};

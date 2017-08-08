import 'whatwg-fetch';
import { getToken } from '../lib/libs';
import {
  ADD_USER,
  LOG_OUT,
  IS_OWNER,
  NOT_OWNER,
  PENDING_USER
} from './actionTypes';

export const addUser = payload => {
  return {
    type: ADD_USER,
    payload
  };
};

export const pendingUser = () => {
  return {
    type: PENDING_USER
  };
}

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
export const isOwner = (owner) => {
  return {
    type: IS_OWNER,
    owner 
  };
};

export const userNotLoggedIn = () => {
  return {
    type: NOT_OWNER
  };
};

export const isOwnerFetch = (user, currentPath) => {
  return dispatch => {

    console.log('-- isOwnerFetch action');

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
      body: JSON.stringify({ user, currentPath })
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
        dispatch(isOwner(data.isOwner));
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
export const authUserFetch = (currentPath, redirect = false) => {
  return dispatch => {
    console.warn('-- authUserFetch action');
    const token = getToken();
    if (!token) {
      dispatch(userNotLoggedIn());
      return;
    }
    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', 'application/json');
    const options = {
      headers,
      credentials: 'same-origin',
      method: 'post',
      body: JSON.stringify({ currentPath })
    }

    dispatch(pendingUser());
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
        // Order is important here.  Protected route redirect user based on ownership
        // of summary page.  If username is updated first, owner prop remains false
        //dispatch(isOwner(data.isOwner));
        dispatch(addUser({ username: data.username, owner: data.isOwner }));
      })
      .catch(err => {
        console.error(err);
      });
  }
};

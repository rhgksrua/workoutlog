import { allReducers as reducer } from './reducer';
import * as types from '../actions/actionTypes.js';


describe('user reducer', () => {
  const userInitialState = {
    dirty: false,
    pending: false,
    username: '',
    owner: false
  };

  it('should return initial state', () => {

    expect(reducer.user(undefined, {})).toEqual(userInitialState);
  });

  it('should handle PENDING_USER', () => {
    expect(
      reducer.user(userInitialState, {
        type: types.PENDING_USER
      })
    ).toEqual(
      {
        dirty: true,
        pending: true,
        username: '',
        owner: false
      }
    );
  });

  it('should handle ADD_USER', () => {
    expect(
      reducer.user(userInitialState, {
        type: types.ADD_USER,
        payload: {
          username: 'foo',
          owner: true,
        },
        pending: false,
        dirty: true
      })
    ).toEqual(
      {
        dirty: true,
        pending: false,
        username: 'foo',
        owner: true
      }
    )
  });

  it('should handle LOG_OUT', () => {
    expect(
      reducer.user(userInitialState, {
        type: types.LOG_OUT
      })
    ).toEqual(
      {
        dirty: true,
        pending: false,
        owner: false,
        username: ''
      }
    );
  });

  it('should handle NOT_OWNER', () => {
    expect(
      reducer.user(
        {
          owner: true,
          pending: false,
          dirty: true,
          username: 'foobar'
        },
        {
          type: types.NOT_OWNER,
        }
      )
    ).toEqual(
      {
        owner: false,
        pending: false,
        dirty: true,
        username: 'foobar'
      }
    )
  });

  it('should handle IS_OWNER', () => {
    expect(
      reducer.user(
        userInitialState,
        {
          type: types.IS_OWNER,
          owner: true
        }
      )
    ).toEqual(
      {
        username: '',
        dirty: true,
        pending: false,
        owner: true
      }
    )
  });

});



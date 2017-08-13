import * as actions from './exerciseActions';
import * as types from './actionTypes';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

global.window = {};
import localStorage from 'mock-local-storage';
window.localStorage = global.localStorage;




describe('exercise actions', () => {

  const set = [
    {
      reps: 12,
      weight: 100
    }
  ];
  const muscle = 'chest';
  const exercise = 'bench press';
  const year = 1992;
  const month = 9;
  const date = 24;
  const exercises = [];


  it('creates action to sets date', () => {

    const year = 1992;
    const month = 10;
    const date = 24;

    const expectedAction = {
      type: types.SET_DATE,
      year,
      month,
      date
    };

    expect(actions.setDate(year, month, date)).toEqual(expectedAction);

  });

  it('creates action to add all sets for the user', () => {

    const exercises = [];

    const expectedAction = {
      type: types.ADD_ALL_SETS,
      exercises
    };

    expect(actions.addAllSets(exercises)).toEqual(expectedAction);
    
  });

  it('creates action to add initial sets', () => {
    const exercise = [];

    const expectedAction = {
      type: types.ADD_SETS_ALL,
      exercise
    };

    expect(actions.addInitialSets(exercise)).toEqual(expectedAction);
  });

  it('creates action to add a single set', () => {

    const expectedAction = {
      type: types.ADD_SET,
      set,
      muscle,
      exercise,
      year,
      month,
      date
    }

    expect(actions.addSet(set, muscle, exercise, year, month, date)).toEqual(expectedAction);

  });

  it('creates action to set current muscle', () => {

    const expectedAction = {
      type: types.SET_CURRENT_MUSCLE,
      muscle
    };

    expect(actions.setMuscle(muscle)).toEqual(expectedAction);

  });

  it('creates action to set current exercise', () => {

    const expectedAction = {
      type: types.SET_CURRENT_EXERCISE,
      exercise
    };

    expect(actions.setExercise(exercise)).toEqual(expectedAction);

  });

  xit('creates action to get list of all exercises', () => {

    // need to look over this action

    const expectedAction = {
      type: types.SET_CURRENT_MUSCLE,
      muscle
    };

    expect(actions.getListOfExercises(muscle)).toEqual(expectedAction);

  });

  it('creates action to add new exercise list', () => {

    const name = 'name';
    const list = [];

    const expectedAction = {
      type: 'ADD_LIST',
      name,
      list
    };

    expect(actions.addNewExerciseList(name, list)).toEqual(expectedAction);

  });
});

describe('async exercise actions', () => {

  //localStorage.setItem('token', 'somerandomstring');
  global.localStorage.token = 'somerandomstring';

  const set = [
    {
      reps: 12,
      weight: 100
    }
  ];
  const muscle = 'chest';
  const exercise = 'bench press';
  const year = 1992;
  const month = 9;
  const date = 24;
  const exercises = [];

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const protocol = window.location.protocol || 'http:';
  const host = window.location.host || 'localhost';
  const url = `${protocol}//${host}`;

  afterEach(() => {
    nock.cleanAll();
  });
  
  it('fetches all sets from server and dispatches ADD_ALL_SETS', () => {

    nock(url)
      .post('/auth/user/exercises/sets/all')
      .reply(200, { exercises, error: false, status: true });

    const expectedActions = [
      { type: types.ADD_ALL_SETS, exercises }
    ];

    const store = mockStore({ exercises: [] })

    return store.dispatch(actions.fetchAllSets(year, month, date)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  it('fetches sets based on name and exercise, and dispatches ADD_SETS_ALL', () => {

    nock(url)
      .post('/auth/user/exercises/sets')
      .reply(200, { exercises: [[]], error: false, status: true });

    const expectedActions = [
      { type: types.ADD_SETS_ALL, exercise: [] }
    ];

    const store = mockStore({ exercises: [] });

    return store.dispatch(actions.fetchSets(muscle, exercise, year, month, date)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('add set completed by user and dispatches ADD_SET', () => {

    nock(url)
      .put('/auth/user/exercises')
      .reply(200, { error: false });

    const expectedActions = [
      { type: types.ADD_SET, set, muscle, exercise, year, month, date }
    ];

    const store = mockStore({ exercises: [] });

    return store.dispatch(actions.addSetAction(set, muscle, exercise, year, month, date)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('fetches list of available exercises and dispatches actions', () => {

    const list = [];
    const name = 'bench press';
    const muscle = 'chest';

    nock(url)
      .post('/auth/user/exercises')
      .reply(200, {name: 'bench press', list: []});

    const expectedActions = [
      { type: 'ADD_LIST', name, list },
      { type: types.SET_CURRENT_MUSCLE, muscle: name }
    ];

    const store = mockStore({ list: [] });

    return store.dispatch(actions.fetchListOfExercises(muscle)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

});

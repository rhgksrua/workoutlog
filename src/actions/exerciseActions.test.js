import * as actions from './exerciseActions';
import * as types from './actionTypes';

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

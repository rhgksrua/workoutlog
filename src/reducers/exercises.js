import {
  ADD_SET,
  SET_DATE,
  ADD_SETS_ALL,
  ADD_ALL_SETS,
  UPDATE_SET,
  DELETE_SET,
  LOG_OUT
} from '../actions/actionTypes';

const initialExercises = {
  allExercises: []
}

function deleteSet(exercises, id) {
  const removedExercise = exercises.map(exercise => {
    const removedSets = exercise.sets.filter(set => {
      return set._id !== id;
    });
    exercise.sets = removedSets;
    return exercise;
  });
  return removedExercise;
}

function exercises(state = initialExercises, action) {
  const { allExercises } = state;
  let newExercises;
  let index;
  let exerIndex;
  switch(action.type) {
    case ADD_SETS_ALL:
      return { ...state, allExercises: [ action.exercise ] };
    case ADD_ALL_SETS:
      return { ...state, allExercises: action.exercises };
    case DELETE_SET:
      newExercises = JSON.parse(JSON.stringify(allExercises));
      const removedExercises = deleteSet(newExercises, action.id);
      return { ...state, allExercises: removedExercises };
    case UPDATE_SET:
      const { reps, weight, id } = action.set
      newExercises = JSON.parse(JSON.stringify(allExercises));
      const newSet = {
        reps: parseInt(reps, 10),
        weight: parseInt(weight, 10),
        _id: id
      };

      // I really should normalize all these data to avoid this crap.
      exerIndex = -1;
      let setIndex = -1;
      let endLoop = false;
      for (let i = 0, len = newExercises.length; i < len; i++) {
        let currentExercise = newExercises[i];
        exerIndex = i;
        for (let j = 0, jlen = currentExercise.sets.length; j < jlen; j++) {
          let currentSet = currentExercise.sets[j];
          setIndex = j;
          if (currentSet._id === id) {
            endLoop = true;
            break;
          }
        }
        if (endLoop) {
          break;
        }
      }
      newExercises[exerIndex].sets[setIndex] = newSet;
      return { ...state, allExercises: newExercises };
    case ADD_SET:

      // DEEP copy of exercise array
      newExercises = JSON.parse(JSON.stringify(allExercises));

      // look for exercise index
      index = -1;
      for (let i = 0, len = newExercises.length; i < len; i++) {
        let current = newExercises[i];
        if (current.date === action.date &&
          current.month === action.month &&
          current.year === action.year &&
          current.exercise === action.exercise &&
          current.muscle === action.muscle) {
          index = i;
          break;
        }
      }

      if (index < 0) {
        // add new exercise
        newExercises.push({
          date: action.date,
          month: action.month,
          year: action.year,
          muscle: action.muscle,
          exercise: action.exercise,
          sets: [ action.set ]
        });
      } else {
        // add to existing exercise
        newExercises[index].sets.push(action.set);
      }
      return { ...state, allExercises: newExercises };
    case LOG_OUT:
      return { ...state, allExercises: [] };
    default:
      return state;
  }
}

function findIndex() {
}

export default exercises;

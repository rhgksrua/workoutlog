import React from 'react';
import ReactDOM from 'react-dom';
import { ExerciseSummary } from './ExerciseSummary';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const props = {
    currentDate: {
      year: 1,
      month: 1,
      date: 1
    },
    todayExercise: {
      sets: []
    },
    match: {
      params: {
        muscle: 'chest',
        exercise: 'bench press'
      }
    },
    addSet: function() {}
  };

  shallow(<ExerciseSummary {...props} />);
});



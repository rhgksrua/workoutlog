import React from 'react';
import ReactDOM from 'react-dom';
import { AddExerciseFormWrapper as AddExercise } from './AddExercise';
import { shallow } from 'enzyme';

// AddExercise utilizes react-form
// Need to import react-form container instead of the bare componenet.

it('renders without crashing', () => {
  shallow(<AddExercise />);
});



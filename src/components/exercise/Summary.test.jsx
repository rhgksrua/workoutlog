import React from 'react';
import ReactDOM from 'react-dom';
import { Summary } from './Summary';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const props = {
    currentDate: {
      year: 1,
      month: 2,
      date: 3
    },
    todayExercise: []
  };
  shallow(<Summary {...props} />);
});



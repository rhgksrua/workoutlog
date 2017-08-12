import React from 'react';
import ReactDOM from 'react-dom';
import Exercise from './Exercise';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Exercise />);
});



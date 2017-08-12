import React from 'react';
import ReactDOM from 'react-dom';
import Exercises from './Exercises';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Exercises />);
});



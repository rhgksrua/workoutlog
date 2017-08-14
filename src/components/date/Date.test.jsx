import React from 'react';
import ReactDOM from 'react-dom';
import Date from './Date';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Date />);
});



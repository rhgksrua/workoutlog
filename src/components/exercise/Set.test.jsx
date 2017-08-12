import React from 'react';
import ReactDOM from 'react-dom';
import Set from './Set';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Set />);
});



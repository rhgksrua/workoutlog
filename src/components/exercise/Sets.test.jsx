import React from 'react';
import ReactDOM from 'react-dom';
import Sets from './Sets';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<Sets />);
});



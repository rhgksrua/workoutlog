import React from 'react';
import ReactDOM from 'react-dom';
import OwnerRoute from './OwnerRoute';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<OwnerRoute />);
});



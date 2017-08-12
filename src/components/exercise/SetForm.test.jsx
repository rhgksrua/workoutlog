import React from 'react';
import ReactDOM from 'react-dom';
import SetForm from './SetForm';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<SetForm />);
});



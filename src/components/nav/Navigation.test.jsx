import React from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const props = {
    authUser: () => {}
  };
  shallow(<Navigation {...props} />);
});



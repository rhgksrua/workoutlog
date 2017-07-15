import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import workout from './module';
import reducer from './reducers/reducer';
import logger from 'redux-logger';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
  thunk
];

if (process.env.NODE_ENV === 'development') {
  // redux logger
  middleware.push(logger);

  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  reducer,
  initialState,
  composedEnhancers
);

export default store;


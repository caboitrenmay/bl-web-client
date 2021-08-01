import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import {createEpicMiddleware} from 'redux-observable';
import thunk from 'redux-thunk';
import {IS_LOGGER} from '../helper/logger';
import rootReducer from './reducer';
import rootEpic from './action/middleware/observable/rootEpic';

// redux with Middleware redux observable
const epicMiddleware = createEpicMiddleware();
const storeWithObserable = () => {
  const store = createStore(
    rootReducer,
    IS_LOGGER
      ? applyMiddleware(epicMiddleware, {}, logger)
      : applyMiddleware(epicMiddleware, {}),
  );
  epicMiddleware.run(rootEpic);
  return store;
};

// redux with Middleware thunk
const storeWithThunk = createStore(
  rootReducer,
  IS_LOGGER ? applyMiddleware(thunk, logger) : applyMiddleware(thunk),
);

export const storeThunk = storeWithThunk;
export const storeObserable = storeWithObserable;

import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {IS_LOGGER} from './index';
import {newsReducer} from '../application';

// redux with Middleware thunk
const reducers = combineReducers({newsReducer});
const storeThunk = createStore(
  reducers,
  IS_LOGGER ? applyMiddleware(thunk, logger) : applyMiddleware(thunk),
);

export const store = storeThunk;

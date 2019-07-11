import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { reducers } from '../redusers/reducers.js';
import * as types from '../actions/actions';

// export const store = createStore(reducers, applyMiddleware(logger));
export const store = createStore(reducers);
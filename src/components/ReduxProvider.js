/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import reducers from '../modules/redux-core/reducers';

const { createLogger } = require('redux-logger');

const middlewares = [promise(), thunk];
middlewares.push(createLogger());

// TODO Add REDUX_DEVTOOLS_EXTENSION for debugging help
// const reduxDevTools =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  {},
  composeEnhancer(
    applyMiddleware(promise, thunk, createLogger({ collapsed: true }))
  )
);

function ReduxProvider(props) {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;

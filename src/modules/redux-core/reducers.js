/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { combineReducers } from 'redux';
import cancerSchemaReducer from '../cancer-schema/reducer';
import configReducer from '../config/reducer';

const reducers = combineReducers({
  cancerSchema: cancerSchemaReducer, // COMMENT: NOT BEING USED
  config: configReducer,
});

export default reducers;

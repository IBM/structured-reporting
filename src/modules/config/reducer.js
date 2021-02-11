/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import SWITCH_LANGUAGE from './actionTypes';
import {
  EN,
  COUCHDB_URL,
  DB_NAME_REPORTS,
  DB_NAME_LABS,
} from '../../api/constants';
import Api from '../../offline/Api';

const initialState = {
  api: new Api(COUCHDB_URL, DB_NAME_REPORTS, DB_NAME_LABS),
  language: localStorage.getItem('language') || EN,
};

const configReducer = (state = initialState, action) => {
  if (!action) {
    return initialState;
  }

  switch (action.type) {
    case SWITCH_LANGUAGE: {
      const language = action.payload;

      return {
        ...state,
        language,
      };
    }

    default:
      return state;
  }
};

export default configReducer;

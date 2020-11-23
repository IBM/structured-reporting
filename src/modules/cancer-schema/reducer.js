/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* COMMENT: This react module is not being used at the moment.
   It's left here for reference on how to fetch and process data from the server
 */

import get from 'lodash.get';
import GET_CANCER_SCHEMA from './actionTypes';

const initialState = {
  data: null,
  isLoading: false,
  error: false,
  errors: null,
};

const cancerSchemaReducer = (state = initialState, action) => {
  if (!action) {
    return initialState;
  }

  switch (action.type) {
    case GET_CANCER_SCHEMA.fulfilled(): {
      const { schema, formData } = get(action.payload, 'body');
      const data = { schema, formData };
      return {
        ...state,
        data,
        isLoading: false,
        error: false,
        errors: null,
      };
    }

    case GET_CANCER_SCHEMA.pending(): {
      return { ...state, isLoading: true };
    }

    case GET_CANCER_SCHEMA.rejected(): {
      const errors = get(action.payload.response, 'body.errors', null);

      return {
        ...state,
        isLoading: false,
        error: true,
        errors,
      };
    }
    default:
      return state;
  }
};

export default cancerSchemaReducer;

/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { fetchJSON } from '../../api/request';
import { SERVER_API_URL } from '../../api/constants';
import GET_CANCER_SCHEMA from './actionTypes';

/* COMMENT: This react module is not being used at the moment.
   It's left here for reference on how to fetch and process data from the server
 */

const getCancerSchema = cancerType => ({
  type: GET_CANCER_SCHEMA,
  payload: fetchJSON(`${SERVER_API_URL}/${cancerType}`),
});

export default getCancerSchema;

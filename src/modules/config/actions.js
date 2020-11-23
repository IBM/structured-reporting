/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import SWITCH_LANGUAGE from './actionTypes';

const switchLanguage = language => ({
  type: SWITCH_LANGUAGE,
  payload: language,
});

export default switchLanguage;

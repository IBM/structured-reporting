/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const createInputLabel = (label, required) => {
  const requiredText = required ? '*' : '';
  return `${label} ${requiredText}`;
};

export default createInputLabel;

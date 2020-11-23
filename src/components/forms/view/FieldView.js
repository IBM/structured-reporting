/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const TextinputWidget = ({ label, value }) => (
  <div className="app-fieldView">
    {label && label !== '' && (
      <span className="app-fieldView-label">{`${label}:`}</span>
    )}
    <span className="app-fieldView-value">{value ? `${value}` : '-'}</span>
  </div>
);

export default TextinputWidget;

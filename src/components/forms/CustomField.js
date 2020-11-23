/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const CustomField = props => {
  const { classNames, children } = props;

  return <div className={classNames}>{children}</div>;
};
export default CustomField;

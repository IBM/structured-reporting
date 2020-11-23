/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TextArea, FormItem } from 'carbon-components-react';
import createInputLabel from './utils';

const TextareaWidget = ({
  id,
  label,
  disabled = false,
  required,
  onChange,
  value,
  options = { col: 50, rows: 4 },
}) => (
  <FormItem>
    <TextArea
      disabled={disabled}
      id={id}
      invalid={false}
      labelText={createInputLabel(label, required)}
      light={false}
      defaultValue={value}
      onChange={event => onChange(event.target.value)}
      cols={options.cols}
      rows={options.rows}
    />
  </FormItem>
);

export default TextareaWidget;

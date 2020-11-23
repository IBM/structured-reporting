/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Checkbox, FormItem } from 'carbon-components-react';
import createInputLabel from './utils';

const CheckboxWidget = ({ id, label, disabled, required, onChange, value }) => (
  <FormItem>
    <Checkbox
      id={id}
      labelText={createInputLabel(label, required)}
      disabled={disabled}
      defaultChecked={value}
      onChange={event => onChange(event)}
    />
  </FormItem>
);

export default CheckboxWidget;

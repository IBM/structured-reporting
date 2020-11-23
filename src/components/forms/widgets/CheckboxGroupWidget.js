/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import replace from 'lodash.replace';
import { Checkbox, FormItem, FormLabel } from 'carbon-components-react';
import createInputLabel from './utils';

// TODO It doesn't accept default values for now. Check the rest of widgets for reference
const CheckboxGroupWidget = ({
  title,
  disabled,
  required,
  schema,
  onChange,
}) => {
  const { items } = schema;
  const customId = `-${title}-id`;

  const [itemValues, setItemValues] = useState([]);

  const handleChange = (event, key) => {
    const item = replace(key, customId, '');
    let updatedValues = itemValues;
    if (event) {
      updatedValues.push(item);
    } else {
      updatedValues = updatedValues.filter(currentItem => currentItem !== item);
    }
    setItemValues(updatedValues);
    onChange(updatedValues);
  };

  return (
    <FormItem>
      <FormLabel>{createInputLabel(schema.title, required)}</FormLabel>
      {items.enum.map(item => (
        <Checkbox
          id={`${item}${customId}`}
          disabled={disabled}
          key={`${item}${title}-key`}
          labelText={item}
          onChange={handleChange}
        />
      ))}
    </FormItem>
  );
};
export default CheckboxGroupWidget;

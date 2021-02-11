/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FormItem, Dropdown } from 'carbon-components-react';
import createInputLabel from './utils';

const DropdownWidget = ({
  id,
  label,
  required,
  disabled,
  onChange,
  schema,
  value,
  options,
}) => (
  <FormItem>
    <Dropdown
      disabled={disabled}
      id={id}
      required={required}
      selectedItem={value || options.initialSelectedItem}
      itemToString={item => {
        if (typeof item === 'string') {
          return item;
        }
        return item ? item.label : '';
      }}
      items={[...schema.enum]}
      label={createInputLabel(label, required)}
      onChange={({ selectedItem }) => {
        onChange(selectedItem);
      }}
    />
  </FormItem>
);

export default DropdownWidget;

/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  FormItem,
  FormGroup,
  RadioButtonGroup,
  RadioButton,
} from 'carbon-components-react';
import createInputLabel from './utils';

const RadioGroupWidget = ({
  id,
  label,
  required,
  disabled,
  onChange,
  schema,
  options,
  value,
}) => (
  <FormItem>
    <FormGroup
      invalid={false}
      legendText={createInputLabel(label, required)}
      message={false}
      messageText=""
      disabled={disabled}
    >
      <RadioButtonGroup
        defaultSelected={options.defaultSelected}
        labelPosition={options.labelPosition}
        name={id}
        legend={options.legend}
        onChange={event => onChange(event)}
        orientation={options.orientation}
        valueSelected={value || options.valueSelected}
      >
        {schema.enum.map((item, index) => (
          <RadioButton
            id={`${id}-${index}`}
            key={`${id}-${item}-key`}
            labelText={item}
            value={item}
          />
        ))}
      </RadioButtonGroup>
    </FormGroup>
  </FormItem>
);

export default RadioGroupWidget;

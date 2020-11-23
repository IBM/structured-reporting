/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { TextInput, FormItem } from 'carbon-components-react';
import createInputLabel from './utils';

const TextinputWidget = ({
  id,
  label,
  help,
  required,
  type,
  onChange,
  schema,
  value,
}) => (
  <FormItem>
    <div className="app-textinput">
      <TextInput
        id={id}
        labelText={createInputLabel(label, required)}
        helperText={help}
        type={type}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...(value && { defaultValue: value })}
        onChange={event => onChange(event.target.value)}
        required={required}
      />
      {schema.addon && (
        <span className="app-textinput-addon">{schema.addon}</span>
      )}
    </div>
  </FormItem>
);

export default TextinputWidget;

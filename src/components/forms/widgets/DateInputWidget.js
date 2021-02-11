/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FormItem, DatePicker, DatePickerInput } from 'carbon-components-react';
import { format } from 'date-fns';
import { EN } from '../../../api/constants';
import createInputLabel from './utils';

const dateReturnFormat = 'yyyy-MM-dd';
const defaultDisplayFormat = 'dd/MM/yyyy';
const defaultPlaceHolder = 'dd/mm/yyyy';

const convertDate = event => {
  try {
    return format(new Date(event), dateReturnFormat);
  } catch (error) {
    return event;
  }
};

const validateDate = event => {
  try {
    format(new Date(event), dateReturnFormat);
    return true;
  } catch (error) {
    return false;
  }
};

const DateInputWidget = ({
  id,
  label,
  required,
  disabled = false,
  onChange,
  value,
  options,
}) => (
  <FormItem>
    <DatePicker
      dateFormat={options.dateFormat || 'd/m/Y'}
      datePickerType={options.datePickerType || 'single'}
      id={id}
      locale={localStorage.getItem('language') || EN}
      onChange={event => onChange(convertDate(event, null))}
    >
      <DatePickerInput
        disabled={disabled}
        iconDescription={options.iconDescription || ''}
        id={`${id}-input`}
        invalid={false}
        defaultValue={
          value &&
          validateDate(value) &&
          format(new Date(value), options.placeholder || defaultDisplayFormat)
        }
        invalidText={options.invalidText || ''}
        labelText={createInputLabel(label, required)}
        onChange={event => onChange(convertDate(event.target.value, 'call'))}
        pattern={options.pattern}
        placeholder={options.placeholder || defaultPlaceHolder}
        type="text"
      />
    </DatePicker>
  </FormItem>
);

export default DateInputWidget;

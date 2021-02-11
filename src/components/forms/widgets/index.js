/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import CheckboxWidget from './CheckboxWidget';
import CheckboxGroupWidget from './CheckboxGroupWidget';
import DropdownWidget from './DropdownWidget';
import TextinputWidget from './TextinputWidget';
import TextareaWidget from './TextareaWidget';
import DateInputWidget from './DateInputWidget';
import RadioGroupWidget from './RadioGroupWidget';

const widgets = {
  CheckboxWidget,
  TextWidget: TextinputWidget,
  TextareaWidget,
  SelectWidget: DropdownWidget,
  DateWidget: DateInputWidget,
  CheckboxesWidget: CheckboxGroupWidget,
  RadioWidget: RadioGroupWidget,
};

export default widgets;

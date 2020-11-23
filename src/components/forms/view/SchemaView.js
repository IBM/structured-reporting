/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Form from 'react-jsonschema-form';
import CustomField from '../CustomField';
import CustomObjectView from './CustomObjectView';
import FieldView from './FieldView';

const widgets = {
  CheckboxWidget: FieldView,
  TextWidget: FieldView,
  TextareaWidget: FieldView,
  SelectWidget: FieldView,
  DateWidget: FieldView,
  CheckboxesWidget: FieldView,
  RadioWidget: FieldView,
};

const SchemaView = ({ schema, formData, uiSchema }) => {
  return (
    <Form
      schema={schema}
      formData={formData}
      FieldTemplate={CustomField}
      ObjectFieldTemplate={CustomObjectView}
      uiSchema={uiSchema}
      widgets={widgets}
      autoComplete="off"
    />
  );
};

export default SchemaView;

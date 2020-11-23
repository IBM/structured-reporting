/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { TextArea, FormItem, Button } from 'carbon-components-react';
import SchemaForm from '../components/forms/SchemaForm';

const Playground = () => {
  const [input, setInput] = useState();
  const [schema, setSchema] = useState();
  const [uiSchema, setUiSchema] = useState();
  const [formData, setformData] = useState();

  const handleChange = event => {
    setInput(JSON.parse(event.target.value));
  };

  const createForm = () => {
    if (input) {
      setSchema(input.schema);
      setUiSchema(input.uiSchema);
      setformData(input.formData);
    }
  };

  const clearForm = () => {
    setSchema(undefined);
    setUiSchema(undefined);
    setformData(undefined);
  };

  const reportObj = { schema, uiSchema, formData };

  return (
    <Content className="app-playground">
      {!schema && (
        <FormItem className="app-playground-textarea">
          <TextArea
            id="playground-textarea"
            invalid={false}
            labelText="Add your schema here:"
            light={false}
            onChange={handleChange}
            cols={120}
            rows={20}
          />
        </FormItem>
      )}
      <Button
        className={schema && 'button-clear'}
        disabled={false}
        iconDescription="Button icon"
        kind="primary"
        onClick={schema ? clearForm : createForm}
        size="default"
        tabIndex={0}
        type="button"
      >
        {schema ? 'Clear form' : 'Create form'}
      </Button>

      {schema ? (
        <SchemaForm report={reportObj} />
      ) : (
        <h4>No valid json form uploaded</h4>
      )}
    </Content>
  );
};

export default Playground;

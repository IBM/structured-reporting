/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

const onFocus = (id, value) => console.log('onFocus:', id, value);
const onBlur = (id, value) => console.log('onBlur:', id, value);
const onChange = args => window.postMessage({ type: 'form-change', args });
const onSubmit = (data, context) => {
  // create the record to save into the database, and remove unwanted data
  data._id = context.reportObj._id;
  data._rev = context.reportObj._rev;
  delete data.idSchema;
  delete data.additionalMetaSchemas;
  data.status = context.status || 'draft';

  context.api
    .saveReport(data)
    .then(result => {
      if (result && result.ok) {
        // update browser copy of report with new id and revision
        data._id = result.id;
        data._rev = result.rev;
        context.reportObj = data;
        window.postMessage({ type: 'form-success', data });
        return true;
      }
      return false;
    })
    .catch(err => {
      window.postMessage({ type: 'form-error', error: err });
    });

  return false;
};
const onError = args => {
  window.postMessage({ type: 'form-error', errors: args });
};

export { onFocus, onBlur, onChange, onSubmit, onError };

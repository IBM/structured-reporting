/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import SchemaView from './forms/view/SchemaView';

const ReportView = ({ reportData, labInfo }) => {
  return (
    <div className="app-formview--grid">
      <div className="bx--grid">
        <div className="bx--row app-formview-titles">
          <div className="bx--col-lg-9">
            <h3>{reportData.schema.title}</h3>
          </div>
          <div className="bx--col-lg-7" style={{ textAlign: 'right' }}>
            <legend>{labInfo.labName}</legend>
            <legend>{labInfo.labAddress}</legend>
            <legend>{labInfo.labContactNumber}</legend>
          </div>
        </div>
        <SchemaView
          schema={reportData.schema}
          uiSchema={reportData.uiSchema}
          formData={reportData.formData}
        />
      </div>
    </div>
  );
};

export default ReportView;

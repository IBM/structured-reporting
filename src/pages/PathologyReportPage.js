/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { withRouter, useParams } from 'react-router-dom';
import SchemaForm from '../components/forms/SchemaForm';

function loadExistingReport(reportId, setReportObj, api) {
  // edit an existing report
  api.findReportById(reportId).then(report => {
    if (report.status === 'completed') {
      throw new Error('Report is finalized and cannot be edited.');
    }

    setReportObj(report);
  });
}

function loadSchema(schemaName, language, setReportObj, demographics) {
  let demographicsObj = {};
  if (demographics) {
    try {
      demographicsObj = JSON.parse(demographics);
    } catch (err) {
      // ignore if invalid
      console.error(err);
    }
  }

  // find details of the specified schema
  let commonSchema;
  const commonSchemaUrl = `${window.location.origin}/schemas/${language}/common.json`;
  window
    .fetch(commonSchemaUrl)
    .then(commonSchemaResp => {
      commonSchemaResp.json().then(commonSchemaObj => {
        commonSchema = commonSchemaObj;
      });
    })
    .finally(() => {
      const schemaUrl = `${window.location.origin}/schemas/${language}/${schemaName}.json`;
      window.fetch(schemaUrl).then(resp =>
        resp.json().then(schemaObject => {
          // merge in the common schema
          // TODO - do deep-copy of only leaf nodes
          if (commonSchema) {
            Object.keys(commonSchema).forEach(key => {
              // eslint-disable-next-line no-param-reassign
              schemaObject.schema.properties[key] = commonSchema[key];
            });
          }

          const uiSchemaUrl = `${window.location.origin}/schemas/${schemaName}.json`;

          // fetch the metadata for the schema
          window.fetch(uiSchemaUrl).then(resp2 =>
            resp2.json().then(uiSchemaObject => {
              // render the new schema
              // eslint-disable-next-line no-param-reassign
              schemaObject.schema.schemaName = schemaName;

              const newFormData = uiSchemaObject.formData;
              Object.keys(demographicsObj)
                .filter(k =>
                  [
                    'last_name',
                    'first_name',
                    'date_of_birth',
                    'patient_identifier',
                  ].includes(k)
                )
                .forEach(
                  // eslint-disable-next-line no-return-assign
                  k => (newFormData.demographics[k] = demographicsObj[k])
                );

              setReportObj({
                schema: schemaObject.schema,
                uiSchema: uiSchemaObject.uiSchema,
                formData: newFormData,
              });
            })
          );
        })
      );
    });
}

const PathologyReportPage = ({ config, history }) => {
  const { reportId, schemaName, demographics } = useParams();
  const [reportObj, setReportObj] = React.useState({});

  useEffect(() => {
    // TODO this is only a temporary patch
    window.scrollTo(0, 0);
    if (reportId) {
      loadExistingReport(reportId, setReportObj, config.api);
    } else if (schemaName) {
      loadSchema(schemaName, config.language, setReportObj, demographics);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.language, reportId, schemaName]);

  return (
    <Content className="app-form--scroll">
      {reportObj && reportObj.schema && (
        <SchemaForm config={config} history={history} report={reportObj} />
      )}
    </Content>
  );
};

export const mapStateToProps = state => {
  return {
    config: state.config,
  };
};

export default withRouter(connect(mapStateToProps)(PathologyReportPage));

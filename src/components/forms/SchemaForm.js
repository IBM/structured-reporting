/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import Form from 'react-jsonschema-form';
import { Button } from 'carbon-components-react';
import * as actions from './form-actions';
import widgets from './widgets';
import CustomField from './CustomField';
import CustomObject from './CustomObject';
import ToastNotificationComponent from '../ToastNotification';
import messages from './messages';
import { EN } from '../../api/constants';

function handleMessagesFromActions(
  report,
  intl,
  setIsNotificationError,
  setIsNotificationOpen,
  setNotificationMessage,
  history
) {
  // TODO: refactor this to use react-json-schema functionality
  // Messages posted back from form-actions.js
  window.addEventListener('message', ev => {
    const msg = ev.data;

    if (msg.type && msg.type === 'form-change') {
      // form data updated
      // eslint-disable-next-line no-param-reassign
      report.formData = msg.args.formData;
      setIsNotificationOpen(false);
    }

    if (msg.type && msg.type === 'form-success') {
      // form data successfully saved
      setIsNotificationError(false);
      setIsNotificationOpen(true);
      setNotificationMessage(
        intl.formatMessage(messages.formNotificacionSuccess)
      );
      if (report.status === 'submitted') history.push('/reportlist');
    }

    if (msg.type && msg.type === 'form-error') {
      // errors in the form
      setIsNotificationError(true);
      setIsNotificationOpen(true);

      let errMsg = '';
      if (msg.errors && msg.errors.length) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < msg.errors.length; i++) {
          errMsg += `${msg.errors[i].stack}\r\n`;
        }
      } else {
        errMsg = JSON.stringify(msg.error);
      }

      setNotificationMessage(errMsg);
    }
  });
}

const SchemaForm = ({ config, report, intl, history }) => {
  let yourForm;

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNotificationError, setIsNotificationError] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [expand, setExpand] = useState(false);

  const formContext = {
    api: config && config.api,
    reportObj: report,
    schemaName: report.schema.schemaName,
    language: intl.locale || EN,
    status: 'draft',
  };

  handleMessagesFromActions(
    report,
    intl,
    setIsNotificationError,
    setIsNotificationOpen,
    setNotificationMessage,
    history
  );

  // TODO Refactor this to use React Code by passing the expanded prop to the Accordion with true/false
  const toggleAccordians = () => {
    const them = document.getElementsByClassName('bx--accordion__heading');

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < them.length; i++) {
      if (
        (expand && them[i].getAttribute('aria-expanded') !== 'true') ||
        (!expand && them[i].getAttribute('aria-expanded') === 'true')
      )
        them[i].click();
    }

    setExpand(!expand); // change state of toggle button
  };

  const handleSubmit = status => {
    formContext.status = status;
    if (status === 'draft') {
      actions.onSubmit(report, formContext);
    } else {
      // eslint-disable-next-line no-unused-expressions
      yourForm && yourForm.submit();
    }
  };

  return (
    <div className="app-schema-form">
      {isNotificationOpen && (
        <ToastNotificationComponent
          title={
            !isNotificationError
              ? intl.formatMessage(messages.formNotificacionSuccess)
              : intl.formatMessage(messages.formNotificacionError)
          }
          onCloseButtonClick={() => setIsNotificationOpen(false)}
          subtitle={notificationMessage}
          kind={!isNotificationError ? 'success' : 'error'}
        />
      )}
      <Form
        ref={form => {
          yourForm = form;
        }}
        schema={report.schema}
        formContext={formContext}
        formData={report.formData}
        FieldTemplate={CustomField}
        ObjectFieldTemplate={CustomObject}
        uiSchema={report.uiSchema}
        widgets={widgets}
        onFocus={actions.onFocus}
        onBlur={actions.onBlur}
        onChange={actions.onChange}
        onSubmit={data => actions.onSubmit(data, formContext)}
        onError={actions.onError}
        autoComplete="off"
      >
        <div className="app-button-toolbar">
          <div style={{ flexGrow: 1 }}></div>
          <Button
            onClick={toggleAccordians}
            expand="true"
            style={{ width: '11em', background: 'white', color: 'black' }}
          >
            <img
              src={
                expand
                  ? 'images/toggle_expand.png'
                  : 'images/toggle_collapse.png'
              }
              height="16"
              width="16"
              alt={
                expand
                  ? intl.formatMessage(messages.expand)
                  : intl.formatMessage(messages.collapse)
              }
            />
            &nbsp;&nbsp;
            {expand
              ? intl.formatMessage(messages.expand)
              : intl.formatMessage(messages.collapse)}
          </Button>
          <Button
            disabled={false}
            onClick={() => handleSubmit('draft')}
            kind="secondary"
            tabIndex={0}
            type="button"
          >
            {intl.formatMessage(messages.save)}
          </Button>
          <Button
            disabled={false}
            kind="primary"
            onClick={() => handleSubmit('submitted')}
            tabIndex={0}
          >
            {intl.formatMessage(messages.submit)}
          </Button>
        </div>
      </Form>
      <br />
      <br />
    </div>
  );
};

export default injectIntl(SchemaForm);

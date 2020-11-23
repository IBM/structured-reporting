/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Modal,
  FormGroup,
  TextInput,
  Form,
  Button,
} from 'carbon-components-react';
import { injectIntl } from 'react-intl';
import messages from './messages';

const ApproveReport = ({ intl, open, onClose, onSubmit }) => {
  let yourForm;
  const [name, setName] = React.useState('');
  const [pin, setPin] = React.useState('');

  const handleSubmit = () => {
    if (yourForm) {
      yourForm.submit();
    } else {
      // bit hacky, but the yourForm method does not seem to work
      document.getElementsByClassName('approve-form-submit')[0].click();
    }
  };

  return (
    <Modal
      modalHeading={intl.formatMessage(messages.finalizeReport)}
      id="transactional-passive-modal"
      style={{ top: 10 }}
      open={open}
      onRequestClose={onClose}
      onRequestSubmit={handleSubmit}
      primaryButtonText={intl.formatMessage(messages.approve)}
      secondaryButtonText={intl.formatMessage(messages.cancel)}
      onSecondarySubmit={onClose}
    >
      <Form
        ref={form => {
          yourForm = form;
        }}
        id="approveForm"
        onSubmit={() => onSubmit(name, pin)}
      >
        <FormGroup legendText={intl.formatMessage(messages.approvalLegend)}>
          <TextInput
            id="name"
            labelText={intl.formatMessage(messages.patholigistName)}
            helperText={intl.formatMessage(messages.patholigistNameHelpText)}
            type="text"
            onChange={event => setName(event.target.value)}
            required
          />
          <TextInput
            id="pin"
            labelText={intl.formatMessage(messages.patholigistPin)}
            helperText={intl.formatMessage(messages.patholigistPinHelpText)}
            type="password"
            onChange={event => setPin(event.target.value)}
            required
          />
        </FormGroup>
        <Button
          className="approve-form-submit app-hidden"
          disabled={false}
          kind="primary"
          tabIndex={0}
          type="submit"
        >
          {intl.formatMessage(messages.approve)}
        </Button>
      </Form>
    </Modal>
  );
};

export default injectIntl(ApproveReport);

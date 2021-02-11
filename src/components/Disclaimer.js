/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Modal } from 'carbon-components-react';
import { injectIntl } from 'react-intl';
import messages from './messages';

const Disclaimer = ({ intl, open, onClose, onAccept }) => {
  return (
    <Modal
      modalHeading={intl.formatMessage(messages.disclaimer)}
      id="transactional-passive-modal"
      style={{ top: 10 }}
      open={open}
      onRequestClose={onClose}
      onRequestSubmit={() => {
        onAccept(true);
      }}
      primaryButtonText={intl.formatMessage(messages.disclaimerAccept)}
      secondaryButtonText={intl.formatMessage(messages.disclaimerReject)}
      onSecondarySubmit={onClose}
    >
      {intl.formatMessage(messages.disclaimerText)}
    </Modal>
  );
};

export default injectIntl(Disclaimer);

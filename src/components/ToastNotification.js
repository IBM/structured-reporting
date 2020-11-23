/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ToastNotification as Toast } from 'carbon-components-react';
import { injectIntl } from 'react-intl';
import messages from './messages';

const ToastNotification = ({
  intl,
  hideCloseButton,
  kind,
  subtitle,
  title,
  onCloseButtonClick,
}) => (
  <Toast
    style={{
      width: '80%',
      position: 'absolute',
      top: '65px',
      zIndex: 100,
      whiteSpace: 'pre-line',
    }}
    title={title || intl.formatMessage(messages.notificationTitle)}
    onCloseButtonClick={onCloseButtonClick}
    hideCloseButton={hideCloseButton || false}
    iconDescription={intl.formatMessage(messages.notificationTitle)}
    kind={kind}
    notificationType="toast"
    role="alert"
    subtitle={<span>{subtitle}</span>}
    caption=""
  />
);
export default injectIntl(ToastNotification);

/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { defineMessages } from 'react-intl';

export const messages = defineMessages({
  welcome: {
    id: 'loginPage.title',
    defaultMessage: 'Welcome to Structured Reporting',
  },
  forgotPassword: {
    id: 'loginPage.forgotPassword',
    defaultMessage: 'Forgot the password?',
  },
  loginButton: {
    id: 'loginPage.loginButton',
    defaultMessage: 'Login',
  },
  userName: {
    id: 'loginPage.userName',
    defaultMessage: 'Username',
  },
  password: {
    id: 'loginPage.password',
    defaultMessage: 'Password',
  },
  disclaimer: {
    id: 'loginPage.disclaimer',
    defaultMessage:
      'Reminder: This is a prototype. Do not include personally identifiable information or protected health information (PHI)',
  },
  comingSoon: {
    id: 'reportListPage.comingSoon',
    defaultMessage: 'Coming soon',
  },
  incorrectPin: {
    id: 'reportViewPage.incorrectPin',
    defaultMessage: 'Invalid PIN code',
  },
  btnEdit: {
    id: 'reportViewPage.btnEdit',
    defaultMessage: 'Edit',
  },
  btnNewPatientReport: {
    id: 'reportViewPage.btnNewPatientReport',
    defaultMessage: 'New Patient Report',
  },
  btnApprove: {
    id: 'reportViewPage.btnApprove',
    defaultMessage: 'Approve',
  },
  btnPrint: {
    id: 'reportViewPage.btnPrint',
    defaultMessage: 'Print',
  },
  status: {
    id: 'reportViewPage.status',
    defaultMessage: 'Status',
  },
  reportNotSubmitted: {
    id: 'reportViewPage.reportNotSubmitted',
    defaultMessage: 'Report must be submitted before it can be approved.',
  },
});

export default messages;

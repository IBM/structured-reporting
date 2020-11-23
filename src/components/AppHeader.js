/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  Header,
  HeaderName,
  SkipToContent,
  HeaderGlobalBar,
} from 'carbon-components-react/lib/components/UIShell';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import LanguageSwitcher from './LanguageSwitcher';
import messages from './messages';
import '../scss/App.scss';

const AppHeader = ({ intl }) => (
  <Header className="app-header app-no-print" aria-label="Carbon Tutorial">
    <SkipToContent />
    <HeaderName element={Link} to="/reportlist" prefix="">
      <img width="32" height="32" alt="logo" src="logo192.png" />
      {intl.formatMessage(messages.appName)}
    </HeaderName>
    <HeaderGlobalBar>
      <LanguageSwitcher />
    </HeaderGlobalBar>
  </Header>
);
export default injectIntl(AppHeader);

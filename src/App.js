/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ReduxProvider, IntlConfig } from './components';
import AppHeader from './components/AppHeader';
import {
  LoginPage,
  ReportListPage,
  ReportViewPage,
  PathologyReportPage,
  Playground,
} from './pages';
import './scss/App.scss';

function App() {
  return (
    <ReduxProvider>
      <IntlConfig>
        <AppHeader />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/reportlist" component={ReportListPage} />
          <Route path="/reportview/:reportId" component={ReportViewPage} />
          <Route path="/reportedit/:reportId" component={PathologyReportPage} />
          <Route
            path="/reportnew/:schemaName"
            component={PathologyReportPage}
          />
          <Route
            path="/reportfor/:schemaName/:demographics"
            component={PathologyReportPage}
          />
          <Route path="/playground" component={Playground} />
        </Switch>
      </IntlConfig>
    </ReduxProvider>
  );
}

export default App;

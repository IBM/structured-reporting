/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Content } from 'carbon-components-react/lib/components/UIShell';
import ReportList from '../components/ReportList';
import AddNewReport from '../components/AddNewReport';
import messages from './messages';

const findAllReports = (config, callback) => {
  config.api.findAllReports({ limit: 100 }).then(results => {
    callback(results);
  });
};

const ReportListPage = ({ config, history, intl }) => {
  // TODO use hooks
  const [reports, setReports] = React.useState({ total_rows: 0, rows: [] });
  const [showNewDialog, setShowNewDialog] = React.useState(false);

  function onAction(what, evt, selectedRows) {
    if (what === 'new') {
      // user clicked "add new" button
      setShowNewDialog(true);
    } else if (what === 'click') {
      // user clicked on a report in the list
      history.push(`/reportview/${selectedRows.id}`);
    }
  }

  function onBatchAction(what, selectedItems) {
    if (selectedItems.length > 0) {
      // TODO: some items were selected, but this function isn't called when the actual batch action is clicked!
      window.alert(intl.formatMessage(messages.comingSoon));
    }
  }

  function onSearchChange(searchString) {
    if (searchString === '') {
      findAllReports(config, setReports);
    } else {
      // Called when user presses Enter in the search field (i.e. search archives)
      config.api.searchReports(searchString).then(setReports);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    window.api = config.api;

    if (!window.localStorage.getItem('labId')) {
      // user didn't login in
      history.push('/');
      return;
    }

    findAllReports(config, setReports);
  }, [config, history]);

  return (
    <Content className="app-reportList">
      <div className="app-reportList--size">
        <AddNewReport
          config={config}
          open={showNewDialog}
          onClose={() => setShowNewDialog(false)}
          onSubmit={value => {
            history.push(`/reportnew/${value}`);
          }}
        />
        <ReportList
          config={config}
          reports={reports}
          onSearchChange={onSearchChange}
          onBatchAction={onBatchAction}
          onAction={onAction}
        />
      </div>
    </Content>
  );
};

export const mapStateToProps = state => {
  return {
    config: state.config,
  };
};

export default withRouter(injectIntl(connect(mapStateToProps)(ReportListPage)));

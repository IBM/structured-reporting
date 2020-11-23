/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, useParams } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Content, Button } from 'carbon-components-react';
import ToastNotificationComponent from '../components/ToastNotification';
import ReportView from '../components/ReportView';
import AddNewReport from '../components/AddNewReport';
import ApproveReport from '../components/ApproveReport';
import messages from './messages';

function ReportViewPage({ config, history, intl }) {
  const { reportId } = useParams();
  if (!reportId) {
    throw new Error('reportId not specified');
  }

  const [report, setReport] = useState({});
  const [labInfo, setLabInfo] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openApproveDialog, setOpenApproveDialog] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isNotificationError, setIsNotificationError] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    config.api.findReportById(reportId).then(doc1 => {
      config.api.getLabInfo(localStorage.getItem('labId')).then(doc2 => {
        setReport(doc1);
        setLabInfo(doc2);
      });
    });
  }, [config, reportId]);

  function onClick(what) {
    setIsNotificationOpen(false);

    switch (what) {
      case 'edit':
        history.push(`/reportedit/${reportId}`);
        break;
      case 'new':
        window.scroll(0, 0);
        setOpenAddDialog(true);
        break;
      case 'approve':
        if (report.status !== 'completed') {
          window.scroll(0, 0);
          setOpenApproveDialog(true);
        }
        break;
      case 'print':
        window.print();
        break;
      default:
        break;
    }
  }

  function onAddNew(schema) {
    history.push(
      `/reportfor/${schema}/${JSON.stringify(report.formData.demographics)}`
    );
  }

  function onApprove(name, pin) {
    if (report.status !== 'submitted') {
      // cannot approve a draft report
      setNotificationMessage(intl.formatMessage(messages.reportNotSubmitted));
      setIsNotificationOpen(true);
      setIsNotificationError(true);
      setOpenApproveDialog(false);
    } else if (labInfo) {
      if (pin === labInfo.signOffKey) {
        // save doctor name and change status
        report.formData.demographics.doctor_name = name;
        report.status = 'completed';
        config.api.saveReport(report);
        setOpenApproveDialog(false);
        history.push('/reportlist');
      } else {
        // show invalid pin
        setNotificationMessage(intl.formatMessage(messages.incorrectPin));
        setIsNotificationOpen(true);
        setIsNotificationError(true);
        setOpenApproveDialog(false);
      }
    }
  }

  return (
    <>
      {report && report.formData && report.formData.demographics && (
        <Content className="app-viewform--flexdirection app-no-position">
          {isNotificationOpen && (
            <ToastNotificationComponent
              subtitle={notificationMessage}
              kind={!isNotificationError ? 'success' : 'error'}
            />
          )}
          <AddNewReport
            config={config}
            open={openAddDialog}
            onSubmit={onAddNew}
            onClose={() => setOpenAddDialog(false)}
          />
          <ApproveReport
            config={config}
            open={openApproveDialog}
            onSubmit={onApprove}
            onClose={() => setOpenApproveDialog(false)}
          />
          <div className="app-button-toolbar-view app-no-print">
            <div
              style={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'left',
                alignItems: 'center',
                paddingLeft: '16px',
              }}
            >
              <b>{intl.formatMessage(messages.status)}:</b>&nbsp;
              {report.status}
            </div>
            {report.status !== 'completed' && (
              <Button onClick={() => onClick('edit')}>
                {intl.formatMessage(messages.btnEdit)}
              </Button>
            )}
            <Button onClick={() => onClick('new')}>
              {intl.formatMessage(messages.btnNewPatientReport)}
            </Button>
            {report.status === 'submitted' && (
              <Button onClick={() => onClick('approve')}>
                {intl.formatMessage(messages.btnApprove)}
              </Button>
            )}
            <Button onClick={() => onClick('print')}>
              {intl.formatMessage(messages.btnPrint)}
            </Button>
          </div>
          <ReportView config={config} reportData={report} labInfo={labInfo} />
        </Content>
      )}
    </>
  );
}

export const mapStateToProps = state => {
  return {
    config: state.config,
  };
};

export default withRouter(connect(mapStateToProps)(injectIntl(ReportViewPage)));

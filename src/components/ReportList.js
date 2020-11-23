/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-param-reassign */
import React from 'react';
import {
  Button,
  DataTable,
  TableToolbar,
  Search,
  TableToolbarContent,
  TableBatchAction,
  TableBatchActions,
  TableSelectAll,
  TableSelectRow,
} from 'carbon-components-react';
import { DocumentAdd32 } from '@carbon/icons-react';
import { injectIntl } from 'react-intl';
import messages from './messages';

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
} = DataTable;

const ReportList = ({
  config,
  intl,
  onSearchChange,
  reports,
  onBatchAction,
  localSearch,
  onAction,
}) => {
  const [lastSearch, setLastSearch] = React.useState('');

  function search(searchString) {
    if (searchString !== lastSearch) {
      setLastSearch(searchString);
      onSearchChange(searchString);
    }
  }

  return (
    <DataTable
      id="reportlist"
      locale={config.language}
      headers={[
        {
          header: intl.formatMessage(messages.orderDate),
          key: 'request_date',
        },
        {
          header: intl.formatMessage(messages.patientId),
          key: 'patient_identifier',
        },
        {
          header: intl.formatMessage(messages.patientName),
          key: 'full_name',
        },
        {
          header: intl.formatMessage(messages.cancerType),
          key: 'cancer_type',
        },
        {
          header: intl.formatMessage(messages.doctorName),
          key: 'doctor_name',
        },
        {
          header: intl.formatMessage(messages.status),
          key: 'status',
        },
      ]}
      rows={reports.rows.map(row => {
        // eslint-disable-next-line no-param-reassign
        row.doc.id = row.id;
        row.doc.full_name =
          row.doc.formData && row.doc.formData.demographics
            ? `${row.doc.formData.demographics.first_name} ${row.doc.formData.demographics.last_name}`
            : '';

        try {
          // eslint-disable-next-line prefer-destructuring
          row.doc.request_date = new Date(row.doc.created_at)
            .toISOString()
            .split('T')[0];
        } catch (err) {
          row.doc.request_date = '';
        }

        if (row.doc.formData && row.doc.formData.demographics) {
          row.doc.patient_identifier =
            row.doc.formData.demographics.patient_identifier;
          row.doc.laboratory_number =
            row.doc.formData.demographics.laboratory_number;
          row.doc.doctor_name = row.doc.formData.demographics.doctor_name;
        }

        if (row.doc.schema && row.doc.schema.title) {
          // eslint-disable-next-line prefer-destructuring
          row.doc.cancer_type = row.doc.schema.title
            .split(':')[0]
            .substring(0, 30);
        }

        return row.doc;
      })}
      isSortable
      render={({
        rows,
        headers,
        getHeaderProps,
        getSelectionProps,
        getBatchActionProps,
        onInputChange,
        selectedRows,
      }) => (
        <TableContainer
          title={`${intl.formatMessage(messages.reports)} (${
            reports.total_rows
          })`}
        >
          <TableToolbar>
            {/* make sure to apply getBatchActionProps so that the bar renders */}
            <TableBatchActions {...getBatchActionProps()}>
              {/* inside of you batch actinos, you can include selectedRows */}
              <TableBatchAction
                onClick={() => {
                  onBatchAction('download', selectedRows);
                }}
              >
                {intl.formatMessage(messages.download)}
              </TableBatchAction>
              <TableBatchAction
                onClick={() => {
                  onBatchAction('export', selectedRows);
                }}
              >
                {intl.formatMessage(messages.exportRegistry)}
              </TableBatchAction>
            </TableBatchActions>

            <TableToolbarContent>
              {/* pass in `onInputChange` change here to make filtering work */}
              <Search
                placeHolderText={intl.formatMessage(messages.searchMessage)}
                labelText={intl.formatMessage(messages.searchReports)}
                onKeyUp={evt => {
                  if (evt.keyCode === 13) {
                    search(evt.target.value);
                  }
                }}
                onBlur={evt => {
                  search(evt.target.value);
                }}
                onChange={evt => {
                  // allow as-you-type local filtering if it is enabled
                  if (localSearch) onInputChange(evt);
                }}
              />

              <Button
                renderIcon={DocumentAdd32}
                onClick={evt => {
                  onAction('new', evt, selectedRows);
                }}
                size="small"
                kind="primary"
              >
                {intl.formatMessage(messages.addNew)}
              </Button>
            </TableToolbarContent>
          </TableToolbar>

          <Table useZebraStyles>
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />
                {headers.map(header => (
                  <TableHeader {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map(row => (
                <TableRow
                  key={row.id}
                  onClick={evt => {
                    if (evt.target.tagName === 'TD')
                      onAction('click', evt, row);
                  }}
                >
                  <TableSelectRow {...getSelectionProps({ row })} />
                  {row.cells.map(cell => (
                    <TableCell key={cell.id}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
};

export default injectIntl(ReportList);

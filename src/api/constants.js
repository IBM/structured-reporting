/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

const SERVER_API_URL = ""; // not used
const ES = 'es';
const EN = 'en';

const DB_NAME_REPORTS =
  process.env.NODE_ENV === 'production'
    ? 'prod-reports'
    : 'dev-reports';

const DB_NAME_LABS = 'sr-labs';

const COUCHDB_URL =
  process.env.NODE_ENV === 'production'
    ? '[COUCHDB_PRODUCTION_URL]'    // replace with full URL to your production CouchDB server
    : '[OPTIONAL_COUCHDB_DEV_URL]'; // replace with full URL to your development CouchDB server

const LAB_INFO = {
  _id: 'the_lab_id',
  labName: 'The Lab Name',
  labContactNumber: '(+XX) XX XXX XXXX',
  labAddress: 'Address, Country',
  signOffKey: '9263789', // pin code for signing off reports for this lab
};

export {
  SERVER_API_URL,
  ES,
  EN,
  COUCHDB_URL,
  LAB_INFO,
  DB_NAME_REPORTS,
  DB_NAME_LABS,
};

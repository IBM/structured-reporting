/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable no-param-reassign */
import PouchDB from 'pouchdb-browser';
import plugin from 'pouchdb-find';
import plugin2 from 'pouchdb-quick-search'; // see https://github.com/pouchdb-community/pouchdb-quick-search

const FULL_TEXT_SEARCH_FIELDS = [
  'status',
  'formData.demographics.first_name',
  'formData.demographics.last_name',
  'formData.demographics.patient_identifier',
  'formData.demographics.laboratory_number',
];

class Api {
  constructor(serverUrl, dbName, labsDbName) {
    PouchDB.plugin(plugin);
    PouchDB.plugin(plugin2);

    this.db = new PouchDB(dbName);
    this.labDb = new PouchDB(labsDbName);
    this.setupDatabase(`${serverUrl}/${dbName}`);
  }

  setupDbReplication(serverUrl) {
    if (serverUrl) {
      try {
        // check server url is valid
        // eslint-disable-next-line no-unused-vars
        const url = new URL(serverUrl); // will throw exception if it's invalid

        // set up replication
        this.remoteDb = new PouchDB(serverUrl, { auto_compaction: true });

        this.replicationHandler = this.db.replicate
          .to(this.remoteDb, {
            live: true,
            retry: true,
          })
          .on('error', error => {
            console.error('Error during CouchDb replication', error);
          });
      } catch (err) {
        console.error('Invalid CouchDB url, skipping replication', serverUrl);
      }
    }
  }

  setupDbIndexes() {
    // set up indexes
    // this is commented out because it creates a design doc that comes up in the report list!
    // this.db.createIndex({
    //   index: {
    //     fields: ['updated_at', 'created_at'],
    //     name: 'by_date',
    //     ddoc: 'by_date',
    //     type: 'json',
    //   },
    // });

    this.db.search({
      fields: FULL_TEXT_SEARCH_FIELDS,
      build: true,
    });
  }

  setupDatabase(serverUrl) {
    this.setupDbReplication(serverUrl);
    this.setupDbIndexes();
  }

  searchReports(searchString) {
    return this.db.search({
      query: searchString,
      fields: FULL_TEXT_SEARCH_FIELDS,
      include_docs: true,
    });
  }

  findReportById(reportId) {
    return this.db.get(reportId);
  }

  findAllReports(options) {
    return this.db.allDocs({
      include_docs: true,
      limit: 10,
      ...options,
    });
  }

  saveReport(report) {
    if (!report.created_at) {
      report.created_at = new Date().getTime();
    }

    report.updated_at = new Date().getTime();

    if (report._id && report._rev) {
      return this.db.put(report);
    }

    return this.db.post(report);
  }

  getLabInfo(labId) {
    return labId
      ? this.labDb.get(labId)
      : new Promise((resolve, reject) =>
          reject(new Error('No labId specified'))
        );
  }

  saveLabInfo(labInfo) {
    return new Promise((resolve, reject) => {
      this.getLabInfo(labInfo._id)
        .then(res => {
          // update existing record
          labInfo._rev = res._rev;
          resolve(this.labDb.put(labInfo));
        })
        .catch(err => {
          if (err.status === 404) {
            // add new labInfo record
            resolve(this.labDb.post(labInfo));
          }

          reject(err);
        });
    });
  }
}

export default Api;

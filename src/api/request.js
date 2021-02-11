/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* COMMENT: This api is not being used at the moment.
   It's left here for reference on how to fetch and process data from the server
   See src/modules/cancer-schema/actions.
 */

const defaults = require('superagent-defaults');

const superagent = defaults();

superagent
  .set('Accept', 'application/json')
  .set('Content-Type', 'application/json');

export const fetchJSON = url => superagent.get(url).unset('X-CSRF-TOKEN');

export const fetchJSONWithParams = (url, params = {}) =>
  superagent
    .get(url)
    .query(params)
    .unset('X-CSRF-TOKEN');

export const post = (url, formData) =>
  superagent
    .post(url)
    .type('form')
    .send(formData);

export const postJSON = (url, json) =>
  superagent
    .post(url)
    .type('json')
    .send(json);

export const putJSON = (url, json) =>
  superagent
    .put(url)
    .type('json')
    .send(json);

export const del = url => superagent.del(url);

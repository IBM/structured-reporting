/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

/* eslint-disable import/no-extraneous-dependencies */
const { injectManifest } = require('workbox-build');

const swSrc = './src/sw-template.js';
const swDest = 'build/service-worker.js';
injectManifest({
  swSrc,
  swDest,
  globDirectory: 'build',
  globPatterns: ['**/*.{js,css,html,png,ico,json,pdf}'],
}).then(({ count, size }) => {
  console.log(
    `Generated ${swDest}, which will precache ${count} files, totaling ${size} bytes.`
  );
});

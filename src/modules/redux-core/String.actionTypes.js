/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

Object.assign(String.prototype, {
  fulfilled() {
    return `${this}_FULFILLED`;
  },
});

Object.assign(String.prototype, {
  pending() {
    return `${this}_PENDING`;
  },
});

Object.assign(String.prototype, {
  rejected() {
    return `${this}_REJECTED`;
  },
});

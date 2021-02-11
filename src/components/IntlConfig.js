/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { EN, ES } from '../api/constants';

import messagesEN from '../locales/en.json';
import messagesES from '../locales/es.json';

const messages = {
  es: messagesES,
  en: messagesEN,
};

function IntlConfig(props) {
  const { config, children } = props;

  const language = config.language === EN ? EN : ES;

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      {children}
    </IntlProvider>
  );
}

export const mapStateToProps = (state: Object) => {
  return {
    config: state.config,
  };
};

export default connect(mapStateToProps, null)(IntlConfig);

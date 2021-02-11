/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Dropdown } from 'carbon-components-react';
import switchLanguage from '../modules/config/actions';
import messages from './messages';
import { EN, ES } from '../api/constants';

const ENmessage = 'English';
const ESmessage = 'Español';

function languageToCode(language) {
  switch (language) {
    case ENmessage:
      return EN;
    case ESmessage:
      return ES;
    default:
      return EN;
  }
}

function codeToLanguage(code) {
  switch (code) {
    case EN:
      return ENmessage;
    case ES:
      return ESmessage;
    default:
      return ENmessage;
  }
}

const LanguageSwitcher = ({ intl, setLanguage, config }) => {
  useEffect(() => {
    setLanguage(config.language);
  }, [config.language, setLanguage]);

  return (
    <Dropdown
      className="app_language_switcher"
      ariaLabel={intl.formatMessage(messages.languageSwitcher)}
      id="language-switcher"
      initialSelectedItem={codeToLanguage(config.language)}
      itemToString={item => {
        if (typeof item === 'string') {
          return item;
        }
        return item ? item.label : '';
      }}
      items={[ENmessage, ESmessage]}
      label=""
      onChange={({ selectedItem }) => {
        const language = languageToCode(selectedItem);
        setLanguage(language);
      }}
      type="inline"
    />
  );
};

export const mapStateToProps = state => {
  return {
    config: state.config,
  };
};

const mapDispatchToProps = dispatch => ({
  setLanguage: language => {
    localStorage.setItem('language', language);
    dispatch(switchLanguage(language));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(LanguageSwitcher));

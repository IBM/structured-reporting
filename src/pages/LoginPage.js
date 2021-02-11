/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { TextInput, Form, Button, Link } from 'carbon-components-react';
import { MD5 } from 'pouchdb-quick-search/lib/pouch-utils';
import { LAB_INFO } from '../api/constants';
import messages from './messages';
import '../scss/login.scss';
import Disclaimer from '../components/Disclaimer';

const LoginPage = ({ intl, config, history }) => {
  const [userName, setUserName] = useState();
  const [userNameValid, setUserNameValid] = useState(true);
  const [password, setPassword] = useState();
  const [passwordValid, setPasswordValid] = useState(true);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  // function disclaimer() {
  //   setShowDisclaimer(true);
  // }

  function onCloseDisclaimer() {
    setShowDisclaimer(false);
  }

  function doLogin() {
    setShowDisclaimer(false);

    // load user and lab info
    window.localStorage.setItem('labId', LAB_INFO._id);
    // TODO - change this to some system admin function: create default lab info (currently hardcoded)
    LAB_INFO.user = {
      userId: userName,
      token: MD5(userName + password),
    };

    config.api.saveLabInfo(LAB_INFO).then(() => {
      // redirect
      history.push('/reportlist');
    });
  }

  return (
    <div className="app-login">
      <div className="app-login-container">
        <Disclaimer
          open={showDisclaimer}
          onAccept={doLogin}
          onClose={onCloseDisclaimer}
        />
        <Form
          className="app-login--form"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <div className="bx--fieldset">
            <h3>{intl.formatMessage(messages.welcome)}</h3>
          </div>
          <div className="app-login--link ">
            <Link href="/other">
              {intl.formatMessage(messages.forgotPassword)}
            </Link>
          </div>
          <TextInput
            id="user_name"
            className="app-login--input"
            onChange={evt => {
              setUserNameValid(false);
              setUserName(evt.target.value);
            }}
            labelText={intl.formatMessage(messages.userName)}
            placeholder={intl.formatMessage(messages.userName)}
            type="string"
            required
          />
          <TextInput
            id="password"
            className="app-login--input"
            onChange={evt => {
              setPassword(evt.target.value);
              setPasswordValid(false);
            }}
            labelText={intl.formatMessage(messages.password)}
            placeholder={intl.formatMessage(messages.password)}
            type="password"
            required
          />
          <Button
            disabled={userNameValid || passwordValid}
            className="bx--fieldset app-login--button"
            size="field"
            type="submit"
            onClick={() => doLogin()}
          >
            {intl.formatMessage(messages.loginButton)}
          </Button>
          <div>
            <span>{intl.formatMessage(messages.disclaimer)}</span>
          </div>
        </Form>
      </div>
    </div>
  );
};
export const mapStateToProps = state => {
  return {
    config: state.config,
    state,
  };
};

export default withRouter(connect(mapStateToProps)(injectIntl(LoginPage)));

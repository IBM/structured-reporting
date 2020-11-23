/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import {
  Modal,
  FormGroup,
  RadioButtonGroup,
  RadioButton,
} from 'carbon-components-react';
import { injectIntl } from 'react-intl';
import messages from './messages';

const loadAllSchemas = (
  config,
  schemaList,
  setSchemaList,
  setSchemaData,
  setSchemaListReady
) => {
  // load each schema in the schemaList
  const newSchemaData = {};

  const checkIfAllSchemasLoaded = (newSchemaData2, schemaList2) => {
    if (Object.keys(newSchemaData2).length === schemaList2.length) {
      // all schemas have loaded
      setSchemaList(schemaList2);
      setSchemaData(newSchemaData2);
      setSchemaListReady(true);
    }
  };

  schemaList.forEach(schemaName => {
    const schemaDataUrl = `${window.location.origin}/schemas/${config.language}/${schemaName}.json`;
    window.fetch(schemaDataUrl).then(respSchemaData => {
      respSchemaData
        .json()
        .then(schemaDataObj => {
          // save the schema into the state
          newSchemaData[schemaName] = schemaDataObj;

          checkIfAllSchemasLoaded(newSchemaData, schemaList);
        })
        .catch(err => {
          console.error(`Error loading schema ${schemaName}`, err);
          // unable to load a schema, so let's remove it from our list
          setSchemaList(schemaList.filter(i => i !== schemaName));
          checkIfAllSchemasLoaded(newSchemaData, schemaList);
        });
    });
  });
};

const loadSchemaList = (
  config,
  setSchemaList,
  setSchemaData,
  setSchemaListReady
) => {
  const schemaListUrl = `${window.location.origin}/schemas/schemas.json`;

  // first fetch the list of schemas that we care about
  window.fetch(schemaListUrl).then(resp =>
    resp.json().then(schemaListResponse => {
      loadAllSchemas(
        config,
        schemaListResponse.schemas,
        setSchemaList,
        setSchemaData,
        setSchemaListReady
      );
    })
  );
};

const AddNewReport = ({ intl, config, open, onClick, onClose, onSubmit }) => {
  const [value, setValue] = React.useState('prostate-cancer');
  const [schemaListReady, setSchemaListReady] = React.useState(false);
  const [schemaList, setSchemaList] = React.useState([]);
  const [schemaData, setSchemaData] = React.useState({});

  useEffect(() => {
    loadSchemaList(config, setSchemaList, setSchemaData, setSchemaListReady);
  }, [config, config.language]);

  if (open) {
    if (schemaList.length === 1) {
      // go directly to the only schema available
      onSubmit(schemaList[0]);
    }
  }

  return (
    <Modal
      modalHeading={intl.formatMessage(messages.selectCancerType)}
      id="transactional-passive-modal"
      style={{ top: 10 }}
      open={open}
      onClick={onClick}
      onRequestClose={onClose}
      onRequestSubmit={() => {
        onSubmit(value);
      }}
      primaryButtonText={intl.formatMessage(messages.create)}
      secondaryButtonText={intl.formatMessage(messages.cancel)}
      onSecondarySubmit={onClose}
    >
      <FormGroup legendText={intl.formatMessage(messages.selectCancerType)}>
        {schemaListReady && (
          <RadioButtonGroup
            name="cancerType"
            onChange={newVal => {
              setValue(newVal);
            }}
            defaultSelected={value}
            orientation="vertical"
          >
            {schemaList &&
              schemaList.map(type => (
                <RadioButton
                  key={`${type}-key`}
                  labelText={schemaData[type].schema.title}
                  value={type}
                />
              ))}
          </RadioButtonGroup>
        )}
      </FormGroup>
    </Modal>
  );
};

export default injectIntl(AddNewReport);

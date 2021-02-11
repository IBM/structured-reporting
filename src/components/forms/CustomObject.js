/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import slice from 'lodash.slice';
import { Accordion, AccordionItem, Link } from 'carbon-components-react';

const CustomObject = ({
  title,
  description,
  properties,
  uiSchema,
  formContext,
}) => {
  const {
    isAccordionItem,
    isAccordionParent,
    isAccordionItemDemographics,
  } = uiSchema;
  const columns = parseInt(uiSchema.gridColumns, 10);

  const gridWithOneColumn = () => {
    return properties.map(element => {
      return (
        <div key={`${element.name}-section-key`} className="bx--row">
          <div className="bx--col">{element.content}</div>
        </div>
      );
    });
  };

  const gridCreateRow = (row, key) => {
    return (
      <div className="bx--row" key={key}>
        {row.map(element => {
          return (
            <div key={`${element.name}-section-col-key`} className="bx--col">
              {element.content}
            </div>
          );
        })}
      </div>
    );
  };

  const gridWithColumns = () => {
    const rowNumber = Math.ceil(properties.length / columns);

    const rows = [];
    for (let i = 0; i < rowNumber; i += 1) {
      const startRow = i * columns;
      const endRow = startRow + columns;
      rows.push(slice(properties, startRow, endRow));
    }

    return (
      <>
        {rows.map((row, index) => gridCreateRow(row, `${title}-row-${index}`))}
      </>
    );
  };

  const showNotes = () => {
    window.open(
      `/schemas/${formContext.language}/${formContext.schemaName}.pdf`,
      'notes'
    );
  };

  const getClassNameAccordion = () => {
    if (isAccordionParent)
      return 'bx--grid app_object_properties app-form--shadow';
    if (isAccordionItemDemographics) {
      return 'bx--grid app_object_properties app_object_demographics';
    }
    return 'bx--grid app_object_properties';
  };

  const addAccordionItem = () => {
    return (
      <AccordionItem open title={title.toUpperCase()}>
        {formContext.schemaName ? (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
          <Link href={window.location.href} onClick={showNotes}>
            {description}
          </Link>
        ) : (
          description
        )}
        <div className="bx--grid app_object_properties">
          {!columns ? gridWithOneColumn() : gridWithColumns()}
        </div>
      </AccordionItem>
    );
  };
  return (
    <>
      {isAccordionItem ? (
        addAccordionItem(title, description)
      ) : (
        <Accordion className={isAccordionParent ? 'app-form--accordion' : ''}>
          {isAccordionParent ? (
            <h3>{title}</h3>
          ) : (
            <legend
              className={isAccordionItemDemographics ? 'app-form-title' : ''}
            >
              {title}
            </legend>
          )}
          {description}
          <div className={getClassNameAccordion()}>
            {!columns ? gridWithOneColumn() : gridWithColumns()}
          </div>
        </Accordion>
      )}
    </>
  );
};
export default CustomObject;

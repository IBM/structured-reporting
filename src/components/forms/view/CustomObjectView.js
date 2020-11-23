/**
 * Copyright 2020 IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import slice from 'lodash.slice';

const CustomObjectView = ({ title, properties, uiSchema }) => {
  const { isAccordionItem, isAccordionParent } = uiSchema;
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

  const gridCreateRow = (row, key, lastRow = false) => {
    return (
      <div className="bx--row" key={key}>
        {row.map((element, index) => {
          return (
            <div
              key={`${element.name}-section-col-key`}
              className={`bx--col ${isAccordionParent &&
                'app-section-col'} ${index % 2 === 0 &&
                'app-section-first-column'} ${lastRow &&
                'app-section-first-last-row'}`}
            >
              {element.content}
            </div>
          );
        })}
      </div>
    );
  };

  const gridWithColumns = forceColumns => {
    const columnsNumber = forceColumns || columns;
    const existDemographics =
      properties[0] && properties[0].name === 'demographics';
    let demographicsObject;
    let propertiesList;

    if (existDemographics) {
      propertiesList = slice(properties, 1, properties.length);
      // eslint-disable-next-line prefer-destructuring
      demographicsObject = properties[0];
    } else {
      propertiesList = properties;
    }
    const rowNumber = Math.ceil(propertiesList.length / columnsNumber);

    const rows = [];
    for (let i = 0; i < rowNumber; i += 1) {
      const startRow = i * columnsNumber;
      const endRow = startRow + columnsNumber;
      rows.push(slice(propertiesList, startRow, endRow));
    }

    return (
      <>
        {existDemographics && (
          <div
            key={`${demographicsObject.name}-section-key`}
            className="bx--row"
          >
            <div className="bx--col app-section-demographics">
              {demographicsObject.content}
            </div>
          </div>
        )}
        {rows.map((row, index) => {
          return gridCreateRow(
            row,
            `${title}-row-${index}`,
            isAccordionParent && index + 1 === rows.length
          );
        })}
      </>
    );
  };

  const addSection = () => (
    <div className="app-section-view">
      <h5>{title.toUpperCase()}</h5>

      <div className="bx--grid app_object_properties">
        {!columns ? gridWithOneColumn() : gridWithColumns()}
      </div>
    </div>
  );

  return (
    <>
      {isAccordionItem ? (
        addSection()
      ) : (
        <>
          <div
            className={
              isAccordionParent
                ? 'bx--grid app_object_properties app-form--shadow'
                : 'bx--grid app_object_properties'
            }
          >
            {gridWithColumns(2)}
          </div>
        </>
      )}
    </>
  );
};
export default CustomObjectView;

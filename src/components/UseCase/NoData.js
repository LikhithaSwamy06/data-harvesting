import React from 'react';
import './styles.css';

function NoData() {
  return (
    <div className="nodata-container">
      <div className="nodata-title">sample-synthetic-healthcare.csv (810.57 KB)</div>
      <div className="nodata-items-container">
        <div className="nodata-title">
          <span className="nodata-items-v1">Records:</span>9999
        </div>
        <div className="nodata-title">
          <span className="nodata-items-v1">Fields:</span>18
        </div>
        <div className="nodata-title">
          <span className="nodata-items-v1">Approx. training time :</span>6 mins
        </div>
      </div>
      <div className="nodata-subtitle">
        Use this sample dataset to synthesize a new set of records.
      </div>
    </div>
  );
}

export default NoData;
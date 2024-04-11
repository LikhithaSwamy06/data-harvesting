import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import './styles.css';

function NoData() {
  return (
    <div className="nodata-container">
      <div className="nodata-title">
        sample-synthetic-healthcare.csv (810.57 KB)
      </div>
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
        Use this sample electronic health records (EHR) dataset to synthesize an
        entirely new set of statistically equivalent records.
      </div>
    </div>
  );
}

export default NoData;

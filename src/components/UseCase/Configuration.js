// Dashboard.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CustomizedSteppers from './CustomizedStepper';
import './styles.css';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function Configuration({ activeStep, setActiveStep }) {
  const [uploadedFile, setUploadedFile] = useState('no file selected');
  const [configurationName, setConfigurationName] = useState('');
  const [configurationList, setConfigurationList] = useState([
    'tabular-actagan',
    'amplify',
    'natural-language',
  ]);
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/dashboard/data-artifact');
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
      <Toolbar sx={{ mb: 2 }} />
      <CustomizedSteppers activeStep={activeStep} />
      <h1>Almost done!</h1>
      <h3>We've chosen a model configuration based on your selections</h3>
      <FormControl sx={{ m: 1, minWidth: '50%', height: '40px', mb: 5 }}>
        <label className="newconnection-label">
          Dataharvesting configuration
        </label>
        <Select
          value={configurationName}
          onChange={(e) => setConfigurationName(e?.target?.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {configurationList?.map((item) => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ m: 1 }}>
        <div className="newconnection-label">or upload your own</div>
        <div>
          <label
            htmlFor="fileInput"
            className="btn-primary"
            style={{ marginBottom: '15px' }}
          >
            Upload your own
          </label>
          <label className="nodata-items-v1">{uploadedFile}</label>
          <input
            type="file"
            id="fileInput"
            style={{ display: 'none' }}
            accept=".csv,.json"
            onChange={(event) => setUploadedFile('Uploaded Successfully')}
          />
        </div>
        <div className="nodata-items-v1">Must be .yml or .yaml</div>
      </Box>
      <div className="btn-container">
        <Button className="btn-primary" onClick={() => handleContinue()}>
          Run
        </Button>
        <Button
          className="btn-secondary"
          onClick={() => {
            setActiveStep(1);
            navigate('/dashboard/data-artifacts');
          }}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
}

export default Configuration;

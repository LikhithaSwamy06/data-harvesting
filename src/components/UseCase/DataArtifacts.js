// Dashboard.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CustomizedSteppers from './CustomizedStepper';
import Upload from './Upload';
import NewConnection from './NewConnection';
import NoData from './NoData';
import './styles.css';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

function DataArtifacts({ activeStep, setActiveStep }) {
  const [artifactType, setArtifactType] = useState('');
  const [dataArtifactList, setDataArtifactList] = useState([
    {
      title: `I have a data artifact ready to upload. \n Click the button to select a local file, or drag and drop it into the upload window.`,
      value: 'upload',
    },
    {
      title: `I would like to connect to my external data source. \n Select an existing connection or create a new one.`,
      value: 'new',
    },
    {
      title: `I dont have a data source. \n No worries, just use our sample dataset to get started.`,
      value: 'nodata',
    },
  ]);
  const navigate = useNavigate();

  const handleArtifactTypeChange = (event) => {
    setArtifactType(event.target.value);
  };

  const handleContinue = () => {
    setActiveStep(2);
    navigate('/dashboard/configuration');
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
      <Toolbar sx={{ mb: 2 }} />
      <CustomizedSteppers activeStep={activeStep} />
      <h1>Where's your data artifact?</h1>
      <h3>Let's begin by defining your input data</h3>
      <FormControl sx={{ width: '100%' }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={artifactType}
          name="radio-buttons-group"
          onChange={handleArtifactTypeChange}
        >
          <div
            className="project-card"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <FormControlLabel
              value={dataArtifactList[0]?.value}
              control={<Radio />}
              label={dataArtifactList[0]?.title}
            />
            {artifactType === 'upload' && <Upload />}
          </div>
          <div
            className="project-card"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <FormControlLabel
              value={dataArtifactList[1]?.value}
              control={<Radio />}
              label={dataArtifactList[1]?.title}
            />
            {artifactType === 'new' && <NewConnection />}
          </div>
          <div
            className="project-card"
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <FormControlLabel
              value={dataArtifactList[2]?.value}
              control={<Radio />}
              label={dataArtifactList[2]?.title}
            />
            {artifactType === 'nodata' && <NoData />}
          </div>
        </RadioGroup>
      </FormControl>
      <div className="btn-container">
        <Button className="btn-primary" onClick={() => handleContinue()}>
          Continue
        </Button>
        <Button
          className="btn-secondary"
          onClick={() => {
            setActiveStep(0);
            navigate('/dashboard/project');
          }}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
}

export default DataArtifacts;

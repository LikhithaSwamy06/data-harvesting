import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CustomizedSteppers from './CustomizedStepper';
import './styles.css';
import { Button } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

function Projects({ activeStep, setActiveStep }) {
  const [age, setAge] = useState('');
  const [newProject, setNewProject] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectList, setProjectList] = useState([]);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setAge(event.target.value);
    if (event.target.value === 'new') {
      setNewProject(true);
    } else {
      setNewProject(false);
    }
  };

  const handleContinue = () => {
    setActiveStep(1);
    if (projectName) {
      setProjectList([...projectList, projectName]);
    }
    navigate('/dashboard/data-artifacts');
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
      <Toolbar sx={{ mb: 2 }} />
      <CustomizedSteppers activeStep={activeStep} />
      <h1>Choose a project</h1>
      <h3>Select an existing project or create a new one</h3>

      <div className="project-card">
        <FormControl sx={{ m: 1, minWidth: '50%', height: '40px' }}>
          <Select value={age} onChange={handleChange} displayEmpty>
            <MenuItem value="new">Create a new project</MenuItem>
            <MenuItem value="default">Default project</MenuItem>
            {projectList?.map((item, idx) => (
              <MenuItem key={idx} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {newProject && (
          <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
            <OutlinedInput
              placeholder="Project name"
              onChange={(e) => setProjectName(e.target.value)}
            />
          </FormControl>
        )}
      </div>

      <div className="btn-container">
        <Button className="btn-primary" onClick={handleContinue}>
          Continue
        </Button>
        <Button
          className="btn-secondary"
          onClick={() => {
            setActiveStep(0);
            navigate('/dashboard');
          }}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
}

export default Projects;

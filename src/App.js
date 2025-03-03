import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import SideNav from './components/common/SideNav';
import SignIn from './components/SignIn/SignIn';
import HeaderDrawer from './components/common/HeaderDrawer';
import Dashboard from './components/Dashboard/Dashboard';

import Projects from './components/UseCase/Projects';
import DataArtifacts from './components/UseCase/DataArtifacts';
import Configuration from './components/UseCase/Configuration';
import DataPreview from './components/UseCase/DataPreview'; // NEW PAGE

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

// Handle nested routes for your wizard
function DashboardRoutes() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <HeaderDrawer />
      <SideNav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/project"
          element={<Projects activeStep={activeStep} setActiveStep={setActiveStep} />}
        />
        <Route
          path="/data-artifacts"
          element={
            <DataArtifacts activeStep={activeStep} setActiveStep={setActiveStep} />
          }
        />
        <Route
          path="/configuration"
          element={
            <Configuration activeStep={activeStep} setActiveStep={setActiveStep} />
          }
        />
        {/* New route for data table preview */}
        <Route
          path="/data-preview"
          element={<DataPreview activeStep={activeStep} setActiveStep={setActiveStep} />}
        />
      </Routes>
    </>
  );
}

export default App;

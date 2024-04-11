import React from 'react';
import { Button } from '@mui/material';
import './styles.css';

function Main() {
  return (
    <div className="main-container">
      <div className="leftcontainer">
        <div className="home-heading">
          The <span className="home-heading-color">synthetic data</span>{' '}
          platform for developers.
        </div>
        <div className="home-subtitle">
          Generate artificial datasets with the same characteristics as real
          data, so you can develop and test AI models without compromising
          privacy.
        </div>
        <div className="main-btn-container">
          <Button className="start-btn">Start for free</Button>
          <Button className="request-btn">Request for demo</Button>
        </div>
      </div>
    </div>
  );
}

export default Main;

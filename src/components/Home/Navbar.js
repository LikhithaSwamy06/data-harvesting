import React from 'react';
import { Button } from '@mui/material';
import './styles.css';

function Navbar() {
  return (
    <div className="nav-bar">
      <div className="nav-container">
        <h2 style={{ margin: '0px' }}>Data Harvesting</h2>
        <nav className="nav-menu">
          <div id="cta-console" className="navbar-btn">
            <Button variant="contained" className="navbar-btn-color">
              Console
            </Button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;

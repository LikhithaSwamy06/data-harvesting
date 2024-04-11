// Dashboard.js
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import './styles.css';
import AutoSearch from './AutoSearch';
import SideNav from './SideNav';
import { AppBar, Box, CssBaseline } from '@mui/material';

function HeaderDrawer() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // You can perform your search logic here
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <div className="header">
          <div className="header-container">
            <h2 style={{ margin: '0px' }}>Data Harvesting</h2>
            <AutoSearch onChange={handleSearchChange} value={searchTerm} />
          </div>
          <div>
            <IconButton aria-label="account of current user" color="inherit">
              <BookmarksOutlinedIcon />
            </IconButton>
            <IconButton aria-label="account of current user" color="inherit">
              <SupportAgentOutlinedIcon />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </AppBar>
      <SideNav />
    </Box>
  );
}

export default HeaderDrawer;

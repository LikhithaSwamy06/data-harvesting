import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import './styles.css';

function NewConnection() {
  return (
    <FormControl sx={{ m: 1, minWidth: '50%', height: '40px', px: 3 }}>
      <label className="newconnection-label">Connection</label>
      <Select value="add" inputProps={{ 'aria-label': 'Without label' }}>
        <MenuItem value="add">Select or add new connection --</MenuItem>
        <MenuItem value="new">+ New Connection</MenuItem>]
      </Select>
    </FormControl>
  );
}

export default NewConnection;

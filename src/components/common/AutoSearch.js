import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { Transition } from 'react-transition-group';
import './styles.css';

const AutoSearch = ({ onChange, value }) => {
  const [expanded, setExpanded] = useState(false);

  const handleInputClick = () => {
    setExpanded(true);
  };

  const handleBlur = () => {
    setExpanded(false);
  };

  return (
    <div
      style={{
        position: 'relative',
        marginLeft: '10px',
        width: expanded ? '300px' : '150px',
        transition: 'width 0.3s',
      }}
    >
      <Transition in={expanded} timeout={300}>
        {(state) => (
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            onChange={onChange}
            value={value}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: <SearchIcon color="disabled" />,
            }}
            onClick={handleInputClick}
            style={{ transition: 'width 0.3s' }}
          />
        )}
      </Transition>
    </div>
  );
};

export default AutoSearch;

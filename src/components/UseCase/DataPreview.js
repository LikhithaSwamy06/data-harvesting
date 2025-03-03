import React, { useState, useMemo } from 'react';
import { useDataUpload } from '../../contexts/DataUploadContext';
import {
  Box,
  Button,
  Toolbar,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import CustomizedSteppers from './CustomizedStepper';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

import Papa from 'papaparse';
import * as XLSX from 'xlsx';

const SAMPLE_COLUMNS = [
  { field: 'id', headerName: 'ID', width: 70, editable: false },
  { field: 'Name', headerName: 'Name', width: 150, editable: true },
  { field: 'Age', headerName: 'Age', width: 100, editable: true },
  { field: 'City', headerName: 'City', width: 150, editable: true },
];
const SAMPLE_ROWS = [
  { id: 1, Name: 'Alice', Age: 25, City: 'New York' },
  { id: 2, Name: 'Bob', Age: 30, City: 'Los Angeles' },
  { id: 3, Name: 'Charlie', Age: 28, City: 'Chicago' },
];

function DataPreview({ activeStep, setActiveStep }) {
  const navigate = useNavigate();
  const { tableData, setTableData, didUploadFile } = useDataUpload();

  // If user uploaded a file, use that data; otherwise sample
  const initialColumns = tableData?.columns || SAMPLE_COLUMNS;
  const initialRows = tableData?.rows || SAMPLE_ROWS;

  const [columns, setColumns] = useState(initialColumns);
  const [rows, setRows] = useState(initialRows);
  const [darkMode, setDarkMode] = useState(false);

  // We keep a history of row-states for undo/redo
  const [history, setHistory] = useState([{ rows: initialRows }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const pushToHistory = (updatedRows) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ rows: updatedRows });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // On cell edit commit => update rows & push to history
  const handleCellEditCommit = (params) => {
    const { id, field, value } = params;
    const updatedRows = rows.map((r) => {
      if (r.id === id) {
        return { ...r, [field]: value };
      }
      return r;
    });
    setRows(updatedRows);
    pushToHistory(updatedRows);
  };

  // Undo/Redo
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setRows(history[newIndex].rows);
    }
  };
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setRows(history[newIndex].rows);
    }
  };

  // Copy, Cut, Paste (simple version - single cell)
  const [clipboardValue, setClipboardValue] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (params) => {
    setSelectedCell(params);
  };

  const handleCopy = () => {
    if (selectedCell) {
      setClipboardValue(selectedCell.value);
    }
  };

  const handleCut = () => {
    if (selectedCell) {
      setClipboardValue(selectedCell.value);
      const updated = rows.map((r) => {
        if (r.id === selectedCell.id) {
          return { ...r, [selectedCell.field]: '' };
        }
        return r;
      });
      setRows(updated);
      pushToHistory(updated);
    }
  };

  const handlePaste = () => {
    if (selectedCell && clipboardValue != null) {
      const updated = rows.map((r) => {
        if (r.id === selectedCell.id) {
          return { ...r, [selectedCell.field]: clipboardValue };
        }
        return r;
      });
      setRows(updated);
      pushToHistory(updated);
    }
  };

  // Delete selected row => for simplicity, delete the row of last clicked cell
  const handleDeleteSelected = () => {
    if (selectedCell) {
      const updated = rows.filter((r) => r.id !== selectedCell.id);
      setRows(updated);
      pushToHistory(updated);
      setSelectedCell(null);
    }
  };

  // Delete all rows
  const handleDeleteAllRows = () => {
    if (window.confirm('Are you sure you want to delete ALL rows?')) {
      setRows([]);
      pushToHistory([]);
    }
  };

  // Add row
  const handleAddRow = () => {
    const newId = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    const newRow = { id: newId };
    columns.forEach((col) => {
      if (col.field !== 'id') {
        newRow[col.field] = '';
      }
    });
    const updated = [...rows, newRow];
    setRows(updated);
    pushToHistory(updated);
  };

  // Download CSV
  const handleDownloadCSV = () => {
    const data = rows.map((r) => {
      const rowObj = {};
      columns.forEach((col) => {
        rowObj[col.field] = r[col.field];
      });
      return rowObj;
    });
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'my-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download Excel
  const handleDownloadExcel = () => {
    const data = rows.map((r) => {
      const rowObj = {};
      columns.forEach((col) => {
        rowObj[col.field] = r[col.field];
      });
      return rowObj;
    });
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'my-data.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dark mode style
  const dataGridStyles = useMemo(() => {
    return {
      height: 500,
      width: '100%',
      backgroundColor: darkMode ? '#1e1e1e' : '#fff',
      color: darkMode ? '#fff' : '#000',
    };
  }, [darkMode]);

  // Go back
  const handleBack = () => {
    setActiveStep(2);
    navigate('/dashboard/configuration');
  };

  // Save updated table data back to context
  const handleDone = () => {
    setTableData({ columns, rows });
    alert('Table data saved. You can proceed with your next steps.');
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
      <Toolbar sx={{ mb: 2 }} />
      <CustomizedSteppers activeStep={activeStep} />

      <h1>Data Preview</h1>
      <h3>
        {didUploadFile
          ? 'Below is the data you uploaded'
          : 'Using sample data because no file was uploaded'
        }
      </h3>

      <Box sx={{ mb: 1 }}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          }
          label="Dark Mode"
        />
      </Box>

      {/* Toolbar: Copy, Cut, Paste, Undo, Redo, Delete, etc. */}
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
        <IconButton onClick={handleCopy} title="Copy">
          <ContentCopyIcon />
        </IconButton>
        <IconButton onClick={handleCut} title="Cut">
          <ContentCutIcon />
        </IconButton>
        <IconButton onClick={handlePaste} title="Paste">
          <ContentPasteIcon />
        </IconButton>
        <IconButton onClick={handleUndo} title="Undo">
          <UndoIcon />
        </IconButton>
        <IconButton onClick={handleRedo} title="Redo">
          <RedoIcon />
        </IconButton>
        <IconButton onClick={handleDeleteSelected} title="Delete Selected Row">
          <DeleteIcon />
        </IconButton>
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAllRows}
        >
          Delete All Rows
        </Button>
        <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddRow}>
          Add Row
        </Button>
      </Box>

      <div style={dataGridStyles}>
        <DataGrid
          rows={rows}
          columns={columns}
          onCellEditCommit={handleCellEditCommit}
          onCellClick={handleCellClick}
          checkboxSelection
        />
      </div>

      {/* Download CSV/Excel */}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button variant="contained" startIcon={<SaveAltIcon />} onClick={handleDownloadCSV}>
          Download CSV
        </Button>
        <Button variant="contained" startIcon={<SaveAltIcon />} onClick={handleDownloadExcel}>
          Download Excel
        </Button>
      </Box>

      <Box className="btn-container" sx={{ mt: 4 }}>
        <Button className="btn-secondary" onClick={handleBack}>
          Back
        </Button>
        <Button className="btn-primary" onClick={handleDone}>
          Done
        </Button>
      </Box>
    </Box>
  );
}

export default DataPreview;

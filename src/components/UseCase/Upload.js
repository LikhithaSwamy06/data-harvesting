import React, { useState } from 'react';
import './styles.css';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { useDataUpload } from '../../contexts/DataUploadContext';

function Upload() {
  const [dragging, setDragging] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('No file selected');

  const { setTableData, setDidUploadFile } = useDataUpload();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      let rows = [];
      let columns = [];

      if (file.name.toLowerCase().endsWith('.csv')) {
        // Parse CSV
        const text = await file.text();
        const parsed = Papa.parse(text, { header: true });
        rows = parsed.data; // array of objects
        if (parsed.meta.fields) {
          columns = parsed.meta.fields.map((field) => ({
            field,
            headerName: field,
            editable: true,
            width: 150,
          }));
        }
      } else if (
        file.name.toLowerCase().endsWith('.xlsx') ||
        file.name.toLowerCase().endsWith('.xls')
      ) {
        // Parse Excel
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        if (jsonData.length > 0) {
          // First row is header
          const header = jsonData[0];
          columns = header.map((col) => ({
            field: col,
            headerName: col,
            editable: true,
            width: 150,
          }));
          // Build row data
          rows = jsonData.slice(1).map((row, idx) => {
            const rowObj = {};
            header.forEach((h, i) => {
              rowObj[h] = row[i] !== undefined ? row[i] : '';
            });
            return { id: idx + 1, ...rowObj };
          });
        }
      } else {
        alert('Only .csv or .xlsx/.xls are accepted');
        return;
      }

      // Ensure each row has a unique "id"
      if (rows.length > 0 && !rows[0].id) {
        rows = rows.map((r, i) => ({ id: i + 1, ...r }));
      }

      // Store in context
      setTableData({ columns, rows });
      setDidUploadFile(true);
      setUploadStatus(`Uploaded: ${file.name}`);
    } catch (err) {
      console.error('Error uploading file:', err);
      alert('Error parsing file. See console for details.');
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = () => {
    setDragging(false);
  };
  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      const fileInput = { target: { files: [file] } };
      handleFileChange(fileInput);
    }
  };

  return (
    <div
      className={`drop-container dotted-box ${dragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label
        htmlFor="fileInput"
        className="btn-primary"
        style={{ marginBottom: '15px' }}
      >
        Choose CSV or Excel
      </label>{' '}
      or drag & drop a CSV / Excel file here
      <br />
      <small>{uploadStatus}</small>

      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept=".csv,.xlsx,.xls"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default Upload;

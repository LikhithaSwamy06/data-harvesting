import React, { useState } from 'react';
import './styles.css';

function Upload() {
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState('');

  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', 'Dragged item');
    setDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    const data = event.dataTransfer.getData('text/plain');
    setUploadedFile('Uploaded Successfully');
  };

  return (
    <div
      className={`drop-container dotted-box ${dragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label
        htmlFor="fileInput"
        className="btn-primary"
        style={{ marginBottom: '15px' }}
      >
        Choose file
      </label>{' '}
      or drag and drop a CSV, JSON(L), or Parquet file here to upload <br />
      {uploadedFile}
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        accept=".csv,.json"
        onChange={(event) => setUploadedFile('Uploaded Successfully')}
      />
    </div>
  );
}

export default Upload;

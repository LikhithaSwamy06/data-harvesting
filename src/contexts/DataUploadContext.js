import React, { createContext, useState, useContext } from 'react';


const DataUploadContext = createContext(null);

export function DataUploadProvider({ children }) {
  const [tableData, setTableData] = useState(null);
  const [didUploadFile, setDidUploadFile] = useState(false);

  return (
    <DataUploadContext.Provider
      value={{ tableData, setTableData, didUploadFile, setDidUploadFile }}
    >
      {children}
    </DataUploadContext.Provider>
  );
}

export function useDataUpload() {
  return useContext(DataUploadContext);
}


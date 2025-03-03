import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { DataUploadProvider } from './contexts/DataUploadContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <DataUploadProvider>
      <App />
    </DataUploadProvider>
  </StrictMode>
);


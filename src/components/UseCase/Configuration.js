import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CustomizedSteppers from './CustomizedStepper';
import {
  Button,
  FormControl,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Editor from 'react-monaco-editor';
import yaml from 'js-yaml';

import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import DownloadIcon from '@mui/icons-material/Download';

import { useDataUpload } from '../../contexts/DataUploadContext';

const DEFAULT_YAML = `schema_version: "1.0"
name: "navigator_ft"
models:
  - navigator_ft:
      data_source: __tmp__
      group_training_examples_by: null
      order_training_examples_by: null
      generate:
        num_records: 5000
      params:
        num_input_records_to_sample: auto
`;

function Configuration({ activeStep, setActiveStep }) {
  const navigate = useNavigate();
  const { didUploadFile } = useDataUpload();

  const [uploadedFile, setUploadedFile] = useState('no file selected');
  const [configurationName, setConfigurationName] = useState('');
  const [configurationList] = useState([
    'tabular-actagan',
    'amplify',
    'natural-language',
  ]);

  const [yamlContent, setYamlContent] = useState(DEFAULT_YAML);
  const [tempContent, setTempContent] = useState(DEFAULT_YAML);

  const editorRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);

  const [theme, setTheme] = useState('vs'); // "vs" (light) or "vs-dark" (dark)
  const [position, setPosition] = useState({ lineNumber: 1, column: 1 });
  const [validationMessage, setValidationMessage] = useState('YAML is valid');

  // File upload for YAML (completely optional):
  const handleFileChange = (event) => {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const newContent = e.target.result;
      const confirmReplace = window.confirm(
        `Replace existing YAML with "${file.name}"?`
      );
      if (!confirmReplace) return;

      try {
        yaml.load(newContent);
        setValidationMessage('YAML is valid');
      } catch (err) {
        setValidationMessage(`Invalid YAML: ${err.message}`);
      }

      setYamlContent(newContent);
      setTempContent(newContent);
      setUploadedFile(file.name);
    };
    reader.readAsText(file);
  };

  // Editor onChange
  const handleEditorChange = (newValue) => {
    if (isEditing) {
      setTempContent(newValue);
      try {
        yaml.load(newValue);
        setValidationMessage('YAML is valid');
      } catch (err) {
        setValidationMessage(`Invalid YAML: ${err.message}`);
      }
    }
  };

  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.onDidChangeCursorPosition((e) => {
      const { lineNumber, column } = e.position;
      setPosition({ lineNumber, column });
    });
  };

  // Edit toggles
  const handleStartEdit = () => {
    setTempContent(yamlContent);
    setIsEditing(true);
    setTimeout(() => editorRef.current?.focus(), 0);
  };
  const handleSave = () => {
    setYamlContent(tempContent);
    setIsEditing(false);
  };
  const handleCancelEdit = () => {
    setTempContent(yamlContent);
    setIsEditing(false);
  };

  // Theme
  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'vs' ? 'vs-dark' : 'vs'));
  };

  // Copy/Cut/Paste/Undo/Redo
  const getSelectionOrAll = () => {
    const editor = editorRef.current;
    if (!editor) return '';
    const selection = editor.getSelection();
    if (!selection) return '';
    if (selection.isEmpty()) {
      return editor.getModel().getValue();
    }
    return editor.getModel().getValueInRange(selection);
  };

  const replaceSelectionOrAll = (replacement) => {
    const editor = editorRef.current;
    if (!editor) return;
    const selection = editor.getSelection();
    if (!selection || selection.isEmpty()) {
      const fullRange = editor.getModel().getFullModelRange();
      editor.executeEdits('', [{ range: fullRange, text: replacement }]);
    } else {
      editor.executeEdits('', [{ range: selection, text: replacement }]);
    }
  };

  const handleCopy = async () => {
    const text = getSelectionOrAll();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };
  const handleCut = async () => {
    if (!isEditing) return;
    const text = getSelectionOrAll();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.warn('Cut copy failed:', err);
    }
    replaceSelectionOrAll('');
  };
  const handlePaste = async () => {
    if (!isEditing) return;
    try {
      const text = await navigator.clipboard.readText();
      if (text) replaceSelectionOrAll(text);
    } catch (err) {
      console.warn('Paste failed:', err);
    }
  };
  const handleDelete = () => {
    if (!isEditing) return;
    const selection = editorRef.current?.getSelection();
    if (!selection || selection.isEmpty()) {
      const yes = window.confirm(
        'Are you sure you want to delete the entire content?'
      );
      if (!yes) return;
    }
    replaceSelectionOrAll('');
  };
  const handleUndo = () => {
    if (!isEditing) return;
    editorRef.current?.getModel()?.undo();
  };
  const handleRedo = () => {
    if (!isEditing) return;
    editorRef.current?.getModel()?.redo();
  };

  // Download YAML (only enable if user actually uploaded data in Step #2)
  const handleDownloadYAML = () => {
    const blob = new Blob([yamlContent], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'configuration.yaml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // "Run" => go to data preview page
  const handleContinue = () => {
    navigate('/dashboard/data-preview');
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
      <Toolbar sx={{ mb: 2 }} />
      <CustomizedSteppers activeStep={activeStep} />

      <h1>Almost done!</h1>
      <h3>We've chosen a model configuration based on your selections</h3>

      <FormControl sx={{ m: 1, minWidth: '50%', height: '40px', mb: 5 }}>
        <label className="newconnection-label">Dataharvesting configuration</label>
        <Select
          value={configurationName}
          onChange={(e) => setConfigurationName(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {configurationList.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Optional: user-provided YAML */}
      <Box sx={{ m: 1 }}>
        <div className="newconnection-label">Or upload your own YAML</div>
        <div>
          <label
            htmlFor="yamlFileInput"
            className="btn-primary"
            style={{ marginBottom: '15px' }}
          >
            Upload YAML
          </label>
          <label className="nodata-items-v1">{uploadedFile}</label>
          <input
            type="file"
            id="yamlFileInput"
            style={{ display: 'none' }}
            accept=".yml,.yaml"
            onChange={handleFileChange}
          />
        </div>
        <div className="nodata-items-v1">Must be .yml or .yaml</div>
      </Box>

      <Grid container spacing={2} sx={{ mt: 3, mb: 3 }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ position: 'relative' }}>
            {/* Editor Toolbar */}
            <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              {!isEditing && (
                <Button
                  onClick={handleStartEdit}
                  variant="contained"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              )}
              {isEditing && (
                <>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    color="success"
                    startIcon={<SaveIcon />}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="outlined"
                    color="warning"
                    startIcon={<CancelIcon />}
                  >
                    Cancel
                  </Button>
                </>
              )}

              <Button variant="outlined" onClick={handleThemeToggle}>
                Toggle Theme ({theme === 'vs' ? 'Light' : 'Dark'})
              </Button>

              <IconButton onClick={handleCopy} title="Copy">
                <ContentCopyIcon />
              </IconButton>
              <IconButton onClick={handleCut} title="Cut" disabled={!isEditing}>
                <ContentCutIcon />
              </IconButton>
              <IconButton
                onClick={handlePaste}
                title="Paste"
                disabled={!isEditing}
              >
                <ContentPasteIcon />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                title="Delete"
                disabled={!isEditing}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={handleUndo} title="Undo" disabled={!isEditing}>
                <UndoIcon />
              </IconButton>
              <IconButton onClick={handleRedo} title="Redo" disabled={!isEditing}>
                <RedoIcon />
              </IconButton>

              {/* Download YAML - only if data file was uploaded previously */}
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadYAML}
                disabled={!didUploadFile}
              >
                Download YAML
              </Button>
            </Box>

            {/* Monaco Editor */}
            <Editor
              width="100%"
              height="400px"
              language="yaml"
              theme={theme}
              value={isEditing ? tempContent : yamlContent}
              options={{
                readOnly: !isEditing,
                automaticLayout: true,
                minimap: { enabled: false },
                lineNumbers: 'on',
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                renderLineHighlight: 'none',
              }}
              onChange={handleEditorChange}
              editorDidMount={editorDidMount}
            />

            {/* Bottom status */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1,
                fontSize: '0.9rem',
                color: '#555',
              }}
            >
              <div>
                {isEditing ? 'Editing' : 'Read-only'} {position.lineNumber}:
                {position.column}
              </div>
              <div>{validationMessage}</div>
            </Box>
          </Box>
        </Grid>

        {/* Right panel (Optional) */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
              Useful Links
            </Typography>
            <ul style={{ paddingLeft: '18px' }}>
              <li>
                <a href="https://yaml.org" target="_blank" rel="noreferrer">
                  YAML Official
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/microsoft/monaco-editor"
                  target="_blank"
                  rel="noreferrer"
                >
                  Monaco Editor
                </a>
              </li>
              <li>
                <a
                  href="https://www.npmjs.com/package/js-yaml"
                  target="_blank"
                  rel="noreferrer"
                >
                  js-yaml
                </a>
              </li>
            </ul>
          </Box>
        </Grid>
      </Grid>

      <div className="btn-container">
        <Button className="btn-primary" onClick={handleContinue}>
          Run
        </Button>
        <Button
          className="btn-secondary"
          onClick={() => {
            setActiveStep(1);
            navigate('/dashboard/data-artifacts');
          }}
        >
          Cancel
        </Button>
      </div>
    </Box>
  );
}

export default Configuration;


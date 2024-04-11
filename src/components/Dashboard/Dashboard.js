import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import './styles.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function ManageCards() {
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader className="card-header" />
        <CardContent>
          <Typography variant="body2" color="text.primary">
            Benchmark multiple synthetic models
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Evaluate multiple synthetic data models on a standardized benchmark
            with a single function.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            className="card-btn"
            onClick={() => navigate('/dashboard/project')}
          >
            Start for free
          </Button>
        </CardActions>
      </Card>
    </>
  );
}

function Dashboard() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3, ml: '240px' }}>
      <Toolbar sx={{ mb: 2 }} />
      <h1>My Dashboard</h1>
      <h3>Get Started</h3>
      <div>Choose a preconfigured blueprint that matches your use case.</div>
      <ManageCards />
    </Box>
  );
}

export default Dashboard;

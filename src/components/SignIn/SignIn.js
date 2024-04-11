import { Button, FormControl, InputBase, InputLabel } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const StyledInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #000000',
    fontSize: 16,
    width: '100%',
    padding: '10px 12px',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}));

function SignIn() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="signin-gradient1"></div>
      <div className="signin-gradient2"></div>
      <div className="signin-container">
        <div className="signin-left">
          <h1 className="title-text">Data Harvesting</h1>
          <div className="card-text">
            The leading developer stack for synthetic data. Get started with
            just a few clicks.
          </div>
          <div className="card-item">
            <div className="card-text">Synthesize, Classify, Transform</div>A
            toolkit that has you covered – anonymize, balance, protect your data
            at scale.
          </div>
          <div className="card-item">
            <div className="card-text">Privacy Proven</div>
            Generate data safe to share with privacy guarantees.
          </div>
          <div className="card-item">
            <div className="card-text">Fully Managed</div>
            APIs that save you time and integrate into any workflow.
          </div>
          <div className="copyright-text">
            Your data is AES-256 encrypted end-to-end and the ownership is
            yours. Gretel will never sell your data.
          </div>
        </div>
        <div className="signin-right">
          <h1>Welcome to Gretel!</h1>
          <h1>Let's get started.</h1>
          <FormControl variant="standard" sx={{ width: '100%' }}>
            <InputLabel
              shrink
              htmlFor="bootstrap-input"
              className="input-label"
            >
              Work Email
            </InputLabel>
            <StyledInput id="bootstrap-input" className="input-container" />
            <Button
              variant="contained"
              className="submit-btn"
              onClick={() => navigate('/dashboard')}
            >
              Submit
            </Button>
          </FormControl>
          <div className="subtitle">
            We’ll send you a sign-in link or direct you to your SSO provider.
          </div>
          <div className="divider"></div>
          <div className="social-login-text">
            Or sign in with another provider:
          </div>
          <div className="social-btn-container">
            <Button className="social-btn">Google</Button>
            <Button className="social-btn">GitHub</Button>
          </div>
        </div>
      </div>
      <div
        className="signin-container"
        style={{
          paddingTop: '24px',
          paddingBottom: '56px',
        }}
      >
        <div className="signin-left copyright-text">
          Copyright © Gretel Labs, Inc 2019–2024.
        </div>
        <div className="signin-right copyright-text terms-text">
          By continuing, you are agreeing to our Terms of Service, DPA, Privacy
          Policy, and Cookie Policy. If you have a Master Services Agreement
          (MSA) with us, the terms of the MSA will prevail.
        </div>
      </div>
    </div>
  );
}

export default SignIn;

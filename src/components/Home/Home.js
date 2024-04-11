import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Main from './Main';

function Home() {
  return (
    <div>
      <div className="mini-nav">
        <span>
          Virtual Workshop: Anonymize Financial Data with a Fine-Tuned SLM
        </span>
        <span className="signin">
          <Link to="/signin">Sign up</Link>
        </span>
      </div>
      <Navbar />
      <Main />
    </div>
  );
}

export default Home;

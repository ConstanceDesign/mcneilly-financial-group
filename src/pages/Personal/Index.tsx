import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.css';

const Personal: React.FC = () => {
  return (
    <div>
      <h2>Personal Page</h2>
      <nav>
        <Link to="Term_Insurance">Go to Term_Insurance</Link>
        <Link to="Critical_Illness">Go to Critical_Illness</Link>
        <Link to="Health_Insurance">Go to Health_Insurance</Link>
        <Link to="Disability_Insurance">Go to Disability_Insurance</Link>
        <Link to="Mortgage_Insurance">Go to Mortgage_Insurance</Link>
        <Link to="Permanent_Insurance">Go to Permanent_Insurance</Link>
      </nav>
      <Outlet /> {/* This renders the child route */}
    </div>
  );
};

export default Personal;
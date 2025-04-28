import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.css';

const Personal: React.FC = () => {
  return (
    <div>
      <h2>Personal Page</h2>
      <nav>
        <Link to="TermInsurance">Go to Term Insurance</Link>
        <Link to="CriticalIllness">Go to Critical Illness</Link>
        <Link to="HealthInsurance">Go to Health Insurance</Link>
        <Link to="DisabilityInsurance">Go to Disability Insurance</Link>
        <Link to="MortgageInsurance">Go to Mortgage Insurance</Link>
        <Link to="PermanentInsurance">Go to Permanent Insurance</Link>
      </nav>
      <Outlet /> {/* This renders the child route */}
    </div>
  );
};

export default Personal;
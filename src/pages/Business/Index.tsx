import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.css';

const Business: React.FC = () => {
  return (
    <div>
      <h2>Business Page</h2>
      <nav>
        <Link to="Group_Insurance">Go to Group Insurance</Link>
        <Link to="Buy_Sell">Go to Buy Sell</Link>
        <Link to="Key_Person">Go to Key Person</Link>
        <Link to="Business_Overhead">Go to Business Overhead</Link>
        <Link to="Disability_Insurance">Go to Disability Insurance</Link>
        <Link to="Health_Insurance">Go to Health Insurance</Link>
      </nav>
      <Outlet /> {/* This renders the child route */}
    </div>
  );
};

export default Business;
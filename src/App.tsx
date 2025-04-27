import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Links from './pages/Links';
import Business from './pages/Business/Index';
import Group_Insurance from './pages/Business/Group_Insurance';
import Buy_Sell from './pages/Business/Buy_Sell';
import Key_Person from './pages/Business/Key_Person';
import Business_Overhead from './pages/Business/Business_Overhead';
import Disability_Insurance from './pages/Business/Disability_Insurance';
import Health_Insurance from './pages/Business/Health_Insurance';
import Personal from './pages/Personal/Index';
import Term_Insurance from './pages/Personal/Term_Insurance';
import Critical_Illness from './pages/Personal/Critical_Illness';
import PersonalHealth_Insurance from './pages/Personal/Health_Insurance';
import PersonalDisability_Insurance from './pages/Personal/Disability_Insurance';
import Mortgage_Insurance from './pages/Personal/Mortgage_Insurance';
import Permanent_Insurance from './pages/Personal/Permanent_Insurance';
import Wealth from './pages/Wealth';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/links" element={<Links />} />

        {/* Business Routes */}
        <Route path="/business" element={<Business />}>
          <Route path="group_insurance" element={<Group_Insurance />} />
          <Route path="buy_sell" element={<Buy_Sell />} />
          <Route path="key_person" element={<Key_Person />} />
          <Route path="business_overhead" element={<Business_Overhead />} />
          <Route path="disability_insurance" element={<Disability_Insurance />} />
          <Route path="health_insurance" element={<Health_Insurance />} />
        </Route>

        {/* Personal Routes */}
        <Route path="/personal" element={<Personal />}>
          <Route path="term_insurance" element={<Term_Insurance />} />
          <Route path="critical_illness" element={<Critical_Illness />} />
          <Route path="health_insurance" element={<PersonalHealth_Insurance />} />
          <Route path="disability_insurance" element={<PersonalDisability_Insurance />} />
          <Route path="mortgage_insurance" element={<Mortgage_Insurance />} />
          <Route path="permanent_insurance" element={<Permanent_Insurance />} />
        </Route>

        <Route path="/wealth" element={<Wealth />} />
      </Routes>
    </Router>
  );
};

export default App;
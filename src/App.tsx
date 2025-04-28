import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Links from './pages/Links';
import Business from './pages/Business/Index';
import GroupInsurance from './pages/Business/GroupInsurance';
import BuySell from './pages/Business/BuySell';
import KeyPerson from './pages/Business/KeyPerson';
import BusinessOverhead from './pages/Business/BusinessOverhead';
import DisabilityInsurance from './pages/Business/DisabilityInsurance';
import HealthInsurance from './pages/Business/HealthInsurance';
import Personal from './pages/Personal/Index';
import TermInsurance from './pages/Personal/TermInsurance';
import CriticalIllness from './pages/Personal/CriticalIllness';
import PersonalHealthInsurance from './pages/Personal/HealthInsurance';
import PersonalDisabilityInsurance from './pages/Personal/DisabilityInsurance';
import MortgageInsurance from './pages/Personal/MortgageInsurance';
import PermanentInsurance from './pages/Personal/PermanentInsurance';
import Wealth from './pages/Wealth';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar /> {/* Include Navbar at the top of all pages */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/links" element={<Links />} />

          {/* Business Routes */}
          <Route path="/business" element={<Business />}>
            <Route path="group_insurance" element={<GroupInsurance />} />
            <Route path="buy_sell" element={<BuySell />} />
            <Route path="key_person" element={<KeyPerson />} />
            <Route path="business_overhead" element={<BusinessOverhead />} />
            <Route path="disability_insurance" element={<DisabilityInsurance />} />
            <Route path="health_insurance" element={<HealthInsurance />} />
          </Route>

          {/* Personal Routes */}
          <Route path="/personal" element={<Personal />}>
            <Route path="term_insurance" element={<TermInsurance />} />
            <Route path="critical_illness" element={<CriticalIllness />} />
            <Route path="health_insurance" element={<PersonalHealthInsurance />} />
            <Route path="disability_insurance" element={<PersonalDisabilityInsurance />} />
            <Route path="mortgage_insurance" element={<MortgageInsurance />} />
            <Route path="permanent_insurance" element={<PermanentInsurance />} />
          </Route>

          <Route path="/wealth" element={<Wealth />} />
        </Routes>
      </main>
      <Footer /> {/* Include Footer at the bottom of all pages */}
    </Router>
  );
};

export default App;
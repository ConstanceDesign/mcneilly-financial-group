import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import 'index.css';

// Import your pages
import Home from 'pages/Home';
import About from 'pages/About';
import Contact from 'pages/Contact';
import Links from 'pages/Links';
import Business from 'pages/Business/Index';
import GroupInsurance from 'pages/Business/GroupInsurance';
import BuySell from 'pages/Business/BuySell';
import KeyPerson from 'pages/Business/KeyPerson';
import BusinessOverhead from 'pages/Business/BusinessOverhead';
import DisabilityInsurance from 'pages/Business/DisabilityInsurance';
import HealthInsurance from 'pages/Business/HealthInsurance';
import Personal from 'pages/Personal/Index';
import TermInsurance from 'pages/Personal/TermInsurance';
import CriticalIllness from 'pages/Personal/CriticalIllness';
import PersonalHealthInsurance from 'pages/Personal/HealthInsurance';
import PersonalDisabilityInsurance from 'pages/Personal/DisabilityInsurance';
import MortgageInsurance from 'pages/Personal/MortgageInsurance';
import PermanentInsurance from 'pages/Personal/PermanentInsurance';
import Wealth from 'pages/Wealth';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/links" element={<Links />} />

            {/* Business Routes */}
            <Route path="/business" element={<Business />}>
              <Route path="group-insurance" element={<GroupInsurance />} />
              <Route path="buy-sell" element={<BuySell />} />
              <Route path="key-person" element={<KeyPerson />} />
              <Route path="business-overhead" element={<BusinessOverhead />} />
              <Route path="disability-insurance" element={<DisabilityInsurance />} />
              <Route path="health-insurance" element={<HealthInsurance />} />
            </Route>

            {/* Personal Routes */}
            <Route path="/personal" element={<Personal />}>
              <Route path="term-insurance" element={<TermInsurance />} />
              <Route path="critical-illness" element={<CriticalIllness />} />
              <Route path="health-insurance" element={<PersonalHealthInsurance />} />
              <Route path="disability-insurance" element={<PersonalDisabilityInsurance />} />
              <Route path="mortgage-insurance" element={<MortgageInsurance />} />
              <Route path="permanent-insurance" element={<PermanentInsurance />} />
            </Route>

            <Route path="/wealth" element={<Wealth />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

// Pages
import Home from 'pages/Home';
import About from 'pages/About';
import Contact from 'pages/Contact';
import Links from 'pages/Links';
import Business from 'pages/Business/Index';
import GroupInsurance from 'pages/Business/GroupInsurance';
import BuySell from 'pages/Business/BuySell';
import KeyPerson from 'pages/Business/KeyPerson';
import BusinessOverhead from 'pages/Business/BusinessOverhead';
import BusinessDisabilityInsurance from '@pages/Business/BusinessDisabilityInsurance';
import BusinessHealthInsurance from '@pages/Business/BusinessHealthInsurance';
import Personal from 'pages/Personal/Index';
import TermInsurance from 'pages/Personal/TermInsurance';
import CriticalIllness from 'pages/Personal/CriticalIllness';
import PersonalHealthInsurance from '@pages/Personal/PersonalHealthInsurance';
import PersonalDisabilityInsurance from '@pages/Personal/PersonalDisabilityInsurance';
import MortgageInsurance from 'pages/Personal/MortgageInsurance';
import PermanentInsurance from 'pages/Personal/PermanentInsurance';
import Wealth from 'pages/Wealth';

const App: React.FC = () => (
  <Router>
    <Navbar />
    <main>
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/links" element={<Links />} />

          {/* Business */}
          <Route path="/business" element={<Business />}>
            <Route path="group-insurance" element={<GroupInsurance />} />
            <Route path="buy-sell" element={<BuySell />} />
            <Route path="key-person" element={<KeyPerson />} />
            <Route path="business-overhead" element={<BusinessOverhead />} />
            <Route path="business-disability-insurance" element={<BusinessDisabilityInsurance />} />
            <Route path="business-health-insurance" element={<BusinessHealthInsurance />} />
          </Route>

          {/* Personal */}
          <Route path="/personal" element={<Personal />}>
            <Route path="term-insurance" element={<TermInsurance />} />
            <Route path="critical-illness" element={<CriticalIllness />} />
            <Route path="personal-health-insurance" element={<PersonalHealthInsurance />} />
            <Route path="personal-disability-insurance" element={<PersonalDisabilityInsurance />} />
            <Route path="mortgage-insurance" element={<MortgageInsurance />} />
            <Route path="permanent-insurance" element={<PermanentInsurance />} />
          </Route>

          <Route path="/wealth" element={<Wealth />} />

          {/* 404 */}
          <Route path="*" element={<div className="text-center py-12 text-xl">Page Not Found</div>} />
        </Routes>
      </Suspense>
    </main>
    <Footer />
  </Router>
);

export default App;
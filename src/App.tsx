import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

// Pages
import Home from '@pages/Home';
import About from '@pages/About';
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
import Accessibility from 'pages/Accessibility';
import Disclaimer from 'pages/Disclaimer';
import PrivacyPolicy from 'pages/PrivacyPolicy';
import TermsOfUse from 'pages/TermsOfUse';
import ScrollToTop from '@components/ScrollToTop';

const NotFound: React.FC = () => (
  <div className="max-w-3xl mx-auto px-6 py-14 text-center">
    <h1 className="text-2xl sm:text-3xl font-bold text-[#0f5028]">404 Page Not Found</h1>
    <p className="mt-3 text-[#333]/80">
      The page you’re looking for may have been moved or no longer exists.
    </p>
    <Link
      to="/"
      className="
        mt-6 inline-flex items-center justify-center
        px-5 py-3 rounded-xs
        bg-[#4b9328] hover:bg-[#8cbe3f]
        text-white font-bold uppercase tracking-wide
        transition
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/30
      "
      aria-label="Return to the homepage"
    >
      Go to Home Page
    </Link>
  </div>
);

const App: React.FC = () => (
  <Router>
    {/* Keep the site background consistent behind all pages */}
    <div className="min-h-screen bg-[#f4f2ec] flex flex-col">
      <Navbar />

      <main
        id="main"
        tabIndex={-1}
        className="flex-1 scroll-mt-28"
        aria-live="polite"
      >
        <ScrollToTop />

        <Suspense
          fallback={
            <div
              className="flex justify-center items-center min-h-[60vh]"
              aria-busy="true"
              aria-label="Loading"
            >
              <div className="w-16 h-16 border-4 border-[#4b9328] border-t-transparent rounded-full animate-spin" />
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
              <Route
                path="business-disability-insurance"
                element={<BusinessDisabilityInsurance />}
              />
              <Route
                path="business-health-insurance"
                element={<BusinessHealthInsurance />}
              />
            </Route>

            {/* Personal */}
            <Route path="/personal" element={<Personal />}>
              <Route path="term-insurance" element={<TermInsurance />} />
              <Route path="critical-illness" element={<CriticalIllness />} />
              <Route
                path="personal-health-insurance"
                element={<PersonalHealthInsurance />}
              />
              <Route
                path="personal-disability-insurance"
                element={<PersonalDisabilityInsurance />}
              />
              <Route path="mortgage-insurance" element={<MortgageInsurance />} />
              <Route path="permanent-insurance" element={<PermanentInsurance />} />
            </Route>

            <Route path="/wealth" element={<Wealth />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  </Router>
);

export default App;
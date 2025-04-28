import React from 'react';
import useIsMobile from '../hooks/useIsMobile';

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerContent = (
    <div className="flex flex-col md:flex-row md:w-2/3 text-left">
      <p className="mb-4">
        The contents of this website do not constitute an offer or solicitation for residents in the United States or in any other jurisdiction where either McNeilly Financial Group and/or Sterling Mutuals is not registered or permitted to conduct business. Mutual funds provided through Sterling Mutuals Inc. Commissions, trailing commissions, management fees and expenses all may be associated with mutual fund investments. Please read the prospectus carefully before investing. Mutual funds are not guaranteed, their values fluctuate frequently, and past performance may not be repeated.
      </p>
      <p>
        McNeilly Financial Group provides insurance products, and other related financial services as independent insurance agents, and is not the business of, or monitored by Sterling Mutuals Inc.
      </p>
    </div>
  );

  const logoAndLinks = (
    <div className="flex flex-col md:flex-row justify-between items-start md:w-1/3 mt-4 md:mt-0">
      <div className="mb-4">
        <img src="/images/sterling-logo.png" alt="Sterling Mutuals Inc." className="w-64" />
      </div>
      <div className="footer-links">
        <p><a href="https://www.sterlingmutuals.com/advisor/legal.html" target="_blank" rel="noopener noreferrer" className="text-gray-700 font-bold hover:text-brand-lightgreen">Sterling Mutuals Inc. Legal Information</a></p>
        <p><a href="https://www.sterlingmutuals.com/advisor/privacy.html" target="_blank" rel="noopener noreferrer" className="text-gray-700 font-bold hover:text-brand-lightgreen">Sterling Mutuals Inc. Privacy Policy</a></p>
        <p><a href="https://www.sterlingmutuals.com/advisor/complaint.html" target="_blank" rel="noopener noreferrer" className="text-gray-700 font-bold hover:text-brand-lightgreen">Client Complaint Procedures</a></p>
      </div>
    </div>
  );

  return (
    <footer className="bg-gray-200 p-8 flex flex-col md:flex-row justify-between items-start gap-8">
      {footerContent}
      {logoAndLinks}

      <div className="w-full mt-4 md:mt-0 flex flex-col items-start justify-between gap-4">
        <button className="bg-gray-600 text-white px-4 py-2 rounded-md transition-all hover:bg-brand-lightgreen focus:outline-none" onClick={scrollToTop}>
          Back to Top
        </button>
        {!isMobile && (
          <p className="text-sm font-bold text-left">&copy; {currentYear} McNeilly Financial Group. All Rights Reserved.</p>
        )}
      </div>

      {isMobile && (
        <p className="text-sm font-bold text-left mt-4">&copy; {currentYear} McNeilly Financial Group. All Rights Reserved.</p>
      )}
    </footer>
  );
};

export default Footer;
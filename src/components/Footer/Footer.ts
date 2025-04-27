import React from 'react';
import './Footer.css';
import useIsMobile from '../../hooks/useIsMobile';

const Footer = () => {
  const isMobile = useIsMobile();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerContent = (
    <div className="footer-left">
      <p>
        The contents of this website do not constitute an offer or solicitation for residents in the United States or in any other jurisdiction where either McNeilly Financial Group and/or Sterling Mutuals is not registered or permitted to conduct business. Mutual funds provided through Sterling Mutuals Inc. Commissions, trailing commissions, management fees and expenses all may be associated with mutual fund investments. Please read the prospectus carefully before investing. Mutual funds are not guaranteed, their values fluctuate frequently, and past performance may not be repeated.
      </p>
      <p>
        McNeilly Financial Group provides insurance products, and other related financial services as independent insurance agents, and is not the business of, or monitored by Sterling Mutuals Inc.
      </p>
    </div>
  );

  const logoAndLinks = (
    <div className="footer-right">
      <div className="footer-logo">
        <img src="/images/sterling-logo.png" alt="Sterling Mutuals Inc." />
      </div>
      <div className="footer-links">
        <p><a href="https://www.sterlingmutuals.com/advisor/legal.html" target="_blank" rel="noopener noreferrer">Sterling Mutuals Inc. Legal Information</a></p>
        <p><a href="https://www.sterlingmutuals.com/advisor/privacy.html" target="_blank" rel="noopener noreferrer">Sterling Mutuals Inc. Privacy Policy</a></p>
        <p><a href="https://www.sterlingmutuals.com/advisor/complaint.html" target="_blank" rel="noopener noreferrer">Client Complaint Procedures</a></p>
      </div>
    </div>
  );

  return (
    <footer className="footer">
      {footerContent}
      {logoAndLinks}

      <div className="footer-button-wrapper">
        <button className="footer-button" onClick={scrollToTop}>Back to Top</button>
        {!isMobile && (
          <p className="footer-copy">&copy; {currentYear} McNeilly Financial Group. All Rights Reserved.</p>
        )}
      </div>

      {isMobile && (
        <p className="footer-copy">&copy; {currentYear} McNeilly Financial Group. All Rights Reserved.</p>
      )}
    </footer>
  );
};

export default Footer;
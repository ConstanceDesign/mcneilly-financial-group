import React, { useEffect, useState } from 'react';
import {
  FaArrowUp,
  FaUniversalAccess,
  FaFileAlt,
  FaShieldAlt,
  FaGavel,
  FaBalanceScale,
  FaUserShield,
  FaCommentDots,
  FaScroll,
  FaCheck,
  FaLinkedin,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import useIsMobile from 'hooks/useIsMobile';

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  const currentYear = new Date().getFullYear();
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [cookieBannerHeight, setCookieBannerHeight] = useState(0);
  const cookieBannerRef = React.useRef<HTMLDivElement>(null);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const cookiesConsent = document.cookie.includes('cookies_accepted=true');
    setCookiesAccepted(cookiesConsent);
  }, []);

  useEffect(() => {
    if (!cookiesAccepted && cookieBannerRef.current) {
      setCookieBannerHeight(cookieBannerRef.current.offsetHeight);
    } else {
      setCookieBannerHeight(0);
    }
  }, [cookiesAccepted]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#e5e5e5] text-[#333] text-[14px] leading-[1.6] px-[8vw] py-[50px] font-inter space-y-10 relative">
      <div style={{ marginBottom: '5vh' }}>
  <div className="flex flex-col lg:flex-row justify-between gap-12">


        {/* Container 1: Sterling Logo */}
        {/* <div className="w-full lg:max-w-[300px] max-w-[300px] sm:max-w-[300px] md:max-w-[300px] text-left pb-23"></div> */}
        <div className="lg:w-1/5 flex flex-col items-center text-center">
      <img
        src="/images/sterling-logo.png"
        alt="Sterling Mutuals Inc."
        className="w-[230px] mx-auto transition-transform duration-300 hover:scale-105"
      />
    </div>

    {/* Container 2: Disclaimer */}
    <div className="lg:w-2/3 text-left">
      <div className="flex items-center gap-2 mb-4 font-semibold text-lg">
        <FaBalanceScale />
        Disclaimer
      </div>
      <p className="mb-3">
              The contents of this website do not constitute an offer or
              solicitation for residents in the United States or in any other
              jurisdiction where either McNeilly Financial Group and/or Sterling
              Mutuals is not registered or permitted to conduct business. Mutual
              funds provided through Sterling Mutuals Inc. Commissions, trailing
              commissions, management fees and expenses all may be associated
              with mutual fund investments. Please read the prospectus carefully
              before investing. Mutual funds are not guaranteed, their values
              fluctuate frequently, and past performance may not be repeated.
            </p>
            <p>
              McNeilly Financial Group provides insurance products, and other
              related financial services as independent insurance agents, and is
              not the business of, or monitored by Sterling Mutuals Inc.
            </p>
    </div>

        {/* Container 3: External & Internal Links */}
        <div className="w-full lg:max-w-[300px] max-w-[300px] sm:max-w-[300px] md:max-w-[300px] text-left pb-23">
      <ul className="flex flex-col gap-3">
      {[
  { to: 'https://www.sterlingmutuals.com/advisor/legal.html', label: 'Sterling Mutuals Legal Info', icon: <FaGavel />, external: true },
  { to: 'https://www.sterlingmutuals.com/advisor/privacy.html', label: 'Sterling Mutuals Privacy Policy', icon: <FaUserShield />, external: true },
  { to: 'https://www.sterlingmutuals.com/advisor/complaint.html', label: 'Client Complaint Procedures', icon: <FaCommentDots />, external: true },
  { to: '/accessibility', label: 'Accessibility', icon: <FaUniversalAccess /> },
  { to: '/disclaimer', label: 'Website Disclaimer', icon: <FaFileAlt /> },
  { to: '/privacy-policy', label: 'Privacy Policy', icon: <FaShieldAlt /> },
  { to: '/terms-of-use', label: 'Terms of Use', icon: <FaScroll /> },
  { to: 'https://www.linkedin.com/in/patrick-mcneilly-3300b42/', label: 'Follow on LinkedIn', icon: <FaLinkedin />, external: true },
].map(({ to, label, icon, external }) => (
  <li key={to} className="flex items-center gap-2">
    {external ? (
      <a
        href={to}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-[12px] font-semibold uppercase tracking-widest gap-2 text-[#333] hover:text-[#0f5028] transition"
      >
        {icon}
        <span className="relative group">
          {label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8cbe3f] transition-all duration-300 group-hover:w-full"></span>
        </span>
      </a>
    ) : (
      <NavLink
        to={to}
        className="flex items-center text-[12px] font-semibold uppercase tracking-widest gap-2 text-[#333] hover:text-[#0f5028] transition"
      >
        {icon}
        <span className="relative group">
          {label}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#8cbe3f] transition-all duration-300 group-hover:w-full"></span>
        </span>
      </NavLink>
    )}
  </li>
))}
      </ul>
    </div>
  </div>
</div>

       {/* Bottom Bar */}
       <div
        className="absolute left-0 right-0 bg-[#0f5028] text-white px-6 md:px-12 py-5 flex flex-col lg:flex-row justify-between items-center gap-4 z-50 transition-all duration-500"
        style={{ bottom: `${cookieBannerHeight}px` }}
      >
        <div className="text-xs text-center lg:text-left tracking-wider font-medium">
          &copy; {currentYear} McNeilly Financial Group. All Rights Reserved.
        </div>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 bg-[#4b9328] text-white font-bold uppercase tracking-wide text-sm px-3 py-1.5 rounded transition duration-300 hover:bg-[#8cbe3f] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f]"
        >
          <FaArrowUp />
          Back to Top
        </button>
      </div>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {!cookiesAccepted && showBanner && (
          <motion.div
            role="dialog"
            aria-live="polite"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed left-0 right-0 bg-[#333] text-white p-5 z-50 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4"
            style={{ bottom: 0 }}
            ref={cookieBannerRef}
          >
            <p className="text-sm text-center md:text-left px-4">
              We use cookies to enhance your experience. By continuing to use our site, you agree to our{' '}
              <NavLink to="/privacy-policy" className="underline font-bold uppercase text-[#6cbf3f] hover:text-white">
                Privacy Policy
              </NavLink>.
            </p>
            <button
              onClick={() => {
                setCookiesAccepted(true);
                setTimeout(() => setShowBanner(false), 500);
                document.cookie = `cookies_accepted=true; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
              }}
              className="flex items-center gap-2 bg-[#4b9328] text-white font-bold uppercase tracking-wide text-sm px-3 py-1 rounded-xs transition-all duration-300 hover:scale-110 hover:bg-[#8cbe3f] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f] shadow-md"
            >
              <FaCheck />
              Got it!
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
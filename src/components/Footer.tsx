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
import useIsMobile from 'hooks/useIsMobile';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  const currentYear = new Date().getFullYear();
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [cookieBannerHeight, setCookieBannerHeight] = useState(0);
const cookieBannerRef = React.useRef<HTMLDivElement>(null);
const [showBanner, setShowBanner] = useState(true); // default to visible

  useEffect(() => {
    const cookiesConsent = document.cookie.includes('cookies_accepted=true');
    setCookiesAccepted(cookiesConsent);
  }, []);

  useEffect(() => {
    if (!cookiesAccepted && cookieBannerRef.current) {
      const height = cookieBannerRef.current.offsetHeight;
      setCookieBannerHeight(height);
    } else {
      setCookieBannerHeight(0);
    }
  }, [cookiesAccepted]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const acceptCookies = () => {
    document.cookie = `cookies_accepted=true; max-age=${
      60 * 60 * 24 * 365
    }; path=/; SameSite=Lax`;
    setCookiesAccepted(true);
  };

  return (
    <footer className="bg-[#e5e5e5] text-[#333] text-[14px] leading-[1.6] px-[5vw] py-[50px] flex flex-col gap-6 font-inter relative">
      {/* Content above bottom bar */}
      <div style={{ marginBottom: '5vh' }}>
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-20">
          {/* Left */}
          <div className="lg:w-2/3 space-y-4 text-left border border-[#ccc] rounded-md p-8 bg-white shadow-sm relative">
            <div className="absolute -top-4 left-4 tracking-wide bg-[#333] uppercase text-white text-base font-bold px-3 py-1 rounded-xs shadow flex items-center gap-2">
              <FaBalanceScale className="text-white" />
              Disclaimer
            </div>
            <p>
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

          {/* Right */}
          <div className="lg:w-1/3 space-y-5 text-left">
            <img
              src="/images/sterling-logo.png"
              alt="Sterling Mutuals Inc."
              className="w-[250px] mx-auto lg:mx-0 right-15"
            />
            <div className="space-y-2 uppercase tracking-widest text-[0.8rem] mt-[7%] ml-[1%]">
              {[
                {
                  href: 'https://www.sterlingmutuals.com/advisor/legal.html',
                  label: 'Sterling Mutuals Inc. Legal Information',
                  icon: <FaGavel className="mr-0.5" />,
                },
                {
                  href: 'https://www.sterlingmutuals.com/advisor/privacy.html',
                  label: 'Sterling Mutuals Inc. Privacy Policy',
                  icon: <FaUserShield className="mr-0.5" />,
                },
                {
                  href: 'https://www.sterlingmutuals.com/advisor/complaint.html',
                  label: 'Client Complaint Procedures',
                  icon: <FaCommentDots className="mr-0.5" />,
                },
              ].map((link) => (
                <p key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative font-bold inline-flex items-center text-[#333] px-[10px] py-[5px] transition duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#9b9da0]"
                  >
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-[20px] w-full bg-[#9b9da0] scale-x-0 origin-left transition-transform duration-800 group-hover:scale-x-100 z-0"></span>
                    <span className="relative z-10 flex items-center text-left pl-[5px] group-hover:text-[#f1f1f1] transition-all duration-300">
                      <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">
                        {link.icon}
                      </span>
                      {link.label}
                    </span>
                  </a>
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Internal Legal Links */}
        <nav
          aria-label="Legal and Accessibility Links"
          className="py-5 mt-2 text-left text-[0.8rem] font-semibold uppercase tracking-widest"
        >
          <ul className="flex flex-wrap gap-8">
            {[
              { to: '/accessibility', label: 'Accessibility', icon: <FaUniversalAccess /> },
              { to: '/disclaimer', label: 'Website Disclaimer', icon: <FaFileAlt /> },
              { to: '/privacy-policy', label: 'Privacy Policy', icon: <FaShieldAlt /> },
              { to: '/terms-of-use', label: 'Terms of Use', icon: <FaScroll /> },
              { to: 'https://www.linkedin.com/in/patrick-mcneilly-3300b42/', label: 'Follow on LinkedIn', icon: <FaLinkedin /> },
            ].map(({ to, label, icon }) => (
              <li key={to} className="flex items-center gap-2">
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 relative transition-all duration-300 ${
                      isActive ? 'text-[#333]' : 'text-[#333]'
                    }`
                  }
                >
                  {icon}
                  <span className="inline-block relative group">
                    {label}
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#8cbe3f] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom Bar */}
      <div
  className="absolute left-0 right-0 py-5 bg-[#0f5028] flex flex-col lg:flex-row justify-between items-center gap-4 z-50 transition-all duration-500 ease-in-out"
  style={{ bottom: `${cookieBannerHeight}px` }}
      >
        <div className="text-white font-bold text-xs tracking-wide text-center lg:text-left px-15">
          &copy; {currentYear} McNeilly Financial Group. All Rights Reserved.
        </div>
        <div className="flex justify-end w-full lg:w-auto px-15">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-[#4b9328] text-white font-bold uppercase tracking-wide text-sm px-2 py-1 rounded-xs transition-all duration-300 hover:scale-110 hover:bg-[#8cbe3f] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f] shadow-md"
            aria-label="Scroll back to top"
          >
            <FaArrowUp className="text-white" />
            Back to Top
          </button>
        </div>
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
    >
      <p className="text-sm text-center md:text-left px-10">
        We use cookies to enhance your experience. By continuing to use our site, you agree to our{' '}
        <NavLink to="/privacy-policy" className="underline font-bold uppercase text-[#6cbf3f] tracking-wide hover:text-white">
          Privacy Policy
        </NavLink>.
      </p>
      <div className="flex justify-end w-full lg:w-auto px-10">
      <button
        onClick={() => {
          setCookiesAccepted(true);
          setTimeout(() => setShowBanner(false), 500); // Wait for animation before unmounting
          document.cookie = `cookies_accepted=true; max-age=${
            60 * 60 * 24 * 365
          }; path=/; SameSite=Lax`;
        }}
        className="flex items-center gap-2 bg-[#4b9328] text-white font-bold uppercase tracking-wide text-sm px-2 py-1 rounded-xs transition-all duration-300 hover:scale-110 hover:bg-[#8cbe3f] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8cbe3f] shadow-md"
      ><FaCheck />
        Got it!
      </button></div>
    </motion.div>
  )}
</AnimatePresence>
    </footer>
  );
};

export default Footer;
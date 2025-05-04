import React, { useEffect, useState } from 'react';
import useIsMobile from 'hooks/useIsMobile';

const Footer: React.FC = () => {
  const isMobile = useIsMobile();
  const currentYear = new Date().getFullYear();
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const cookiesConsent = document.cookie.includes('cookies_accepted=true');
    setCookiesAccepted(cookiesConsent);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const acceptCookies = () => {
    document.cookie = `cookies_accepted=true; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
    setCookiesAccepted(true);
  };

  return (
    <footer className="bg-[#f1f1f1] text-[#333] text-[15px] leading-[1.6] px-[50px] py-[20px] flex flex-wrap justify-between gap-5 font-inter">
      {/* Left Section */}
      <div className="flex-[0_0_66.6666%] text-left space-y-4">
        <p>
          The contents of this website do not constitute an offer or solicitation for residents in the United States or in any other jurisdiction where either McNeilly Financial Group and/or Sterling Mutuals is not registered or permitted to conduct business. Mutual funds provided through Sterling Mutuals Inc. Commissions, trailing commissions, management fees and expenses all may be associated with mutual fund investments. Please read the prospectus carefully before investing. Mutual funds are not guaranteed, their values fluctuate frequently, and past performance may not be repeated.
        </p>
        <p>
          McNeilly Financial Group provides insurance products, and other related financial services as independent insurance agents, and is not the business of, or monitored by Sterling Mutuals Inc.
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-[0_0_30%] text-right space-y-4">
        <img
          src="/images/sterling-logo.png"
          alt="Sterling Mutuals Inc."
          className="w-[300px] mx-auto lg:mx-0"
        />
        <div className="space-y-2">
          {[
            {
              href: 'https://www.sterlingmutuals.com/advisor/legal.html',
              label: 'Sterling Mutuals Inc. Legal Information',
            },
            {
              href: 'https://www.sterlingmutuals.com/advisor/privacy.html',
              label: 'Sterling Mutuals Inc. Privacy Policy',
            },
            {
              href: 'https://www.sterlingmutuals.com/advisor/complaint.html',
              label: 'Client Complaint Procedures',
            },
          ].map((link) => (
            <p key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold no-underline text-[#333] px-[10px] py-[5px] inline-block transition-all duration-700 ease-in-out hover:text-white hover:bg-[#9b9da0]"
              >
                {link.label}
              </a>
            </p>
          ))}
        </div>
      </div>

      {/* Footer bottom */}
      <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center mt-6 gap-3">
        <button
          className="bg-[#9b9da0] text-white font-bold text-sm px-[10px] py-[5px] transition-all duration-300 hover:bg-[#8cbe3f] hover:-translate-y-1 active:translate-y-0"
          onClick={scrollToTop}
        >
          Back to Top
        </button>
        <p className="text-[13px] font-bold">
          &copy; {currentYear} McNeilly Financial Group. All Rights Reserved.
        </p>
      </div>

      {/* Cookie Consent Banner */}
      {!cookiesAccepted && (
        <div className="fixed bottom-0 left-0 right-0 bg-neutral text-neutral-content p-4 text-center z-50">
          <p className="text-sm">
            We use cookies to improve your experience. By continuing, you agree to our
            <a href="/privacy-policy" className="link link-info ml-1">Privacy Policy</a>.
          </p>
          <button
            onClick={acceptCookies}
            className="btn btn-success btn-sm mt-2"
          >
            Got it!
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
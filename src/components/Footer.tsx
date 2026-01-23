import React, { useEffect, useRef, useState } from 'react';
import {
  FaCheck,
  FaBalanceScale,
  FaCommentDots,
  FaFileAlt,
  FaGavel,
  FaLinkedin,
  FaScroll,
  FaShieldAlt,
  FaUniversalAccess,
  FaUserShield,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const [legalOpen, setLegalOpen] = useState(false);
  const legalCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setCookiesAccepted(document.cookie.includes('cookies_accepted=true'));
  }, []);

  useEffect(() => {
    if (legalOpen) window.setTimeout(() => legalCloseBtnRef.current?.focus(), 0);
  }, [legalOpen]);

  const acceptCookies = () => {
    setCookiesAccepted(true);
    window.setTimeout(() => setShowBanner(false), 300);
    document.cookie = `cookies_accepted=true; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Desktop column order is “down the first link column, then down the next”.
  const leftLinks = [
    {
      to: 'https://www.sterlingmutuals.com/advisor/legal.html',
      label: 'Sterling Mutuals Legal Info',
      icon: <FaGavel aria-hidden="true" />,
      external: true,
    },
    {
      to: 'https://www.sterlingmutuals.com/advisor/privacy.html',
      label: 'Sterling Mutuals Privacy Policy',
      icon: <FaUserShield aria-hidden="true" />,
      external: true,
    },
    {
      to: 'https://www.sterlingmutuals.com/advisor/complaint.html',
      label: 'Client Complaint Procedures',
      icon: <FaCommentDots aria-hidden="true" />,
      external: true,
    },
    { to: '/disclaimer', label: 'Website Disclaimer', icon: <FaFileAlt aria-hidden="true" /> },
  ] as const;

  const rightLinks = [
    { to: '/accessibility', label: 'Accessibility', icon: <FaUniversalAccess aria-hidden="true" /> },
    { to: '/terms-of-use', label: 'Terms of Use', icon: <FaScroll aria-hidden="true" /> },
    { to: '/privacy-policy', label: 'Privacy Policy', icon: <FaShieldAlt aria-hidden="true" /> },
    {
      to: 'https://www.linkedin.com/in/patrick-mcneilly-3300b42/',
      label: 'LinkedIn',
      icon: <FaLinkedin aria-hidden="true" />,
      external: true,
    },
  ] as const;

  const mobileLinks = [...leftLinks, ...rightLinks] as const;

  const LinkRow = ({
    to,
    label,
    icon,
    external,
    onClick,
  }: {
    to?: string;
    label: string;
    icon: React.ReactNode;
    external?: boolean;
    onClick?: () => void;
  }) => {
    const common =
      'inline-flex items-center gap-2 ' +
      'text-[13px] font-semibold uppercase tracking-widest ' +
      'text-[#1f2937]/85 hover:text-[#0f5028] transition ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25 rounded ' +
      'whitespace-nowrap';

    const labelClass =
      'relative inline-block ' +
      "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 " +
      'after:bg-[#8cbe3f] after:transition-all after:duration-300 ' +
      'hover:after:w-full focus-visible:after:w-full';

    const content = (
      <>
        <span className="text-[#0f5028]/70 transition">{icon}</span>
        <span className={labelClass}>{label}</span>
        {external ? <span className="sr-only">(opens in a new tab)</span> : null}
      </>
    );

    // Action row (for mobile Legal Disclaimer link)
    if (onClick) {
      return (
        <button
          type="button"
          onClick={onClick}
          className={common}
          aria-haspopup="dialog"
          aria-expanded={legalOpen}
        >
          {content}
        </button>
      );
    }

    if (!to) return null;

    return external ? (
      <a href={to} target="_blank" rel="noopener noreferrer" className={common}>
        {content}
      </a>
    ) : (
      <NavLink to={to} className={common}>
        {content}
      </NavLink>
    );
  };

  // Matches the “Client Login” vibe (sheer/white, stroke, no green bg), keep same font size as links.
  const footerActionBtn =
    'inline-flex items-center justify-center gap-2 ' +
    'rounded-[3px] px-4 py-2 ' +
    'bg-white/35 backdrop-blur-sm ' +
    'border border-[#0f5028]/25 ' +
    'text-[#0f5028] ' +
    'hover:bg-white/55 hover:border-[#0f5028]/35 ' +
    'transition ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/30 ' +
    'text-[13px] font-semibold uppercase tracking-widest ' +
    'whitespace-nowrap';

  // Slightly dimmer background for Back to Top
  const footerActionBtnDim =
    'inline-flex items-center justify-center gap-2 ' +
    'rounded-[3px] px-4 py-2 ' +
    'bg-white/20 backdrop-blur-sm ' +
    'border border-[#0f5028]/20 ' +
    'text-[#0f5028] ' +
    'hover:bg-white/35 hover:border-[#0f5028]/30 ' +
    'transition ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/30 ' +
    'text-[13px] font-semibold uppercase tracking-widest ' +
    'whitespace-nowrap';

  // Shared desktop width so logo matches Legal Disclaimer button width
  const desktopCtaWidth = 'w-56';

  return (
    <footer className="bg-black/10 text-[#1f2937] font-inter" role="contentinfo">
      {/* Top separator (edge-to-edge) */}
      <div className="h-px bg-black/10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-8 py-10">
        <div className="relative">
          {/* BASE FOOTER (hidden when legal is open) */}
          <div className={legalOpen ? 'opacity-0 pointer-events-none select-none lg:hidden' : 'opacity-100'}>
            {/* 4 columns on desktop: 2-4-4-2 */}
            <div className="grid grid-cols-1 gap-8 lg:gap-18 lg:grid-cols-14 lg:items-start">
              {/* COL 1 (2): Sterling logo + Legal button (desktop only) */}
              <div className="lg:col-span-3 flex flex-col">
                {/* Centered on mobile/small; right-aligned on desktop; fixed width to match button */}
                <div className="flex items-start justify-center">
                  <div className={`shrink-0 ${desktopCtaWidth}`}>
                    <img
                      src="/images/sterling-mutuals-logo.png"
                      alt="Sterling Mutuals Inc."
                      className="w-[93%] h-auto mx-auto block"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>

                {/* Desktop-only legal button (mobile uses link inside the box) */}
                <div className="mt-5 hidden lg:flex justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={() => setLegalOpen(true)}
                    aria-haspopup="dialog"
                    aria-expanded={legalOpen}
                    className={`${footerActionBtn} ${desktopCtaWidth}`}
                  >
                    <FaBalanceScale className="text-[#0f5028]/80" aria-hidden="true" />
                    <span>Legal Disclaimer</span>
                  </button>
                </div>
              </div>

              {/* COL 2 (4): Mobile (boxed list) + Desktop left link column */}
              <div className="lg:col-span-4">
                <nav aria-label="Footer resources" className="lg:mt-1">
                  {/* Mobile / small screens: centered footer, links LEFT-aligned in a subtle box */}
                  <div className="lg:hidden flex justify-center">
                    <div
                      className="
                        w-full
                        max-w-85
                        rounded-sm
                        border border-black/5
                        bg-white/30 backdrop-blur-sm
                        px-4 py-4
                        text-left
                      "
                    >
                      <ul className="grid grid-cols-1 gap-y-3">
                        {/* Mobile Legal Disclaimer as a LINK row (opens the same dialog) */}
                        <li>
                          <LinkRow
                            label="Legal Disclaimer"
                            icon={<FaBalanceScale aria-hidden="true" />}
                            onClick={() => setLegalOpen(true)}
                          />
                        </li>

                        {mobileLinks.map((l) => (
                          <li key={l.to}>
                            <LinkRow {...l} />
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Desktop: left link column */}
                  <ul className="hidden lg:grid lg:grid-cols-1 lg:gap-y-3">
                    {leftLinks.map((l) => (
                      <li key={l.to}>
                        <LinkRow {...l} />
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* COL 3 (4): Desktop right link column */}
              <div className="hidden lg:block lg:col-span-4">
                <nav aria-label="Footer resources continued" className="mt-1">
                  <ul className="grid grid-cols-1 gap-y-3">
                    {rightLinks.map((l) => (
                      <li key={l.to}>
                        <LinkRow {...l} />
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* COL 4 (2): Back to top */}
              <div className="lg:col-span-3 flex flex-col items-center lg:items-end">
                {/* Centered on mobile with balanced top/bottom spacing */}
                <div className="mt-1 mb-1 flex justify-center lg:mb-0 lg:mt-2 lg:justify-end">
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className={footerActionBtnDim}
                    aria-label="Back to top"
                    title="Back to top"
                  >
                    <span>Back to Top</span>
                    <svg
                      className="h-4 w-4 text-[#0f5028]/70"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M12 19V5" />
                      <path d="M5 12l7-7 7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* LEGAL TAKEOVER PANEL */}
          <AnimatePresence>
            {legalOpen && (
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-label="Legal Disclosure & Disclaimer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="
                  absolute inset-0
                  flex items-center justify-center
                  p-3 sm:p-4
                  lg:static lg:block lg:p-0
                "
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setLegalOpen(false);
                }}
              >
                {/* Card (centered on mobile; IN-FLOW on desktop so footer grows and no scroll) */}
                <div
                  className="
                    w-full
                    max-w-140
                    lg:max-w-none
                    rounded-xl
                    border border-black/10
                    bg-white/35 backdrop-blur-md
                    shadow-sm
                    p-4 sm:p-5
                    max-h-[85vh] overflow-auto
                    lg:max-h-none lg:overflow-visible
                  "
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <FaBalanceScale className="text-[#0f5028]" aria-hidden="true" />
                        <h2 className="text-[1rem] sm:text-[1.05rem] font-semibold tracking-wide text-[#0f5028]">
                          Legal Disclaimer
                        </h2>
                      </div>
                      <p className="mt-1 text-xs font-semibold tracking-wide uppercase text-[#4b9328]">
                        Info &amp; jurisdictional disclosure
                      </p>
                    </div>

                    <button
                      ref={legalCloseBtnRef}
                      type="button"
                      onClick={() => setLegalOpen(false)}
                      className="
                        inline-flex items-center justify-center
                        h-10 w-10 rounded-md
                        hover:bg-black/10
                        transition
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25
                      "
                      aria-label="Close legal disclosure"
                      title="Close"
                    >
                      <svg
                        className="h-6 w-6 text-[#0f5028]/80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M18 6L6 18" />
                        <path d="M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-5 border-t border-black/10 pt-4">
                    <p className="text-[0.95rem] leading-relaxed text-[#1f2937]/80 mb-5">
                      The contents of this website do not constitute an offer or solicitation for residents in the United
                      States or in any other jurisdiction where either <strong>McNeilly Financial Group</strong> and/or{' '}
                      <strong>Sterling Mutuals</strong> is not registered or permitted to conduct business. Mutual funds
                      provided through <strong>Sterling Mutuals Inc.</strong> Commissions, trailing commissions,
                      management fees and expenses may be associated with mutual fund investments. Please read the
                      prospectus carefully before investing. Mutual funds are not guaranteed, their values fluctuate
                      frequently, and past performance may not be repeated.
                    </p>

                    <p className="text-[0.95rem] leading-relaxed text-[#1f2937]/80 mb-0">
                      <strong>McNeilly Financial Group</strong> provides insurance products, and other related financial
                      services as independent insurance agents, and is not the business of, or monitored by{' '}
                      <strong>Sterling Mutuals Inc.</strong>
                    </p>

                    <div className="h-4" aria-hidden="true" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Small print block */}
      <div className="mx-auto max-w-7xl px-6 py-4">
        <p className="font-semibold text-xs text-[#1f2937]/60 text-center lg:text-left">
          <span className="block lg:inline">Mutual funds are offered through Sterling Mutuals Inc.</span>
          <span className="block lg:inline lg:ml-3">
            &copy; {currentYear} McNeilly Financial Group. All Rights Reserved.
          </span>
        </p>
      </div>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {!cookiesAccepted && showBanner && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-desc"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="
              fixed left-0 right-0 bottom-0
              bg-[#0f5028] text-white
              p-5 z-50 shadow-lg
              flex flex-col md:flex-row justify-between items-center gap-4
            "
          >
            <div className="px-2">
              <p id="cookie-consent-title" className="font-semibold uppercase tracking-widest text-[12px] text-white/90">
                Cookies &amp; Privacy
              </p>

              <p id="cookie-consent-desc" className="text-sm text-center md:text-left mt-1 text-white/90">
                We use cookies to enhance your experience. By continuing to use our site, you agree to our{' '}
                <NavLink
                  to="/privacy-policy"
                  className="
                    underline font-semibold uppercase tracking-widest
                    text-[#8cbe3f] hover:text-white
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 rounded
                  "
                >
                  Privacy Policy
                </NavLink>
                .
              </p>
            </div>

            <button
              type="button"
              onClick={acceptCookies}
              className="
                inline-flex items-center gap-2
                bg-[#4b9328] hover:bg-[#8cbe3f]
                px-4 py-2 rounded-xs
                text-sm font-semibold uppercase tracking-widest
                transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                shadow-md
              "
            >
              <FaCheck aria-hidden="true" />
              Got it
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;
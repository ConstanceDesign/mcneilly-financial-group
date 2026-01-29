import React, { useEffect, useId, useRef, useState } from 'react';
import {
  FaBalanceScale,
  FaCheck,
  FaClock,
  FaCommentDots,
  FaFileAlt,
  FaGavel,
  FaLinkedin,
  FaPhoneAlt,
  FaScroll,
  FaShieldAlt,
  FaUniversalAccess,
  FaUserShield,
} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

type FooterLink = {
  to?: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
};

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const [legalOpen, setLegalOpen] = useState(false);

  // Accessible IDs (stable + collision-safe)
  const legalDialogId = useId();
  const legalTitleId = useId();
  const legalDescId = useId();

  // Refs for a11y + focus management
  const legalCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const legalPanelRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setCookiesAccepted(document.cookie.includes('cookies_accepted=true'));
  }, []);

  // Save the previously focused element (so we can restore focus on close)
  useEffect(() => {
    if (!legalOpen) return;
    lastFocusedElRef.current = document.activeElement as HTMLElement | null;
  }, [legalOpen]);

  // Move focus into the dialog when it opens
  useEffect(() => {
    if (!legalOpen) return;
    window.setTimeout(() => legalCloseBtnRef.current?.focus(), 0);
  }, [legalOpen]);

  // Restore focus when the dialog closes
  useEffect(() => {
    if (legalOpen) return;
    const el = lastFocusedElRef.current;
    if (el) window.setTimeout(() => el.focus?.(), 0);
  }, [legalOpen]);

  // Prevent background page scroll when legal is open
  useEffect(() => {
    if (!legalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [legalOpen]);

  const acceptCookies = () => {
    setCookiesAccepted(true);
    window.setTimeout(() => setShowBanner(false), 300);
    document.cookie = `cookies_accepted=true; max-age=${60 * 60 * 24 * 365}; path=/; SameSite=Lax`;
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const closeLegal = () => setLegalOpen(false);

  // Focus trap helpers
  const getFocusable = (root: HTMLElement | null) => {
    if (!root) return [];
    const selectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');
    return Array.from(root.querySelectorAll<HTMLElement>(selectors)).filter(
      (el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden')
    );
  };

  const onLegalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeLegal();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusables = getFocusable(legalPanelRef.current);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement as HTMLElement | null;

    // Shift + Tab on first -> wrap to last
    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
      return;
    }

    // Tab on last -> wrap to first
    if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // Desktop column order is “down the first link column, then down the next”.
  const leftLinks: readonly FooterLink[] = [
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
    {
      to: 'https://www.linkedin.com/in/patrick-mcneilly-3300b42/',
      label: 'LinkedIn',
      icon: <FaLinkedin aria-hidden="true" />,
      external: true,
    },
  ] as const;

  const rightLinks: readonly FooterLink[] = [
    { to: '/accessibility', label: 'Accessibility', icon: <FaUniversalAccess aria-hidden="true" /> },
    { to: '/terms-of-use', label: 'Terms of Use', icon: <FaScroll aria-hidden="true" /> },
    { to: '/privacy-policy', label: 'Privacy Policy', icon: <FaShieldAlt aria-hidden="true" /> },
    { to: '/disclaimer', label: 'Website Disclaimer', icon: <FaFileAlt aria-hidden="true" /> },
  ] as const;

  const mobileLinks = [...leftLinks, ...rightLinks] as const;

  // ✅ Match 2026 page base everywhere
  const footerBg = 'bg-[#f4f2ec]';

  // Mobile “card” wrapper (premium, but not darker than page)
  const mobileCard =
    'w-full max-w-85 ' +
    'rounded-2xl ' +
    'border border-black/10 ' +
    'bg-white/60 backdrop-blur-sm ' +
    'shadow-[0_14px_42px_rgba(0,0,0,0.08)] ' +
    'px-4 py-4 ' +
    'text-left';

  const LinkRow = ({ to, label, icon, external, onClick }: FooterLink) => {
    // Tighten tracking + reduce “menu competition”
    const common =
      'inline-flex items-center gap-2 ' +
      'text-[13px] font-medium tracking-normal ' +
      'text-[#1f2937]/70 hover:text-[#0f5028] transition ' +
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25 rounded ' +
      'whitespace-nowrap';

    // Softer underline style (more “nav-like”)
    const labelClass =
      'relative inline-block ' +
      "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 " +
      'after:bg-black/15 after:transition-all after:duration-300 ' +
      'hover:after:w-full focus-visible:after:w-full';

    const content = (
      <>
        <span className="text-[#0f5028]/55 transition">{icon}</span>
        <span className={labelClass}>{label}</span>
        {external ? <span className="sr-only">(opens in a new tab)</span> : null}
      </>
    );

    if (onClick) {
      return (
        <button
          type="button"
          onClick={onClick}
          className={common}
          aria-haspopup="dialog"
          aria-expanded={legalOpen}
          aria-controls={legalDialogId}
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

  const footerActionBtn =
    'inline-flex w-fit items-center justify-center gap-2 ' +
    'rounded-xs px-3.5 py-2.5 ' +
    'bg-white/70 backdrop-blur-sm ' +
    'border border-black/12 ' +
    'text-[#0f5028] ' +
    'shadow-sm hover:shadow-[0_10px_22px_rgba(15,80,40,0.10)] ' +
    'hover:bg-white/80 ' +
    'transition ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25 ' +
    'focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f2ec] ' +
    'text-[12px] font-bold uppercase tracking-[0.14em] ' +
    'whitespace-nowrap';

  const footerUtilityLink =
    'inline-flex items-center gap-2 ' +
    'text-[11px] font-semibold tracking-[0.12em] uppercase ' +
    'text-[#1f2937]/55 hover:text-[#0f5028] transition ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25 rounded ' +
    'whitespace-nowrap';

  const desktopCtaWidth = 'w-56';
  const sectionHeader =
    'text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f2937]/55';

  return (
    <footer className={`${footerBg} text-[#1f2937] font-inter`} role="contentinfo">
      <div className="h-px bg-black/10" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-8 py-10">
        <div className="relative">
          {!legalOpen && (
            <>
              {/* ===== MOBILE / SMALL ===== */}
              <div className="lg:hidden">
                <div className="flex flex-col items-center">
                  <div className={`shrink-0 ${desktopCtaWidth}`}>
                    <img
                      src="/images/sterling-mutuals-logo.png"
                      alt="Sterling Mutuals Inc."
                      className="w-[90%] h-auto mx-auto block"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setLegalOpen(true)}
                      aria-haspopup="dialog"
                      aria-expanded={legalOpen}
                      aria-controls={legalDialogId}
                      className={footerActionBtn}
                    >
                      <FaBalanceScale className="text-[#0f5028]" aria-hidden="true" />
                      <span>Legal Disclaimer</span>
                    </button>
                  </div>
                </div>

                <nav aria-label="Footer external links and resources" className="mt-8 flex justify-center">
                  <div className={mobileCard}>
                    <p className={sectionHeader}>External Links &amp; Resources</p>

                    <ul className="mt-4 grid grid-cols-1 gap-y-3">
                      {mobileLinks.map((l) => (
                        <li key={l.to ?? l.label}>
                          <LinkRow {...l} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>

                <section className="mt-6 flex justify-center" aria-label="McNeilly Financial Group contact">
                  <div className={mobileCard}>
                    <p className={sectionHeader}>McNeilly Financial Group</p>

                    <address className="mt-4 not-italic text-[13px] text-[#1f2937]/70 leading-relaxed">
                      <div className="font-semibold text-[#102019]">
                        1608 Sylvestre Drive, Suite 2D
                        <br />
                        Tecumseh, Ontario N8N 2L9
                      </div>

                      <div className="mt-3">
                        <a
                          href="tel:+15199795396"
                          className="inline-flex items-center gap-2 hover:text-[#0f5028] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25 rounded"
                        >
                          <span className="text-[#0f5028]/55">
                            <FaPhoneAlt aria-hidden="true" />
                          </span>
                          (519) 979-5396
                        </a>
                      </div>

                      <div className="mt-3 inline-flex items-center gap-2">
                        <span className="text-[#0f5028]/55">
                          <FaClock aria-hidden="true" />
                        </span>
                        <span className="text-[#1f2937]/70">Mon–Fri, 9 AM – 5 PM</span>
                      </div>
                    </address>
                  </div>
                </section>

                <div className="mt-8">
                  <div
                    className="h-px bg-black/10 w-screen relative left-1/2 -translate-x-1/2"
                    aria-hidden="true"
                  />
                </div>

                <div className="mt-5 mb-4 flex justify-center">
                  <button
                    type="button"
                    onClick={scrollToTop}
                    className={footerUtilityLink}
                    aria-label="Back to top"
                    title="Back to top"
                  >
                    <span className="relative inline-block">Back to top</span>
                    <svg
                      className="h-4 w-4 text-[#0f5028]/40"
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

              {/* Mobile small print */}
              <div className="mx-auto max-w-85 text-xs text-[#1f2937]/55 lg:hidden">
                <span className="block">Secure experience. Client Login opens in a new tab.</span>
                <span className="block">&copy; {currentYear} McNeilly Financial Group. All Rights Reserved.</span>
              </div>

              {/* ===== DESKTOP ===== */}
              <div className="hidden lg:block">
                <div className="mx-auto max-w-7xl">
                  <div className="flex items-start justify-between">
                    <section aria-label="Sterling Mutuals" className="min-w-70">
                      <div className="flex flex-col items-start">
                        <div className={`shrink-0 ${desktopCtaWidth}`}>
                          <img
                            src="/images/sterling-mutuals-logo.png"
                            alt="Sterling Mutuals Inc."
                            className="w-[70%] h-auto block"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>

                        <div className="mt-6 flex justify-start">
                          <button
                            type="button"
                            onClick={() => setLegalOpen(true)}
                            aria-haspopup="dialog"
                            aria-expanded={legalOpen}
                            aria-controls={legalDialogId}
                            className={footerActionBtn}
                          >
                            <FaBalanceScale className="text-[#0f5028]" aria-hidden="true" />
                            <span>Legal Disclaimer</span>
                          </button>
                        </div>
                      </div>
                    </section>

                    <nav aria-label="Footer external links" className="min-w-88">
                      <p className={sectionHeader}>External Links</p>
                      <ul className="mt-4 grid grid-cols-1 gap-y-3">
                        {leftLinks.map((l) => (
                          <li key={l.to}>
                            <LinkRow {...l} />
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <div aria-hidden="true" className="hidden xl:block w-6 shrink-0" />

                    <nav aria-label="Footer resources" className="min-w-70">
                      <p className={sectionHeader}>Resources</p>
                      <ul className="mt-4 grid grid-cols-1 gap-y-3">
                        {rightLinks.map((l) => (
                          <li key={l.to}>
                            <LinkRow {...l} />
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <section aria-label="McNeilly Financial Group contact" className="min-w-50">
                      <p className={sectionHeader}>McNeilly Financial Group</p>

                      <address className="mt-3.5 not-italic text-[13px] text-[#1f2937]/70 leading-relaxed">
                        <div className="font-semibold text-[#102019]">
                          1608 Sylvestre Drive, Suite 2D
                          <br />
                          Tecumseh, Ontario <br />
                          N8N 2L9
                        </div>

                        <div className="mt-2">
                          <a
                            href="tel:+15199795396"
                            className="inline-flex items-center gap-2 hover:text-[#0f5028] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/25 rounded"
                          >
                            <span className="text-[#0f5028]/55">
                              <FaPhoneAlt aria-hidden="true" />
                            </span>
                            (519) 979-5396
                          </a>
                        </div>

                        <div className="mt-3.5 inline-flex items-center gap-2">
                          <span className="text-[#0f5028]/55">
                            <FaClock aria-hidden="true" />
                          </span>
                          <span className="text-[#1f2937]/70">Mon–Fri, 9 AM – 5 PM</span>
                        </div>
                      </address>
                    </section>
                  </div>
                </div>

                <div className="relative my-12 mb-3">
                  <div
                    className="h-px bg-black/10 w-screen relative left-1/2 -translate-x-1/2"
                    aria-hidden="true"
                  />
                  <div className="absolute right-0 mt-1.5 px-3">
                    <button
                      type="button"
                      onClick={scrollToTop}
                      className={footerUtilityLink}
                      aria-label="Back to top"
                      title="Back to top"
                    >
                      <span className="relative inline-block">Back to top</span>
                      <svg
                        className="h-4 w-4 text-[#0f5028]/40"
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

                <div className="mx-auto max-w-7xl text-xs text-[#1f2937]/55">
                  <p>
                    Secure experience. Client Login opens in a new tab. &copy; {currentYear} McNeilly Financial Group.
                    All Rights Reserved.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* LEGAL TAKEOVER PANEL */}
          <AnimatePresence>
            {legalOpen && (
              <motion.div
                id={legalDialogId}
                role="dialog"
                aria-modal="true"
                aria-labelledby={legalTitleId}
                aria-describedby={legalDescId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="
                  fixed inset-0 z-50
                  flex items-center justify-center
                  p-3 sm:p-4
                  bg-[#072412]/90 backdrop-blur-[3px]
                "
                onKeyDown={onLegalKeyDown}
                onMouseDown={(e) => {
                  // Click/press on the overlay closes the dialog
                  if (e.target === e.currentTarget) closeLegal();
                }}
              >
                <div
                  ref={legalPanelRef}
                  className="
                    w-full
                    max-w-140
                    rounded-xl
                    border border-black/10
                    bg-white/90
                    shadow-sm
                    p-4 sm:p-5
                    max-h-[85vh] overflow-auto
                  "
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <FaBalanceScale className="text-[#0f5028]" aria-hidden="true" />
                        <h2
                          id={legalTitleId}
                          className="text-[1rem] sm:text-[1.05rem] font-semibold tracking-wide text-[#0f5028]"
                        >
                          Legal Disclaimer
                        </h2>
                      </div>
                      <p
                        id={legalDescId}
                        className="mt-1 text-xs font-semibold tracking-[0.12em] uppercase text-[#4b9328]"
                      >
                        Info &amp; jurisdictional disclosure
                      </p>
                    </div>

                    <button
                      ref={legalCloseBtnRef}
                      type="button"
                      onClick={closeLegal}
                      className="
                        inline-flex items-center justify-center
                        h-10 w-10 rounded-md
                        hover:bg-[#0f5028]/7
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

                  <div className="mt-5 border-t border-[#0f5028]/20 pt-4">
                    <p className="text-[0.95rem] leading-relaxed text-[#1f2937]/80 mb-4">
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

                    <div className="h-1" aria-hidden="true" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Cookie Consent Banner */}
      <AnimatePresence>
        {!cookiesAccepted && showBanner && (
          <motion.div
            role="region"
            aria-label="Cookie consent"
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
              <p id="cookie-consent-title" className="font-semibold uppercase tracking-[0.14em] text-[12px] text-white/90">
                Cookies &amp; Privacy
              </p>

              <p id="cookie-consent-desc" className="text-sm text-center md:text-left mt-1 text-white/90">
                We use cookies to enhance your experience. By continuing to use our site, you agree to our{' '}
                <NavLink
                  to="/privacy-policy"
                  className="
                    underline font-semibold uppercase tracking-[0.14em]
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
                text-sm font-semibold uppercase tracking-[0.14em]
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
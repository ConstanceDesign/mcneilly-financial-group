import React, { useEffect, useRef, RefObject } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
  isMenuOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  closeMenu: () => void;
  toggleMenu: () => void; // kept for compatibility
}

const menuItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/business', label: 'Business' },
  { to: '/personal', label: 'Personal' },
  { to: '/wealth', label: 'Wealth' },
  { to: '/links', label: 'Links' },
  { to: '/contact', label: 'Contact' },
];

const LOGIN_URL = 'https://www.sterlingmutuals.com/repweb/client/login.xhtml';

const MobileMenu: React.FC<Props> = ({ isMenuOpen, menuRef, closeMenu }) => {
  const location = useLocation();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();

      // basic focus trap
      if (e.key === 'Tab') {
        const root = menuRef.current;
        if (!root) return;

        const focusables = root.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    window.setTimeout(() => {
      (closeBtnRef.current ?? firstLinkRef.current)?.focus();
    }, 40);

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, closeMenu, menuRef]);

  // Close menu on route change (a11y + prevents “stuck open”)
  useEffect(() => {
    if (isMenuOpen) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/55 backdrop-blur-[2px] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            ref={menuRef}
            className="
              fixed top-0 right-0 xl:hidden
              h-dvh w-[20rem] sm:w-88 max-w-full
              overflow-hidden
              bg-white/92 backdrop-blur-3xl
              shadow-2xl
              flex flex-col
            "
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: '100%', opacity: 0.95 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0.95 }}
            transition={{ type: 'tween', duration: 0.25 }}
            tabIndex={-1}
          >
            {/* Brand header */}
            <div className="relative">
              <div
                className="absolute inset-0 bg-linear-to-br from-[#0f5028] to-[#1f7a45]"
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-[#0f5028]" aria-hidden="true" />

              {/* Navbar */}
              <div className="relative h-23 px-6 flex items-center justify-between">
                <img
                  src="/images/mcneillyfinancialgroup-logo.png"
                  alt="McNeilly Financial Group"
                  className="h-18 w-auto object-contain"
                />

                {/* Close */}
                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={closeMenu}
                  className="
                    inline-flex items-center justify-center
                    h-11 w-11 rounded-md
                    hover:bg-white/10
                    transition
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                  "
                  aria-label="Close menu"
                >
                  <svg
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Client Login Block */}
            <div className="px-6 py-6 bg-[#4b9328]">
              <a
                href={LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center gap-2
                  px-4 py-3
                  rounded-xs
                  bg-white/13 hover:bg-white/20
                  border border-white/23
                  text-white text-[0.95rem]
                  font-semibold uppercase tracking-widest
                  w-full justify-center
                  transition
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
                "
                aria-label="Client login (opens in a new tab)"
              >
                <FaUserCircle size={16} aria-hidden="true" />
                Client Login
              </a>
            </div>

            {/* Links */}
            <nav className="px-5 py-7" aria-label="Primary">
              <motion.ul
                className="flex flex-col gap-2 text-[#0f5028] font-semibold uppercase"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
                role="list"
              >
                {menuItems.map(({ to, label }, index) => {
                  const isActive =
                    location.pathname === to || (to !== '/' && location.pathname.startsWith(to));

                  return (
                    <motion.li
                      key={to}
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.18 }}
                    >
                      <Link
                        to={to}
                        onClick={closeMenu}
                        ref={index === 0 ? firstLinkRef : undefined}
                        className="
                          group relative inline-block w-full
                          py-3
                          tracking-widest text-[1rem]
                          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0f5028]/30 rounded
                        "
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="relative inline-block">
                          {label}

                          {/* underline hover */}
                          <span
                            className="
                              absolute -bottom-1 left-0 h-0.5 w-0
                              bg-[#8cbe3f]
                              transition-all duration-300
                              group-hover:w-full
                            "
                            aria-hidden="true"
                          />

                          {/* active underline */}
                          {isActive && (
                            <motion.span
                              layoutId="mobile-underline"
                              className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#8cbe3f]"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            {/* Bottom Reassurance */}
            <div className="mt-auto px-6 pb-6 pt-4 bg-black/10 border-t border-black/10">
              <img
                src="/images/sterling-mutuals-logo.png"
                alt="Sterling Mutuals Inc. – Independent Financial Network"
                className="h-16 w-auto object-contain"
              />

              <p className="mt-3 text-xs text-black/50 leading-relaxed">
                <span className="block font-semibold">Secure experience.</span>
                <span className="block font-semibold">Client login opens in a new tab.</span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
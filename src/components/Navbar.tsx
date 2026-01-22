import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

const LOGIN_URL = 'https://www.sterlingmutuals.com/repweb/client/login.xhtml';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/business', label: 'Business' },
  { to: '/personal', label: 'Personal' },
  { to: '/wealth', label: 'Wealth' },
  { to: '/links', label: 'Links' },
  { to: '/contact', label: 'Contact' },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close mobile menu on route change (prevents “stuck open”)
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="bg-[#0f5028] text-white sticky top-0 z-50 shadow-md" aria-label="Primary site navigation">
      {/* Skip link (a11y) */}
      <a
        href="#main"
        className="
          sr-only focus:not-sr-only
          focus:absolute focus:left-4 focus:top-3
          focus:z-999
          focus:rounded focus:bg-white focus:px-3 focus:py-2
          focus:text-[#0f5028] focus:font-semibold
        "
      >
        Skip to main content
      </a>

      <div className="mx-auto max-w-7xl px-6 sm:px-6">
        <div className="h-23 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center" aria-label="McNeilly Financial Group home">
            <img
              src="/images/mcneillyfinancialgroup-logo.png"
              alt="McNeilly Financial Group"
              className="h-18 w-auto object-contain"
            />
          </NavLink>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-8">
            <ul className="flex items-center gap-8 uppercase tracking-widest text-[1.02rem]">
              {navItems.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `group relative inline-block transition-transform duration-200 hover:scale-[1.03] focus:outline-none
                       ${isActive ? 'text-white' : 'text-white/95'}`
                    }
                  >
                    <span className="relative inline-block">
                      {label}

                      {/* hover underline */}
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
                      <span
                        className={({ isActive }: { isActive: boolean }) => ''}
                        aria-hidden="true"
                      />
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Login */}
            <a
              href={LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center gap-2
                h-10 px-4
                rounded-xs
                bg-[#4b9328] hover:bg-[#8cbe3f]
                text-white font-bold uppercase tracking-wide
                transition-transform duration-200 hover:scale-[1.04]
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
              "
              aria-label="Client login opens in a new tab"
            >
              <FaUserCircle size={18} aria-hidden="true" />
              <span className="text-[1rem]">Login</span>
            </a>
          </div>

          {/* Hamburger (mobile) */}
          <div className="xl:hidden">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu();
              }}
              className="
                inline-flex items-center justify-center
                h-11 w-11 rounded-md
                hover:bg-white/10
                transition
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
              "
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              <svg
                className="h-6 w-6 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div id="mobile-nav">
        <MobileMenu
          isMenuOpen={isMenuOpen}
          menuRef={menuRef}
          closeMenu={() => setIsMenuOpen(false)}
          toggleMenu={toggleMenu}
        />
      </div>
    </nav>
  );
};

export default Navbar;
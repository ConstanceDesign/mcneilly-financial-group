import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <nav className="bg-[#0f5028] text-white h-28 w-full shadow-md sticky top-0 z-50">
      <div className="relative right-15 mx-auto max-w-full flex items-center justify-between h-full">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0">
          <NavLink to="/">
            <img
              src="/images/mcneillyfinancialgroup-logo.png"
              alt="McNeilly Financial Group"
              className="relative left-30 w-[250px] object-contain"
            />
          </NavLink>
        </div>

        {/* Desktop Links */}
        <div className="hidden xl:flex items-center space-x-6 grid-cols-2 gap-8">
          <ul className="flex gap-8 uppercase font-normal tracking-widest text-[1.05rem] items-centers">
            {[
              { to: '/', label: 'Home' },
              { to: '/about', label: 'About' },
              { to: '/business', label: 'Business' },
              { to: '/personal', label: 'Personal' },
              { to: '/wealth', label: 'Wealth' },
              { to: '/links', label: 'Links' },
              { to: '/contact', label: 'Contact' },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `relative transition-all duration-300 hover:scale-105 ${
                      isActive ? 'text-white' : 'text-white'
                    }`
                  }
                >
                  <span className="inline-block relative group">
                    {label}
                    <span className="flex bottom-1 h-0.5 w-0 bg-[#8cbe3f] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
          <a
            href="https://www.sterlingmutuals.com/repweb/client/login.xhtml"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-25 h-8 gap-2 bg-[#4b9328] text-white hover:bg-[#8cbe3f] hover:text-white font-bold text-base transition-all duration-300 hover:scale-110 rounded-xs"
            aria-label="Login to Sterling Mutuals"
          >
            <FaUserCircle size={18} />
            <span className="tracking-wide text-[1.10rem] uppercase">Login</span>
          </a>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isMenuOpen={isMenuOpen}
        menuRef={menuRef}
        closeMenu={() => setIsMenuOpen(false)}
        toggleMenu={toggleMenu}
      />

            {/* Hamburger Button */}
            <div className="absolute xl:hidden bottom-4 right-4 z-[100]">
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log('hamburger clicked')
            toggleMenu();
          }}
          className={`transition duration-300 ease-in-out p-4 focus:outline-none ${
            isMenuOpen ? 'rotate-90' : ''
          }`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <svg
            className="h-6 w-6 text-white transition-transform duration-300 ease-in-out"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <nav className="bg-[#0f5028] text-white px-6 py-4 flex items-center justify-between flex-wrap shadow-md sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center flex-shrink-0">
        <NavLink to="/">
          <img
            src="/images/mcneillyfinancialgroup-logo.png"
            alt="McNeilly Financial Group"
            className="w-[250px] md:w-[400px] my-2"
          />
        </NavLink>
      </div>

      {/* Mobile toggle */}
      <div className="block lg:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 border rounded text-white border-white"
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
        >
          <svg className="fill-current h-5 w-5" viewBox="0 0 20 20">
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      {/* Links */}
      <div
        className={`w-full lg:flex lg:items-center lg:w-auto transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="lg:flex lg:gap-6 uppercase font-semibold text-sm mt-4 lg:mt-0 list-none">
          <li className="my-2 lg:my-0">
            <NavLink to="/" className="hover:text-[#8cbe3f]">Home</NavLink>
          </li>
          <li className="my-2 lg:my-0">
            <NavLink to="/about" className="hover:text-[#8cbe3f]">About</NavLink>
          </li>
          <li className="my-2 lg:my-0">
            <NavLink to="/business" className="hover:text-[#8cbe3f]">Business</NavLink>
          </li>
          <li className="my-2 lg:my-0">
            <NavLink to="/personal" className="hover:text-[#8cbe3f]">Personal</NavLink>
          </li>
          <li className="my-2 lg:my-0">
            <NavLink to="/wealth" className="hover:text-[#8cbe3f]">Wealth</NavLink>
          </li>
          <li className="my-2 lg:my-0">
            <NavLink to="/links" className="hover:text-[#8cbe3f]">Links</NavLink>
          </li>
          <li className="my-2 lg:my-0">
            <NavLink to="/contact" className="hover:text-[#8cbe3f]">Contact</NavLink>
          </li>
          <li className="my-2 lg:my-0">
            <a
              href="https://www.sterlingmutuals.com/repweb/client/login.xhtml"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8cbe3f] text-[#0f5028] hover:bg-[#4b9328] hover:text-white px-3 py-2 rounded text-sm font-bold"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
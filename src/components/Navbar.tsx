import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useIsMobile from '../hooks/useIsMobile';

const Navbar: React.FC = () => {
  const isMobile = useIsMobile(768); // Check if screen is mobile (adjust breakpoint if needed)
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="flex justify-between items-center p-4 bg-brand-darkgreen text-white relative"
      aria-label="Main Navigation"
    >
      <div className="navbar-brand">
        <Link to="/" aria-label="Home">
          <img
            src="/images/mcneillyfinancialgroup-logo.png"
            alt="McNeilly Financial Group Logo"
            className="w-[400px] mt-2 mb-2"
          />
        </Link>
      </div>

      {/* Desktop Navigation (visible when not mobile) */}
      {!isMobile && (
        <div
          className="flex gap-5 font-bold uppercase text-lg transition-all duration-1000 ease-in-out"
          role="navigation"
        >
          <ul className="flex list-none p-0 m-0">
            <li>
              <Link to="/" className="text-white hover:text-brand-lightgreen" aria-label="Home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-brand-lightgreen" aria-label="About Us">
                About
              </Link>
            </li>
            <li>
              <Link to="/business" className="text-white hover:text-brand-lightgreen" aria-label="Business Services">
                Business
              </Link>
            </li>
            <li>
              <Link to="/personal" className="text-white hover:text-brand-lightgreen" aria-label="Personal Services">
                Personal
              </Link>
            </li>
            <li>
              <Link to="/wealth" className="text-white hover:text-brand-lightgreen" aria-label="Wealth Management">
                Wealth
              </Link>
            </li>
            <li>
              <Link to="/links" className="text-white hover:text-brand-lightgreen" aria-label="Helpful Links">
                Links
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white hover:text-brand-lightgreen"
                aria-label="Contact Us"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href="https://www.sterlingmutuals.com/repweb/client/login.xhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-lightgreen text-brand-darkgreen px-4 py-2 ml-2 rounded hover:bg-[#4b9328] focus:outline-none active:bg-[#2d7a21]"
                aria-label="Sterling Mutuals Client Login"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Navigation (visible when mobile) */}
      {isMobile && (
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } absolute top-[60px] left-0 right-0 bg-brand-darkgreen text-center p-4 z-10`}
          role="navigation"
        >
          <ul className="list-none p-0 m-0">
            <li>
              <Link to="/" className="text-white hover:text-brand-lightgreen" aria-label="Home">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-brand-lightgreen" aria-label="About Us">
                About
              </Link>
            </li>
            <li>
              <Link to="/business" className="text-white hover:text-brand-lightgreen" aria-label="Business Services">
                Business
              </Link>
            </li>
            <li>
              <Link to="/personal" className="text-white hover:text-brand-lightgreen" aria-label="Personal Services">
                Personal
              </Link>
            </li>
            <li>
              <Link to="/wealth" className="text-white hover:text-brand-lightgreen" aria-label="Wealth Management">
                Wealth
              </Link>
            </li>
            <li>
              <Link to="/links" className="text-white hover:text-brand-lightgreen" aria-label="Helpful Links">
                Links
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-white hover:text-brand-lightgreen"
                aria-label="Contact Us"
              >
                Contact
              </Link>
            </li>
            <li>
              <a
                href="https://www.sterlingmutuals.com/repweb/client/login.xhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-lightgreen text-brand-darkgreen px-4 py-2 ml-2 rounded hover:bg-[#4b9328] focus:outline-none active:bg-[#2d7a21]"
                aria-label="Sterling Mutuals Client Login"
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Mobile Menu Toggle (only visible on mobile) */}
      {isMobile && (
        <div
          className="navbar-toggle flex flex-col cursor-pointer lg:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen ? 'true' : 'false'}
        >
          <span className="bar w-7 h-1 my-1 bg-white"></span>
          <span className="bar w-7 h-1 my-1 bg-white"></span>
          <span className="bar w-7 h-1 my-1 bg-white"></span>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
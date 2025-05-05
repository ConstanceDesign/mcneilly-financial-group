import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

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
    <nav className="bg-[#0f5028] text-white py-4 shadow-md sticky top-0 h-26 z-50">
      <div className="mx-auto max-w-screen-xl flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 p-[10%]">
          <NavLink to="/">
            <img
              src="/images/mcneillyfinancialgroup-logo.png"
              alt="McNeilly Financial Group"
              className="relative left-15 bottom-5 top-2 w-[250px] md:w-[250px]"
            />
          </NavLink>
        </div>

        {/* Hamburger Icon */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="relative w-10 h-10 flex items-center justify-center group"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="space-y-1">
              <span className={`block h-0.5 w-6 bg-white transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-6 mt-1 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`block h-0.5 w-6 mt-1 bg-white transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex lg:items-center">
          <ul className="flex gap-6 uppercase font-normal tracking-wide text-[1.1rem] items-center">
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
                    `relative transition-all duration-300 hover:text-[#8cbe3f] hover:scale-105 ${
                      isActive ? 'text-[#8cbe3f]' : 'text-white'
                    }`
                  }
                >
                  <span className="inline-block relative group">
                    {label}
                    <span className="flex left-0 -bottom-1 h-0.5 w-0 bg-[#8cbe3f] transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </NavLink>
              </li>
            ))}
            <li>
              <a
                href="https://www.sterlingmutuals.com/repweb/client/login.xhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex pl-5 items-center p-2 gap-2 bg-[#4b9328] text-[#0f5028] hover:bg-[#8cbe3f] hover:text-white font-bold text-base transition-all duration-300 rounded-none hover:scale-110"
              >
                <span className="pl-1">
                  <FaUserCircle size={18} />
                </span>
                <span className="relative right-2 font-medium tracking-wide p-2 m-2 text-[1.1rem]">Login</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              ref={menuRef}
              className="fixed top-0 left-0 w-[300px] sm:w-[300px] h-half bg-[#0f5028] z-50 shadow-lg"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <motion.div
                className="flex justify-center pt-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <NavLink to="/" onClick={() => setIsMenuOpen(false)}>
                  <img
                    src="/images/mcneillyfinancialgroup-logo.png"
                    alt="McNeilly Financial Group"
                    className="fixed top-5 justify-center left-6 w-[250px] max-w-[250px] sm:w-[250px]"
                  />
                </NavLink>
              </motion.div>

              <div className="h-[30vh]" />

              <motion.div
                className="flex flex-col divide-y divide-white/50 px-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.07,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                {[
                  { to: '/', label: 'Home' },
                  { to: '/about', label: 'About' },
                  { to: '/business', label: 'Business' },
                  { to: '/personal', label: 'Personal' },
                  { to: '/wealth', label: 'Wealth' },
                  { to: '/links', label: 'Links' },
                  { to: '/contact', label: 'Contact' },
                ].map(({ to, label }) => (
                  <motion.div
                    key={to}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    <NavLink
                      to={to}
                      onClick={() => setIsMenuOpen(false)}
                      className="py-4 text-white text-[4vw] sm:text-[1.2rem] font-semibold uppercase hover:text-[#8cbe3f] transition duration-300"
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <a
                    href="https://www.sterlingmutuals.com/repweb/client/login.xhtml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-white text-[4vw] sm:text-[1.2rem] font-bold uppercase bg-[#4b9328] hover:bg-[#8cbe3f] hover:text-[#0f5028] transition-all duration-300 text-center flex items-center justify-center gap-2"
                  >
                    <span className="pl-1">
                      <FaUserCircle size={18} />
                    </span>
                    <span className="p-2">Login</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, RefObject } from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
  isMenuOpen: boolean;
  menuRef: RefObject<HTMLDivElement | null>;
  closeMenu: () => void;
  toggleMenu: () => void;
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

const MobileMenu: React.FC<Props> = ({ isMenuOpen, menuRef, closeMenu, toggleMenu }) => {
  const location = useLocation();
  const trapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = ''; 
      document.documentElement.style.overflow = ''; 
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <>
      {/* Hamburger Button */}
      <div className="absolute xl:hidden bottom-4 right-4 z-50">
        <button
          onClick={toggleMenu}
          className={`transition duration-300 ease-in-out p-2 border border-white rounded focus:outline-none ${
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

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay starting *below* Navbar, no blur above */}
            <motion.div
              className="fixed inset-x-0 top-28 bottom-0 bg-black/70 backdrop-blur-xs z-40 xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                const button = document.querySelector('button[aria-label]');
                if (button && button.contains(e.target as Node)) return;
                closeMenu();
              }}
            />

{/* <div className="hidden xl:flex items-center space-x-6 grid-cols-2 gap-8"> */}

            {/* Mobile Menu Panel */}
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute top-28 left-0 w-full max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden bg-white z-50 shadow-xl"
              tabIndex={-1}
            >
              <motion.ul
                className="flex flex-col gap-5 py-2 text-[#0f5028] font-semibold tracking-widest text-lg uppercase pl-3 pt-3 pb-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
              >
                {menuItems.map(({ to, label }, index) => {
                  const isActive = location.pathname === to;

                  return (
                    <motion.li
                      key={to}
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Link
                        to={to}
                        onClick={closeMenu}
                        className="relative inline-block py-3 transition-all duration-300 hover:text-[#8cbe3f]"
                        role="menuitem"
                        autoFocus={index === 0}
                      >
                        <span className="group relative">
                          {label}
                          <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#8cbe3f] transition-all duration-300 group-hover:w-full"></span>
                          {isActive && (
                            <motion.span
                              layoutId="mobile-underline"
                              className="absolute -bottom-1 left-0 h-0.5 w-full bg-[#8cbe3f]"
                            />
                          )}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>

              {/* Login Button Anchored to Bottom */}
              <div className="sticky bottom-0 w-full px-6 bg-white pt-3 pb-6 shadow-xl overflow-hidden">
                <a
                  href="https://www.sterlingmutuals.com/repweb/client/login.xhtml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-15 gap-2 bg-[#4b9328] text-[#0f5028] hover:bg-[#8cbe3f] hover:text-white font-bold text-base transition-all duration-300 hover:scale-110 rounded-none"
                >
                  <FaUserCircle size={20} />
                  <span className="tracking-wide text-[1.25rem] uppercase">Login</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;
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

const MobileMenu: React.FC<Props> = ({ isMenuOpen, menuRef, closeMenu }) => {
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
    <AnimatePresence>
      {isMenuOpen && (
        <>
          {/* Dark overlay below navbar */}
          <motion.div
            className="fixed inset-x-0 top-28 bottom-0 bg-black/70 backdrop-blur-xs z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />

          {/* Mobile Menu Panel */}
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute top-28 left-0 w-full max-h-[calc(100vh-6rem)] overflow-y-auto bg-white z-50 shadow-xl"
            tabIndex={-1}
          >
            <motion.ul
              className="flex flex-col gap-2 px-6 py-6 text-[#0f5028] font-semibold tracking-widest text-lg uppercase"
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

            {/* Login Button */}
            <div className="sticky bottom-0 w-full bg-white shadow-xl overflow-hidden">
              <a
                href="https://www.sterlingmutuals.com/repweb/client/login.xhtml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-15 gap-2 bg-[#4b9328] text-white hover:bg-[#8cbe3f] hover:text-white font-bold text-base transition-all duration-300 hover:scale-110 rounded-none"
              >
                <FaUserCircle size={20} />
                <span className="tracking-wide text-[1.25rem] uppercase">Login</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
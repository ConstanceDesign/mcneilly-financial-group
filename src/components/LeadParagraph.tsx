import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

interface LeadParagraphProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  ariaLabel?: string;
}

const LeadParagraph: React.FC<LeadParagraphProps> = ({
    children,
    className = '',
    icon = <FaQuoteLeft className="text-[#529f2b] text-xl opacity-80" />,
    ariaLabel = 'Introductory philosophy statement',
  }) => {
    return (
      <motion.blockquote
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
        aria-label={ariaLabel}
        className={`relative pl-11 border-l-7 border-[#13763c] text-lg md:text-xl italic font-serif font-normal leading-8 bg-[#dceec3] shadow py-6 pr-6 text-[#0f5028] ${className}`}
      >
        <span className="absolute top-4 left-2" aria-hidden="true">
          {icon}
        </span>
        {children}
      </motion.blockquote>
    );
  };
  
  export default LeadParagraph;  
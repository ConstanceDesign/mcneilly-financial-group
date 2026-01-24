import React from 'react';
import { motion, Variants } from 'framer-motion';

export const variants = {
  up: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
  softUp: {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  left: {
    hidden: { opacity: 0, x: -18 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 18 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  },
} satisfies Record<string, Variants>;

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
  delay?: number;
};

const Reveal: React.FC<RevealProps> = ({ children, className, variant = 'up', delay = 0 }) => (
  <motion.div
    className={className}
    variants={variants[variant]}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.22 }}
    transition={{ duration: 0.55, ease: 'easeOut', delay }}
  >
    {children}
  </motion.div>
);

export default Reveal;
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type BackgroundShapeSweepProps = {
  className?: string;
  opacity?: number;
};

const BackgroundShapeSweep: React.FC<BackgroundShapeSweepProps> = ({
  className,
  opacity = 0.18,
}) => {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div
        className={className}
        aria-hidden="true"
        style={{ opacity }}
      />
    );
  }

  return (
    <motion.div className={className} aria-hidden="true" style={{ opacity }}>
      <motion.div
        className="absolute -left-24 -top-16 h-56 w-56 rounded-full blur-2xl bg-[#8cbe3f]/35"
        animate={{ x: [0, 40, 0], y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-5rem] top-8 h-72 w-72 rounded-full blur-2xl bg-[#1f7a45]/25"
        animate={{ x: [0, -36, 0], y: [0, -12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/3 bottom-[-6rem] h-80 w-80 rounded-full blur-3xl bg-[#0f5028]/20"
        animate={{ x: [0, 24, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};

export default BackgroundShapeSweep;
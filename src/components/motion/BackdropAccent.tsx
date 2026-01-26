import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type AccentShape = 'blobA' | 'blobB' | 'leaf' | 'circleSoft';

interface BackdropAccentProps {
  className?: string;
  shape?: AccentShape;
  opacity?: number; // 0.05–0.14 recommended
  blurClassName?: string; // e.g. "blur-2xl"
  from?: 'right' | 'left' | 'top' | 'bottom';
  drift?: number; // px
  rotate?: number; // deg
  once?: boolean;
  amount?: number;
  delay?: number;
}

const paths: Record<AccentShape, string> = {
  blobA:
    'M45.2,-54.7C58.5,-41.2,69.1,-27.9,72,-12.5C74.8,2.9,69.8,20.3,58.5,33.3C47.1,46.3,29.4,54.8,11.3,60.5C-6.8,66.2,-25.3,69.1,-38.4,60.9C-51.5,52.8,-59.2,33.7,-61.6,15.9C-64.1,-1.9,-61.3,-18.4,-52.8,-32.5C-44.3,-46.6,-30.1,-58.3,-14.2,-63C1.7,-67.8,33.2,-68.3,45.2,-54.7Z',
  blobB:
    'M33.7,-52.5C44.2,-45.4,53.7,-37.3,60.5,-26.2C67.4,-15.1,71.7,-1,67.9,10.5C64.1,22.1,52.2,31.1,40.7,40.6C29.2,50,18.2,59.9,5.2,62.7C-7.8,65.6,-23,61.3,-36.2,53.7C-49.3,46,-60.4,35,-64.3,21.6C-68.1,8.1,-64.6,-7.9,-57.7,-22.4C-50.8,-36.9,-40.5,-49.9,-27.3,-56.1C-14.1,-62.3,2.1,-61.8,16.1,-58.1C30,-54.4,41.5,-52.9,33.7,-52.5Z',
  leaf:
    'M55.5,7.7C55.5,7.7,35.9,-52.7,-1.4,-42.1C-38.7,-31.4,-50.7,17.4,-29.7,39.2C-8.7,61,35.1,60.9,50.4,41.3C65.7,21.8,55.5,7.7,55.5,7.7Z',
  circleSoft:
    'M50,0C77.6,0,100,22.4,100,50C100,77.6,77.6,100,50,100C22.4,100,0,77.6,0,50C0,22.4,22.4,0,50,0Z',
};

const BackdropAccent: React.FC<BackdropAccentProps> = ({
  className = '',
  shape = 'blobA',
  opacity = 0.09,
  blurClassName = 'blur-2xl',
  from = 'right',
  drift = 18,
  rotate = -8,
  once = true,
  amount = 0.2,
  delay = 0.05,
}) => {
  const reduceMotion = useReducedMotion();

  const initial = (() => {
    switch (from) {
      case 'left':
        return { opacity: 0, x: -40, y: 0, rotate: rotate - 4, scale: 0.98 };
      case 'top':
        return { opacity: 0, x: 0, y: -40, rotate: rotate - 4, scale: 0.98 };
      case 'bottom':
        return { opacity: 0, x: 0, y: 40, rotate: rotate - 4, scale: 0.98 };
      case 'right':
      default:
        return { opacity: 0, x: 40, y: 0, rotate: rotate - 4, scale: 0.98 };
    }
  })();

  const animate = reduceMotion
    ? { opacity, x: 0, y: 0, rotate, scale: 1 }
    : { opacity, x: 0, y: 0, rotate, scale: 1 };

  const driftAnim = reduceMotion
    ? {}
    : {
        y: [0, -drift, 0],
        transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' },
      };

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{ duration: 0.85, ease: 'easeOut', delay }}
    >
      <motion.svg
        viewBox="0 0 100 100"
        className={`${blurClassName}`}
        style={{ opacity }}
        {...driftAnim}
      >
        {/* You can swap this fill to your brand green using Tailwind class on parent */}
        <path d={paths[shape]} fill="currentColor" />
      </motion.svg>
    </motion.div>
  );
};

export default BackdropAccent;
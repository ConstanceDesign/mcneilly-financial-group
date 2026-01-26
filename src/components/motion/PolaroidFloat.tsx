import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface PolaroidFloatProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  rotate?: number;          // subtle tilt (-6 to 6 is ideal)
  floatDistance?: number;   // px for slow drift
  delay?: number;
}

const PolaroidFloat: React.FC<PolaroidFloatProps> = ({
  src,
  alt,
  caption,
  className = '',
  rotate = -3,
  floatDistance = 10,
  delay = 0.1,
}) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.figure
      className={`relative w-fit ${className}`}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, y: 18, rotate: rotate - 2 }
      }
      whileInView={
        reduceMotion
          ? {}
          : { opacity: 1, y: 0, rotate }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    >
      {/* Polaroid frame */}
      <motion.div
        className="
          bg-white
          rounded-sm
          shadow-[0_18px_40px_rgba(0,0,0,0.18)]
          p-2 pb-6
          border border-black/10
        "
        animate={
          reduceMotion
            ? {}
            : {
                y: [0, -floatDistance, 0],
              }
        }
        transition={
          reduceMotion
            ? {}
            : {
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
              }
        }
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="block w-full h-auto rounded-sm"
        />

        {caption && (
          <figcaption className="mt-3 px-1 text-[11px] tracking-wide text-[#1f2937]/60 font-medium">
            {caption}
          </figcaption>
        )}
      </motion.div>
    </motion.figure>
  );
};
import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = {
  imageUrl: string;
  children: ReactNode;
  className?: string;

  // Visual tuning
  imageOpacity?: number; // 0..1
  overlayClassName?: string; // tint/wash
  maxTranslate?: number; // px
  minHeightClassName?: string; // e.g. "min-h-[320px]"
  rounded?: boolean;
};

const ParallaxBand: React.FC<Props> = ({
  imageUrl,
  children,
  className = '',
  imageOpacity = 0.18,
  overlayClassName = 'bg-[#f4f2ec]/75',
  maxTranslate = 28,
  minHeightClassName = '',
  rounded = true,
}) => {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-maxTranslate, maxTranslate]);

  return (
    <section
      ref={ref}
      className={[
        'relative overflow-hidden',
        rounded ? 'rounded-2xl' : '',
        minHeightClassName,
        className,
      ].join(' ')}
    >
      {/* Background image layer */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          y,
          backgroundImage: `url(${imageUrl})`,
          opacity: imageOpacity,
        }}
      />

      {/* Readability overlay */}
      <div aria-hidden="true" className={`absolute inset-0 ${overlayClassName}`} />

      {/* Content */}
      <div className="relative">{children}</div>
    </section>
  );
};

export default ParallaxBand;
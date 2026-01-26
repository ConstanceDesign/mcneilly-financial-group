import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type TypeRevealVariant = 'maskUp' | 'maskDown' | 'trackingSettle' | 'fade';

interface TypeRevealProps {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  variant?: TypeRevealVariant;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number; // viewport amount
}

const variants = {
  maskUp: {
    hidden: { y: '110%', opacity: 0 },
    visible: { y: '0%', opacity: 1 },
  },
  maskDown: {
    hidden: { y: '-110%', opacity: 0 },
    visible: { y: '0%', opacity: 1 },
  },
  trackingSettle: {
    hidden: { opacity: 0, letterSpacing: '0.18em', y: 10 },
    visible: { opacity: 1, letterSpacing: '0.02em', y: 0 },
  },
  fade: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  },
};

const TypeReveal: React.FC<TypeRevealProps> = ({
  as = 'h2',
  children,
  className,
  variant = 'maskUp',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.3,
}) => {
  const reduceMotion = useReducedMotion();
  const Tag = as as any;

  // Mask variants need a wrapper with overflow hidden
  const needsMask = variant === 'maskUp' || variant === 'maskDown';

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  const motionEl = (
    <motion.span
      className="inline-block"
      variants={variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      transition={{ duration, ease: 'easeOut', delay }}
      style={variant === 'trackingSettle' ? { display: 'inline-block' } : undefined}
    >
      {children}
    </motion.span>
  );

  if (!needsMask) {
    return <Tag className={className}>{motionEl}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="inline-block overflow-hidden align-bottom">{motionEl}</span>
    </Tag>
  );
};

export default TypeReveal;
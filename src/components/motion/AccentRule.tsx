import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface AccentRuleProps {
  className?: string;
  thicknessClassName?: string; // e.g. "h-px" or "h-[2px]"
  colorClassName?: string; // e.g. "bg-black/10"
  widthClassName?: string; // e.g. "w-full" or "w-2/3"
  delay?: number;
  once?: boolean;
  amount?: number;
}

const AccentRule: React.FC<AccentRuleProps> = ({
  className = '',
  thicknessClassName = 'h-px',
  colorClassName = 'bg-black/10',
  widthClassName = 'w-full',
  delay = 0.05,
  once = true,
  amount = 0.25,
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={`${thicknessClassName} ${colorClassName} ${widthClassName} ${className}`} />;
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`${thicknessClassName} ${colorClassName} ${widthClassName} origin-left ${className}`}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    />
  );
};

export default AccentRule;
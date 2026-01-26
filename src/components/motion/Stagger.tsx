import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type StaggerStyle = 'up' | 'right' | 'scale' | 'blur';

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  style?: StaggerStyle;
  stagger?: number;
  once?: boolean;
  amount?: number;
}

const container = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  },
});

const itemVariants: Record<StaggerStyle, any> = {
  up: { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } },
  right: { hidden: { opacity: 0, x: 18 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.98 }, visible: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: 'blur(8px)', y: 12 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0 } },
};

export const Stagger: React.FC<StaggerProps> = ({
  children,
  className,
  style = 'up',
  stagger = 0.08,
  once = true,
  amount = 0.25,
}) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={container(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants[style]} transition={{ duration: 0.55, ease: 'easeOut' }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Stagger;
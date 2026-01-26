import React, { useEffect, useMemo, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type TypewriterTextProps = {
  text: string;
  className?: string;
  startDelayMs?: number;
  speedMs?: number;
  cursor?: boolean;
};

const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  className,
  startDelayMs = 250,
  speedMs = 18,
  cursor = false,
}) => {
  const reduce = useReducedMotion();
  const chars = useMemo(() => text.split(''), [text]);
  const [count, setCount] = useState(reduce ? chars.length : 0);

  useEffect(() => {
    if (reduce) return;

    let t1: number | undefined;
    let t2: number | undefined;

    t1 = window.setTimeout(() => {
      let i = 0;
      t2 = window.setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= chars.length && t2) window.clearInterval(t2);
      }, speedMs);
    }, startDelayMs);

    return () => {
      if (t1) window.clearTimeout(t1);
      if (t2) window.clearInterval(t2);
    };
  }, [reduce, chars.length, startDelayMs, speedMs]);

  const shown = reduce ? text : chars.slice(0, count).join('');

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
      {cursor && !reduce ? <span className="ml-1 opacity-70">|</span> : null}
    </span>
  );
};

export default TypewriterText;
import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/** Apparition douce au défilement, une seule fois. Désactivée si le visiteur réduit les animations. */
export function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}

/** Panneau en verre dont la lueur suit le pointeur. */
export function SpotlightCard({ children, className = '', as: Tag = 'div', ...props }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - r.left}px`);
    el.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <Tag
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-2xl glass transition-colors duration-300 hover:border-white/25 ${className}`}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.09), transparent 60%)' }}
      />
      <div className="relative h-full">{children}</div>
    </Tag>
  );
}

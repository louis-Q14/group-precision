import React from 'react';
import { motion } from 'framer-motion';

// Remplacez les chaînes ci-dessous par les logos fournis (URLs d'images).
// Format attendu : { name: string, src: string }
const LOGOS = [
  // { name: 'Logo 1', src: 'https://...' },
];

export default function LogoMarquee() {
  // Tant qu'aucun logo n'est fourni, on affiche une bande discrète
  if (LOGOS.length === 0) {
    return (
      <div className="relative w-full px-6 py-8 border-t border-white/5">
        <p className="text-center text-xs uppercase tracking-[0.3em] text-gray-600">
          Ils nous font confiance
        </p>
      </div>
    );
  }

  // Duplication pour un défilement continu
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <div className="relative w-full overflow-hidden border-t border-white/5 py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#010409] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#010409] to-transparent z-10" />
      <motion.div
        className="flex items-center gap-16 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.name}
            className="h-8 w-auto object-contain opacity-50 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300"
          />
        ))}
      </motion.div>
    </div>
  );
}
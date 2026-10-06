import React from 'react';
import { motion } from 'framer-motion';

// Remplacez les chaînes ci-dessous par les logos fournis (URLs d'images).
// Format attendu : { name: string, src: string }
const LOGOS = [
  { name: 'ParckBox', src: 'https://media.base44.com/images/public/69260002cce4fa45e27a5d57/9c99ecb71_ParcKBoxlogof.png' },
  { name: 'PRECISIONS Group', src: 'https://media.base44.com/images/public/69260002cce4fa45e27a5d57/043e3e31f_PRECISIONS.png' },
  { name: 'SombaTeka', src: 'https://media.base44.com/images/public/69260002cce4fa45e27a5d57/805a2e5f6_SOMBATEKA.png' },
  { name: 'App243', src: 'https://media.base44.com/images/public/69260002cce4fa45e27a5d57/7c4de919e_App243.png' },
  { name: 'Architectura Studio', src: 'https://media.base44.com/images/public/69260002cce4fa45e27a5d57/a160b3eb1_ARCHITECTURASTUDIO1.png' },
  { name: 'IMPALA', src: 'https://media.base44.com/images/public/69260002cce4fa45e27a5d57/5d0342421_IMPALA_logo.png' },
  { name: 'OrbitalInvest', src: 'https://media.base44.com/images/public/69260002cce4fa45e27a5d57/304b0f5c2_Orbitallnvest.png' },
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
        className="flex items-center w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      >
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.name}
            className="h-8 w-auto object-contain opacity-60 invert hover:opacity-100 transition-all duration-300 mx-8 shrink-0"
          />
        ))}
      </motion.div>
    </div>
  );
}
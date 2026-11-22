import React from 'react';

const LOGOS = [
  { name: 'ParckBox', src: '/images/9c99ecb71_ParcKBoxlogof.png' },
  { name: 'PRECISIONS Group', src: '/images/043e3e31f_PRECISIONS.png' },
  { name: 'SombaTeka', src: '/images/805a2e5f6_SOMBATEKA.png' },
  { name: 'App243', src: '/images/7c4de919e_App243.png' },
  { name: 'Architectura Studio', src: '/images/a160b3eb1_ARCHITECTURASTUDIO1.png' },
  { name: 'IMPALA', src: '/images/5d0342421_IMPALA_logo.png' },
  { name: 'OrbitalInvest', src: '/images/304b0f5c2_Orbitallnvest.png' },
];

export default function LogoMarquee() {
  // On triple la liste pour garantir un flux continu sans vide
  const loop = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <div className="relative w-full overflow-hidden border-t border-white/5 py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#010409] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#010409] to-transparent z-10" />

      <div className="marquee-track flex items-center w-max">
        {loop.map((logo, i) => (
          <img
            key={i}
            src={logo.src}
            alt={logo.name}
            className="h-8 w-auto object-contain opacity-60 invert hover:opacity-100 transition-all duration-300 shrink-0"
            style={{ marginRight: '4rem' }}
          />
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .marquee-track {
          animation: marquee-scroll 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';

/**
 * Cartes en éventail horizontal : les cartes fermées se réduisent à une tranche
 * verticale portant leur titre ; la carte choisie s'ouvre sur toute la largeur.
 * Sur mobile, accordéon vertical. Mêmes couleurs que les cartes des plateformes.
 */

const HEIGHT = 580;
const SPINE = 58; // largeur d'une tranche fermée
const GAP = 8;

const CARD = 'bg-[#ECE7E0] text-[#1A1A1A]';

function Features({ service }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)]">
      <p className="text-sm font-medium">Ce que nous proposons</p>
      <ul className="mt-4 divide-y divide-[#1A1A1A]/[0.07] text-[0.85rem] leading-snug">
        {service.features.map((f) => (
          <li key={f} className="flex gap-2.5 py-2.5">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1A1A1A]/60" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Benefits({ service }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {service.benefits.map((b) => (
        <li key={b.text} className="inline-flex items-center gap-2 rounded-full bg-[#151515] px-3.5 py-1.5 text-[0.8rem] text-white">
          <b.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {b.text}
        </li>
      ))}
    </ul>
  );
}

function Header({ service, size = 'lg' }) {
  const Icon = service.icon;
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#151515] text-white">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className={`${size === 'lg' ? 'text-[2.4rem]' : 'text-3xl'} font-semibold leading-[1.05] tracking-[-0.04em]`}>
          {service.title}
        </h3>
        <p className="mt-2 text-[#1A1A1A]/55">{service.subtitle}</p>
      </div>
    </div>
  );
}

export default function ServiceDeck({ services, activeId, onSelect, renderAction }) {
  const reduce = useReducedMotion();
  const deckRef = useRef(null);
  const [deckWidth, setDeckWidth] = useState(0);

  // Largeur fixe du contenu ouvert = espace laissé par les tranches fermées
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(([entry]) => setDeckWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const openWidth = Math.max(0, deckWidth - (services.length - 1) * (SPINE + GAP));

  const transition = reduce ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 30 };

  return (
    <>
      {/* Écrans larges : éventail horizontal */}
      <div ref={deckRef} className="hidden lg:flex" style={{ height: HEIGHT, gap: GAP }}>
        {services.map((service) => {
          const active = service.id === activeId;
          const Icon = service.icon;
          return (
            <motion.article
              key={service.id}
              initial={false}
              animate={{ flexGrow: active ? 1 : 0 }}
              transition={transition}
              style={{ flexBasis: SPINE, flexShrink: 0 }}
              className={`relative min-w-0 overflow-hidden rounded-2xl ring-1 ring-black/10 ${CARD}`}
            >
              {/* Tranche fermée */}
              <button
                type="button"
                onClick={() => onSelect(service.id)}
                aria-expanded={active}
                aria-label={active ? service.title : `Ouvrir : ${service.title}`}
                tabIndex={active ? -1 : 0}
                className={`absolute inset-y-0 left-0 flex flex-col items-center justify-between py-6 transition-opacity duration-200 hover:bg-black/[0.03] ${
                  active ? 'pointer-events-none opacity-0' : 'opacity-100'
                }`}
                style={{ width: SPINE }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#151515] text-white">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span
                  className="min-h-0 flex-1 overflow-hidden py-5 text-lg font-semibold tracking-[-0.03em] whitespace-nowrap text-ellipsis"
                  style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                >
                  {service.title}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 shadow-sm">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>

              {/* Contenu ouvert : largeur fixe pour ne pas se recomposer pendant l'animation */}
              <motion.div
                initial={false}
                animate={{ opacity: active ? 1 : 0 }}
                transition={reduce ? { duration: 0 } : { duration: 0.25, delay: active ? 0.15 : 0 }}
                aria-hidden={!active}
                style={{ width: openWidth }}
                className={`absolute inset-y-0 left-0 p-9 ${active ? '' : 'pointer-events-none invisible'}`}
              >
                <Header service={service} />
                <div className="mt-8 grid grid-cols-[1fr_1.15fr] gap-6">
                  <div className="flex flex-col">
                    <p className="text-[0.95rem] leading-relaxed text-[#1A1A1A]/75">{service.description}</p>
                    <div className="mt-6"><Benefits service={service} /></div>
                    <div className="mt-8">{renderAction(service)}</div>
                  </div>
                  <Features service={service} />
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>

      {/* Mobiles et tablettes : accordéon */}
      <div className="space-y-3 lg:hidden">
        {services.map((service) => {
          const active = service.id === activeId;
          return (
            <article key={service.id} className={`overflow-hidden rounded-2xl ring-1 ring-black/5 ${CARD}`}>
              <button
                type="button"
                onClick={() => onSelect(service.id)}
                aria-expanded={active}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <span className="text-xl font-semibold tracking-[-0.03em]">{service.title}</span>
                <Plus className={`h-5 w-5 shrink-0 transition-transform ${active ? 'rotate-45' : ''}`} aria-hidden="true" />
              </button>
              {active && (
                <div className="px-5 pb-6">
                  <p className="text-[#1A1A1A]/55">{service.subtitle}</p>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-[#1A1A1A]/75">{service.description}</p>
                  <div className="mt-5"><Benefits service={service} /></div>
                  <div className="mt-5"><Features service={service} /></div>
                  <div className="mt-6">{renderAction(service)}</div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}

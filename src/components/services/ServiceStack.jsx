import { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';

/**
 * Cartes empilées en cascade : seul le bandeau supérieur des cartes en attente
 * dépasse ; la carte choisie glisse au premier plan, par-dessus les autres.
 * Sur mobile, les cartes s'affichent simplement les unes sous les autres.
 */

const PEEK = 76;     // hauteur visible du bandeau de chaque carte en attente
const HEIGHT = 700;  // hauteur d'une carte ouverte

// Palette crème et beige
const CARD = 'bg-[#ECE7E0] text-[#1A1A1A]';

const shortName = (title) => title.split(' — ')[0];
const tagline = (title) => title.split(' — ')[1];

/** Fenêtre d'application : barre latérale sombre et panneau blanc listant l'offre. */
function AppWindow({ service, logo, className = '' }) {
  const Icon = service.icon;
  return (
    <div className={`rounded-tl-xl bg-[#151515] pl-1.5 pt-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] ${className}`}>
      <div className="flex h-full overflow-hidden rounded-tl-lg">
        <aside className="hidden sm:block w-[38%] shrink-0 bg-[#151515] p-5 text-white">
          <div className="flex h-9 items-center">
            {logo ? (
              <img src={logo} alt="" className="h-6 w-auto max-w-full object-contain object-left invert" />
            ) : (
              <span className="flex items-center gap-2 text-sm font-medium">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {shortName(service.title)}
              </span>
            )}
          </div>
          <ul className="mt-6 space-y-1 text-[0.8rem]">
            {service.benefits.map((b, i) => (
              <li
                key={b.text}
                className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 ${i === 0 ? 'bg-white/10 text-white' : 'text-white/55'}`}
              >
                <b.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {b.text}
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-1 bg-white p-6 text-[#1A1A1A]">
          <p className="text-sm font-medium">Ce que nous proposons</p>
          <p className="text-xs text-[#1A1A1A]/45">{shortName(service.title)}</p>
          <ul className="mt-5 divide-y divide-[#1A1A1A]/[0.07] text-[0.82rem] leading-snug">
            {service.features.map((f) => (
              <li key={f} className="flex gap-2.5 py-2">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#1A1A1A]/60" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function CardBody({ service, action }) {
  return (
    <div className="max-w-[46%] px-10">
      <h3 className="text-[3.4rem] font-semibold leading-[1] tracking-[-0.045em]">{shortName(service.title)}</h3>
      {tagline(service.title) && <p className="mt-2 text-[#1A1A1A]/55">{tagline(service.title)}</p>}
      <p className="mt-6 text-lg font-medium">{service.subtitle}</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-[#1A1A1A]/75">{service.description}</p>
      <div className="mt-7">{action}</div>
    </div>
  );
}

export default function ServiceStack({ services, activeId, onSelect, renderAction, logos = {} }) {
  const reduce = useReducedMotion();
  const frontRef = useRef(null);
  const n = services.length;
  const waiting = services.filter((s) => s.id !== activeId);
  const slotOf = (id) => (id === activeId ? n - 1 : waiting.findIndex((s) => s.id === id));

  const select = (id) => {
    onSelect(id);
    // Amène la carte de premier plan dans la vue
    requestAnimationFrame(() =>
      frontRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }),
    );
  };

  return (
    <>
      {/* Écrans larges : pile animée */}
      <div className="relative hidden lg:block" style={{ height: (n - 1) * PEEK + HEIGHT }}>
        <div ref={frontRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 scroll-my-24" style={{ top: (n - 1) * PEEK, height: HEIGHT }} />
        {services.map((service) => {
          const slot = slotOf(service.id);
          const active = service.id === activeId;
          return (
            <motion.article
              key={service.id}
              initial={false}
              animate={{ y: slot * PEEK, scale: active ? 1 : 0.985 }}
              transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 240, damping: 30 }}
              style={{ height: HEIGHT, zIndex: active ? 50 : slot + 1 }}
              className={`absolute inset-x-0 top-0 overflow-hidden rounded-2xl ring-1 ring-black/10 shadow-[0_-10px_30px_-14px_rgba(0,0,0,0.35)] ${CARD}`}
            >
              <button
                type="button"
                onClick={() => select(service.id)}
                aria-expanded={active}
                className="flex w-full items-center justify-between gap-6 px-10 text-left"
                style={{ height: PEEK }}
              >
                <span className={`flex items-baseline gap-3 min-w-0 ${active ? 'sr-only' : ''}`}>
                  <span className="text-2xl font-semibold tracking-[-0.035em] truncate">{shortName(service.title)}</span>
                  {!active && tagline(service.title) && (
                    <span className="hidden xl:inline text-sm text-[#1A1A1A]/50 truncate">{tagline(service.title)}</span>
                  )}
                </span>
                {!active && (
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 shadow-sm">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
              </button>

              <div className={`transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-60'}`}>
                <CardBody service={service} action={renderAction(service)} />
              </div>
              <AppWindow service={service} logo={logos[service.id]} className="absolute bottom-0 right-0 h-[82%] w-[50%]" />
            </motion.article>
          );
        })}
      </div>

      {/* Mobiles et tablettes : liste simple */}
      <div className="space-y-5 lg:hidden">
        {services.map((service) => (
          <article key={service.id} className={`overflow-hidden rounded-2xl ring-1 ring-black/5 ${CARD}`}>
            <div className="px-6 pt-8">
              <h3 className="text-4xl font-semibold leading-tight tracking-[-0.04em]">{shortName(service.title)}</h3>
              {tagline(service.title) && <p className="mt-1 text-[#1A1A1A]/55">{tagline(service.title)}</p>}
              <p className="mt-5 font-medium">{service.subtitle}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-[#1A1A1A]/75">{service.description}</p>
              <div className="mt-6">{renderAction(service)}</div>
            </div>
            <AppWindow service={service} logo={logos[service.id]} className="ml-6 mt-8" />
          </article>
        ))}
      </div>
    </>
  );
}

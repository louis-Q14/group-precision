import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/LanguageContext';
import { DOMAINS, domainCopy } from '@/components/brand/domains';
import { Reveal, SpotlightCard } from '@/components/brand/Reveal';

// Grille asymétrique : les deux premiers métiers prennent plus de place
const SPANS = ['lg:col-span-4', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];

export default function ServicesSection() {
  const { language } = useLanguage();

  return (
    <section className="relative bg-black text-white py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-display font-semibold text-gradient">
            {language === 'FR' ? 'Cinq métiers, une seule équipe' : 'Five lines of work, one team'}
          </h2>
          <p className="mt-5 text-lede text-white/60">
            {language === 'FR'
              ? 'Chaque projet passe par plusieurs étapes. Nous les couvrons toutes, sans multiplier les prestataires.'
              : 'Every project goes through several stages. We cover them all, without multiplying providers.'}
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {DOMAINS.map((domain, i) => {
            const t = domainCopy(domain, language);
            const Icon = domain.icon;
            return (
              <Reveal key={domain.id} delay={i * 0.06} className={SPANS[i]}>
                <SpotlightCard as={Link} to={`${createPageUrl('Services')}#${domain.id}`} className="block h-full p-7 lg:p-8">
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/40 transition-all group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-8 text-2xl font-semibold tracking-tight">{t.name}</h3>
                  <p className="mt-1 text-white/80">{t.pitch}</p>
                  <p className="mt-4 text-sm text-white/55 leading-relaxed">{t.text}</p>
                  {i === 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {t.services.map((s) => (
                        <li key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">{s}</li>
                      ))}
                    </ul>
                  )}
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

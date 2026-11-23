import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { Reveal, SpotlightCard } from '@/components/brand/Reveal';

// Plateformes exploitées par le groupe. `url: null` = site pas encore en ligne.
const PLATFORMS = [
  {
    name: 'SombaTeka',
    logo: '/images/805a2e5f6_SOMBATEKA.png',
    url: 'https://www.sombateka.com',
    domain: 'sombateka.com',
    FR: { field: 'Commerce en ligne', text: 'Boutiques en ligne, paiements et livraison pour particuliers, commerçants et entreprises.' },
    EN: { field: 'Online commerce', text: 'Online stores, payments and delivery for individuals, traders and companies.' },
  },
  {
    name: 'Harchive',
    logo: '/images/harchive-logo.png',
    url: 'https://harchive.net',
    domain: 'harchive.net',
    FR: { field: 'Archivage académique', text: 'Dossiers, diplômes et attestations des universités et écoles de la RDC, vérifiables en ligne.' },
    EN: { field: 'Academic archiving', text: 'Records, diplomas and certificates from DRC universities and schools, verifiable online.' },
  },
  {
    name: 'App243',
    logo: '/images/7c4de919e_App243.png',
    url: 'https://app243.com',
    domain: 'app243.com',
    FR: { field: 'Ressources humaines', text: 'Employés, paie, congés, pointage et recrutement dans une seule application.' },
    EN: { field: 'Human resources', text: 'Employees, payroll, leave, time tracking and recruitment in a single app.' },
  },
  {
    name: 'ParckBox',
    logo: '/images/9c99ecb71_ParcKBoxlogof.png',
    url: 'https://parckbox.com',
    domain: 'parckbox.com',
    FR: { field: 'Imprimerie, espaces, studio et formations', text: 'Impressions, espaces de travail, studio photo et vidéo et formations au numérique et à l’IA, à réserver en ligne.' },
    EN: { field: 'Printing, spaces, studio and training', text: 'Printing, workspaces, a photo and video studio and digital and AI training, all booked online.' },
  },
  {
    name: 'Pay243',
    logo: '/images/pay243-logo.png',
    url: 'https://pay243.com',
    domain: 'pay243.com',
    FR: { field: 'Portefeuille électronique', text: 'Un portefeuille électronique pour régler facilement vos achats en ligne.' },
    EN: { field: 'Digital wallet', text: 'A digital wallet that makes paying for online purchases easy.' },
  },
  {
    name: 'OrbitalInvest',
    logo: '/images/304b0f5c2_Orbitallnvest.png',
    url: null,
    domain: null,
    FR: { field: 'Investissement', text: 'Outils d’analyse, suivi de portefeuille et opportunités d’investissement.' },
    EN: { field: 'Investment', text: 'Analysis tools, portfolio tracking and investment opportunities.' },
  },
];

const COPY = {
  FR: {
    title: 'Nos plateformes',
    lede: 'Conçues et exploitées par le groupe, pour des usages concrets en RD Congo.',
    soon: 'Bientôt en ligne',
    visit: 'Visiter',
  },
  EN: {
    title: 'Our platforms',
    lede: 'Built and run by the group, for everyday uses across the DR Congo.',
    soon: 'Opening soon',
    visit: 'Visit',
  },
};

export default function PlatformsSection() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.FR;

  return (
    <section id="plateformes" className="relative isolate overflow-hidden bg-black text-white py-24 lg:py-32 border-t border-white/10 scroll-mt-20">
      <div className="absolute -z-10 right-[-10%] top-10 h-[420px] w-[620px] glow" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-display font-semibold text-gradient">{copy.title}</h2>
          <p className="mt-5 text-lede text-white/60">{copy.lede}</p>
        </Reveal>

        <ul className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PLATFORMS.map((platform, i) => {
            const text = platform[language] ?? platform.FR;
            const linkProps = platform.url
              ? { as: 'a', href: platform.url, target: '_blank', rel: 'noopener noreferrer' }
              : {};
            return (
              <Reveal as="li" key={platform.name} delay={i * 0.06}>
                <SpotlightCard {...linkProps} className="block h-full min-h-[240px] p-7">
                  <div className="flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div className="h-9 flex items-center">
                        {platform.logo ? (
                          <img src={platform.logo} alt={platform.name} className="h-8 w-auto max-w-[170px] object-contain object-left invert mix-blend-screen" />
                        ) : (
                          <span className="text-2xl font-semibold tracking-tight">{platform.name}</span>
                        )}
                      </div>
                      {platform.url && (
                        <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition-all group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      )}
                    </div>
                    <p className="mt-auto pt-10 text-sm font-medium text-white/50">{text.field}</p>
                    <p className="mt-2 text-white/80">{text.text}</p>
                    <p className="mt-4 text-sm text-white/45">
                      {platform.url ? (
                        <>
                          {platform.domain}
                          <span className="sr-only"> (nouvel onglet)</span>
                        </>
                      ) : (
                        copy.soon
                      )}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

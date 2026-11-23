import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/LanguageContext';

const COPY = {
  FR: {
    badge: 'Groupe basé à Kinshasa, RD Congo',
    title: ['Le groupe qui fait avancer', 'vos projets en RD Congo'],
    lede: 'Communication, financement, digital, formation et conseil : une seule équipe pour faire connaître vos projets, les financer, les outiller et former ceux qui les portent.',
    primary: 'Parler de votre projet',
    secondary: 'Découvrir nos métiers',
    figures: [
      { value: '5', label: 'métiers complémentaires' },
      { value: '6', label: 'plateformes numériques' },
      { value: '20+', label: 'experts mobilisés' },
      { value: '3', label: 'bureaux' },
    ],
  },
  EN: {
    badge: 'Group based in Kinshasa, DR Congo',
    title: ['The group that moves', 'your projects forward in the DRC'],
    lede: 'Communication, financing, digital, training and consulting: one team to promote your projects, fund them, equip them and train the people behind them.',
    primary: 'Discuss your project',
    secondary: 'See what we do',
    figures: [
      { value: '5', label: 'complementary lines of work' },
      { value: '6', label: 'digital platforms' },
      { value: '20+', label: 'experts on hand' },
      { value: '3', label: 'offices' },
    ],
  },
};

const EASE = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.FR;
  const reduce = useReducedMotion();
  const enter = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 24, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section className="relative isolate overflow-hidden bg-black text-white">
      {/* Décor : trame et lueurs */}
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-40 h-[520px] w-[900px] max-w-[140vw] glow" aria-hidden="true" />
      <div className="absolute -z-10 left-1/2 -translate-x-1/2 top-0 h-px w-[60%] bg-gradient-to-r from-transparent via-white/50 to-transparent" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-5 lg:px-8 pt-20 lg:pt-28 pb-20 text-center">
        <motion.p {...enter(0)} className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-white/75">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
          </span>
          {copy.badge}
        </motion.p>

        <motion.h1 {...enter(0.1)} className="mt-8 text-hero font-semibold text-gradient">
          {copy.title[0]}
          <br className="hidden sm:block" /> {copy.title[1]}
        </motion.h1>

        <motion.p {...enter(0.22)} className="mt-7 mx-auto max-w-2xl text-lede text-white/60">
          {copy.lede}
        </motion.p>

        <motion.div {...enter(0.34)} className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to={createPageUrl('Contact')}
            className="group inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white text-black font-medium shadow-[0_0_40px_rgba(255,255,255,0.25)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] transition-shadow"
          >
            {copy.primary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            to={createPageUrl('Services')}
            className="inline-flex items-center h-12 px-6 rounded-full glass font-medium hover:bg-white/10 transition-colors"
          >
            {copy.secondary}
          </Link>
        </motion.div>

        {/* Chiffres clés */}
        <motion.dl {...enter(0.5)} className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-white/10 bg-white/10 text-left">
          {copy.figures.map((f) => (
            <div key={f.label} className="bg-neutral-950/90 light:bg-[#F3EFE9]/90 px-6 py-7">
              <dt className="sr-only">{f.label}</dt>
              <dd className="text-4xl lg:text-5xl font-semibold tracking-tight text-gradient tabular">{f.value}</dd>
              <dd className="mt-1 text-sm text-white/55">{f.label}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

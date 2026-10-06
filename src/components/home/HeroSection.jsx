import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { base44 } from '@/api/base44Client';
import { useLanguage } from '@/components/LanguageContext';
import LogoMarquee from './LogoMarquee';

const TABS = [
  { id: 'code', label: 'Code' },
  { id: 'plan', label: 'Plan' },
  { id: 'collaborate', label: 'Collaborer' },
  { id: 'automate', label: 'Automatiser' },
  { id: 'secure', label: 'Sécuriser' },
];

const TAB_COPY = {
  code: 'Écrivez, testez et corrigez votre code rapidement, du boilerplate simple aux fonctionnalités complexes.',
  plan: 'Planifiez vos projets avec une vision claire, des roadmaps structurées et un suivi en temps réel.',
  collaborate: 'Réunissez développeurs, équipes et clients sur une seule plateforme collaborative.',
  automate: 'Automatisez vos déploiements et vos processus pour gagner en vitesse et en fiabilité.',
  secure: 'Sécurisez vos données et vos applications avec des standards de niveau entreprise.',
};

// Lignes de code stylisées pour l'éditeur visuel
const CODE_LINES = [
  { ind: 0, tokens: [['keyword', 'import'], ['plain', ' { build } '], ['keyword', 'from'], ['string', " 'precisions'"]] },
  { ind: 0, tokens: [] },
  { ind: 0, tokens: [['keyword', 'const'], ['plain', ' '], ['fn', 'solution'], ['plain', ' = ('], ['param', 'vision'], ['plain', ') => {']] },
  { ind: 1, tokens: [['keyword', 'return'], ['fn', ' build'], ['plain', '({']] },
  { ind: 2, tokens: [['prop', 'strategy'], ['plain', ': '], ['string', "'agile'"], ['plain', ',']] },
  { ind: 2, tokens: [['prop', 'design'], ['plain', ': '], ['string', "'premium'"], ['plain', ',']] },
  { ind: 2, tokens: [['prop', 'stack'], ['plain', ': ['], ['string', "'React'"], ['plain', ', '], ['string', "'Node'"], ['plain', '],']] },
  { ind: 2, tokens: [['prop', 'deliver'], ['plain', ': '], ['bool', 'true'], ['plain', ',']] },
  { ind: 1, tokens: [['plain', '})']] },
  { ind: 0, tokens: [['plain', '}']] },
];

const TOKEN_COLORS = {
  keyword: '#ff7b72',
  string: '#a5d6ff',
  fn: '#d2a8ff',
  param: '#ffa657',
  prop: '#79c0ff',
  bool: '#79c0ff',
  plain: '#c9d1d9',
};

function CodeEditor() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Halo lumineux */}
      <div className="absolute -inset-2 bg-gradient-to-tr from-[#C9A86C]/30 via-purple-500/20 to-[#C9A86C]/30 rounded-2xl blur-2xl opacity-70" />
      <div className="absolute -inset-1 rounded-[14px] bg-gradient-to-tr from-[#C9A86C]/40 to-purple-500/30 blur-md" />

      {/* Fenêtre éditeur */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0d1117]/60 backdrop-blur-xl">
        {/* Barre de titre */}
        <div className="flex items-center gap-2 px-4 h-9 bg-white/5 border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          <div className="ml-4 text-xs text-gray-500 font-mono">solution.ts</div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-12 bg-[#0d1117] border-r border-white/5 flex flex-col items-center py-3 gap-5">
            <div className="w-4 h-4 rounded bg-[#C9A86C]/70" />
            <div className="w-4 h-4 rounded bg-white/10" />
            <div className="w-4 h-4 rounded bg-white/10" />
            <div className="w-4 h-4 rounded bg-white/10" />
          </div>

          {/* Code */}
          <div className="flex-1 bg-[#0d1117] p-5 font-mono text-[13px] leading-relaxed overflow-x-auto">
            {CODE_LINES.map((line, i) => (
              <div key={i} className="flex">
                <span className="select-none text-gray-700 w-8 text-right pr-4">{i + 1}</span>
                <span style={{ paddingLeft: `${line.ind * 20}px` }}>
                  {line.tokens.length === 0 ? (
                    <span>&nbsp;</span>
                  ) : (
                    line.tokens.map((tok, j) => (
                      <span key={j} style={{ color: TOKEN_COLORS[tok[0]] }}>{tok[1]}</span>
                    ))
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Panneau Copilot */}
        <div className="border-t border-white/5 bg-white/5 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded bg-gradient-to-tr from-[#C9A86C] to-purple-500 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-xs text-gray-300 font-medium">PRECISIONS</span>
            <span className="text-[10px] text-gray-600">· Chat</span>
          </div>
          <p className="text-xs text-gray-400 mb-3 leading-relaxed">
            Refactorisation proposée : extraction de la logique de build en modules testables,
            avec une couverture de sécurité renforcée.
          </p>
          <div className="flex items-center gap-2 bg-[#0d1117] border border-white/10 rounded-lg px-3 py-2">
            <span className="text-xs text-gray-600">Posez une question ou tapez « / » pour les commandes</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('code');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    await base44.entities.Lead.create({
      email,
      full_name: 'Hero Form Lead',
      source: 'hero_form',
      status: 'new',
    });
    toast.success(t('contact.form.successMessage'));
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#010409] pt-40 pb-0">
      {/* Fond radial sombre */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 35%, #040d21 0%, #010409 70%)',
        }}
      />

      {/* Orbes flottants */}
      <div className="absolute top-[18%] left-[20%] w-40 h-40 rounded-full bg-gradient-to-tr from-purple-500/30 to-[#C9A86C]/30 blur-2xl opacity-60 animate-pulse" />
      <div className="absolute top-[14%] right-[22%] w-32 h-32 rounded-full bg-gradient-to-tr from-[#C9A86C]/30 to-purple-500/20 blur-2xl opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Grille subtile */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 text-center pt-8">
        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6 tracking-tight"
        >
          {t('hero.title').split(' ').slice(0, -1).join(' ')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A86C] to-[#E8D5B5]">
            {t('hero.title').split(' ').slice(-1)[0]}
          </span>
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Barre CTA */}
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-16"
        >
          <Input
            type="email"
            placeholder={t('contact.form.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 h-12 bg-white text-black placeholder:text-gray-500 rounded-lg px-4 border-0"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 px-6 bg-[#2da44e] hover:bg-[#2c974b] text-white font-semibold rounded-lg whitespace-nowrap"
          >
            {isSubmitting ? '...' : 'Démarrer'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.form>

        {/* Éditeur de code visuel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="px-2 sm:px-4"
        >
          <CodeEditor />
        </motion.div>
      </div>

      {/* Barre de navigation pilule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="relative z-10 mt-14 mb-6 flex flex-col items-center"
      >
        <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-white/5 border border-white/10 shadow-xl backdrop-blur-xl">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-4 max-w-xl mx-auto px-6">
          {TAB_COPY[activeTab]}
        </p>
      </motion.div>

      {/* Marquee de logos */}
      <div className="relative z-10 w-full mt-8">
        <LogoMarquee />
      </div>

      {/* Indicateur de défilement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 mt-6 mb-4"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-gray-600"
        >
          <span className="text-xs uppercase tracking-widest">{t('hero.scrollDown')}</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  TrendingUp, 
  ArrowRight,
  Sparkles,
  Globe,
  Megaphone,
  Coins,
  Briefcase,
  Handshake,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/LanguageContext';

const getServices = (t) => [
  {
    icon: Globe,
    title: 'Communication Digitale',
    description: 'Stratégies digitales complètes : marketing, publicité média, social media et développement web.',
    features: ['Marketing Digital', 'Publicité Média', 'Développement Web'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    category: 'communication',
  },
  {
    icon: Megaphone,
    title: 'Publicité & Médias',
    description: 'Campagnes publicitaires percutantes sur tous les canaux pour maximiser votre visibilité.',
    features: ['TV & Radio', 'Presse & Affichage', 'Digital Ads'],
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10',
    category: 'communication',
  },
  {
    icon: Lightbulb,
    title: 'Conseil Stratégique',
    description: 'Accompagnement stratégique pour définir et atteindre vos objectifs de développement.',
    features: ['Vision & Objectifs', 'Plan stratégique', 'Organisation'],
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    category: 'economique',
  },
  {
    icon: Coins,
    title: 'Financement de Projets',
    description: 'Recherche et préfinancement pour concrétiser vos projets de développement.',
    features: ['Recherche fonds', 'Préfinancement', 'Montage dossiers'],
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-500/10',
    category: 'economique',
  },
  {
    icon: Handshake,
    title: 'Relations Internationales',
    description: 'Développez vos activités et partenariats à l\'échelle internationale.',
    features: ['Partenariats', 'Expansion globale', 'Négociations'],
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-500/10',
    category: 'economique',
  },
  {
    icon: RefreshCw,
    title: 'Accompagnement du Changement',
    description: 'Réussissez vos transformations organisationnelles avec un accompagnement sur mesure.',
    features: ['Conduite changement', 'Formation', 'Adoption'],
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-500/10',
    category: 'economique',
  },
];

export default function ServicesSection() {
  const { t } = useLanguage();
  const services = getServices(t);
  return (
    <section className="py-24 lg:py-32 bg-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0A0B]/5 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#C9A86C]" />
            <span className="text-sm font-medium text-[#0A0A0B]">{t('services.tagline')}</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0B] mb-6"
                        >
                          {t('services.title')}
                        </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
                        >
                          {t('services.subtitle')}
                        </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="group h-full bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center mb-6`}>
                  <service.icon className={`w-7 h-7 bg-gradient-to-br ${service.color} bg-clip-text text-transparent`} 
                    style={{ stroke: `url(#${service.title})` }}
                  />
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id={service.title}>
                        <stop offset="0%" stopColor="currentColor" />
                        <stop offset="100%" stopColor="currentColor" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-[#0A0A0B] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <Link
                  to={createPageUrl('Services')}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A0A0B] group-hover:text-[#C9A86C] transition-colors"
                >
                  {t('services.learnMore')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to={createPageUrl('Services')}>
            <Button 
              size="lg" 
              className="rounded-full px-8 bg-[#0A0A0B] hover:bg-[#0A0A0B]/90 text-white"
            >
              {t('services.viewAll')}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
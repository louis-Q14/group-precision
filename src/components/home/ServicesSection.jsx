import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Code2, 
  TrendingUp, 
  GraduationCap,
  ArrowRight,
  Sparkles,
  Monitor,
  MessageCircle,
  Coins
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Monitor,
    title: 'Conception & Réalisation Numériques',
    description: 'Création de solutions web et mobiles performantes avec les dernières technologies du marché.',
    features: ['Applications web', 'Applications mobiles', 'APIs & Intégrations'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: MessageCircle,
    title: 'Consultation',
    description: 'Accompagnement personnalisé pour analyser vos besoins et définir les meilleures solutions.',
    features: ['Analyse des besoins', 'Recommandations', 'Suivi personnalisé'],
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-500/10',
  },
  {
    icon: Coins,
    title: 'Recherche des Financements',
    description: 'Identification et accompagnement dans l\'obtention de financements pour vos projets.',
    features: ['Subventions', 'Aides publiques', 'Montage de dossiers'],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Lightbulb,
    title: 'Conseil & Stratégie',
    description: 'Audit digital complet, définition de votre roadmap et accompagnement stratégique pour maximiser votre ROI.',
    features: ['Audit digital', 'Stratégie de croissance', 'Roadmap produit'],
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: TrendingUp,
    title: 'Marketing Digital',
    description: 'Stratégies d\'acquisition et de conversion optimisées pour accélérer votre croissance.',
    features: ['SEO & SEA', 'Social Media', 'Content Marketing'],
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10',
  },
  {
    icon: GraduationCap,
    title: 'Formation',
    description: 'Programmes de formation sur mesure pour monter en compétences vos équipes.',
    features: ['Workshops', 'E-learning', 'Coaching individuel'],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
  },
];

export default function ServicesSection() {
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
            <span className="text-sm font-medium text-[#0A0A0B]">Nos services</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0B] mb-6"
          >
            Des solutions complètes pour votre transformation digitale
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Une approche holistique combinant stratégie, technologie et créativité 
            pour des résultats mesurables et durables.
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
                  En savoir plus
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
              Voir tous nos services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
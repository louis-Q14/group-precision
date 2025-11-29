import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Lightbulb, TrendingUp, GraduationCap, ArrowRight, 
  CheckCircle, Sparkles, Target, Zap, Shield, Clock,
  Users, BarChart3, Globe, Megaphone, Monitor, Network,
  MessageSquare, Search, HeadphonesIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'strategie',
    icon: Lightbulb,
    title: 'Conseil en Stratégie Marketing & Communication',
    subtitle: 'Élaborez une stratégie gagnante',
    description: 'Nous élaborons et orchestrons des réponses tactiques et pertinentes à vos problématiques de communication grand public ou B2B. Notre expertise vous guide vers des décisions stratégiques éclairées.',
    features: [
      'Audit et diagnostic de votre communication actuelle',
      'Définition de votre positionnement et messages clés',
      'Élaboration de plans de communication intégrés',
      'Stratégie de marque et identité visuelle',
      'Conseil en relations publiques et média',
      'Accompagnement au changement'
    ],
    benefits: [
      { icon: Target, text: 'Positionnement clair' },
      { icon: Zap, text: 'Impact maximisé' },
      { icon: Shield, text: 'Cohérence garantie' },
    ],
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'publicite',
    icon: Megaphone,
    title: 'Publicité Média',
    subtitle: 'Maximisez votre visibilité',
    description: 'Conception et déploiement de campagnes publicitaires percutantes sur tous les canaux média : TV, radio, presse, affichage et digital pour atteindre efficacement vos cibles.',
    features: [
      'Conception créative de campagnes publicitaires',
      'Achat d\'espaces média optimisé',
      'Campagnes TV, radio et presse',
      'Affichage et communication extérieure',
      'Publicité programmatique',
      'Mesure et optimisation des performances'
    ],
    benefits: [
      { icon: BarChart3, text: 'ROI optimisé' },
      { icon: Users, text: 'Audience ciblée' },
      { icon: TrendingUp, text: 'Notoriété accrue' },
    ],
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-50',
  },
  {
    id: 'digital',
    icon: Globe,
    title: 'Communication Digitale & Publishing',
    subtitle: 'Rayonnez sur le digital',
    description: 'Stratégies digitales complètes pour renforcer votre présence en ligne : réseaux sociaux, content marketing, SEO/SEA et création de contenus engageants.',
    features: [
      'Stratégie social media et community management',
      'Content marketing et création de contenus',
      'SEO et référencement naturel',
      'Campagnes SEA (Google Ads, Meta Ads)',
      'Email marketing et automation',
      'Influence marketing et partenariats'
    ],
    benefits: [
      { icon: Globe, text: 'Présence renforcée' },
      { icon: MessageSquare, text: 'Engagement élevé' },
      { icon: Search, text: 'Visibilité optimale' },
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'reseau',
    icon: Network,
    title: 'Animation de Réseau',
    subtitle: 'Fédérez vos partenaires',
    description: 'Animation et dynamisation de vos réseaux de distribution, franchises ou partenaires pour maximiser leur engagement et leurs performances commerciales.',
    features: [
      'Conception de programmes d\'animation',
      'Outils de communication réseau',
      'Événements et conventions',
      'Incentives et challenges commerciaux',
      'Formations et accompagnement terrain',
      'Reporting et suivi des performances'
    ],
    benefits: [
      { icon: Users, text: 'Réseau engagé' },
      { icon: Target, text: 'Objectifs atteints' },
      { icon: Zap, text: 'Dynamique positive' },
    ],
    color: 'from-purple-500 to-violet-500',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'audit',
    icon: Search,
    title: 'Conseil & Audit',
    subtitle: 'Évaluez et optimisez',
    description: 'Audits approfondis de votre communication et organisation pour identifier les axes d\'amélioration et définir des recommandations actionnables.',
    features: [
      'Audit de communication globale',
      'Analyse de la concurrence',
      'Étude d\'image et de notoriété',
      'Audit digital et e-réputation',
      'Diagnostic organisationnel',
      'Recommandations stratégiques'
    ],
    benefits: [
      { icon: Search, text: 'Vision claire' },
      { icon: Shield, text: 'Risques identifiés' },
      { icon: BarChart3, text: 'Données fiables' },
    ],
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'web',
    icon: Monitor,
    title: 'Développement Web',
    subtitle: 'Créez votre vitrine digitale',
    description: 'Conception et développement de sites web performants, applications et plateformes digitales sur mesure pour répondre à vos objectifs business.',
    features: [
      'Sites vitrines et institutionnels',
      'Sites e-commerce et marketplaces',
      'Applications web sur mesure',
      'Intranets et extranets',
      'Maintenance et évolutions',
      'Hébergement et sécurité'
    ],
    benefits: [
      { icon: Monitor, text: 'Solutions sur mesure' },
      { icon: Zap, text: 'Performance optimale' },
      { icon: Shield, text: 'Sécurité renforcée' },
    ],
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-50',
  },
  {
    id: 'support',
    icon: HeadphonesIcon,
    title: 'Assistance aux Utilisateurs',
    subtitle: 'Accompagnez vos clients',
    description: 'Services d\'assistance et de support pour vos utilisateurs : hotline, helpdesk, formation utilisateurs et documentation pour garantir une expérience optimale.',
    features: [
      'Mise en place de hotlines dédiées',
      'Helpdesk et support technique',
      'Formation des utilisateurs',
      'Création de documentation et guides',
      'FAQ et bases de connaissances',
      'Suivi de la satisfaction client'
    ],
    benefits: [
      { icon: HeadphonesIcon, text: 'Support réactif' },
      { icon: Users, text: 'Utilisateurs autonomes' },
      { icon: Clock, text: 'Disponibilité étendue' },
    ],
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
  },
];

const processSteps = [
  { number: '01', title: 'Écoute', description: 'Compréhension approfondie de vos enjeux et objectifs' },
  { number: '02', title: 'Stratégie', description: 'Élaboration de solutions tactiques pertinentes' },
  { number: '03', title: 'Création', description: 'Conception et production des dispositifs' },
  { number: '04', title: 'Déploiement', description: 'Mise en œuvre et optimisation continue' },
];

export default function Services() {
  const [activeService, setActiveService] = useState('strategie');

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0B] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A86C]/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#C9A86C]" />
            <span className="text-sm text-white">Nos services</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Communication & Marketing
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Nous élaborons et orchestrons des réponses tactiques et pertinentes 
            à vos problématiques de communication grand public ou B2B.
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-all duration-300 ${
                  activeService === service.id
                    ? 'bg-[#0A0A0B] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <service.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{service.title.split(' ').slice(0, 2).join(' ')}</span>
                <span className="sm:hidden">{service.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Service Content */}
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: activeService === service.id ? 1 : 0,
                y: activeService === service.id ? 0 : 20,
                display: activeService === service.id ? 'block' : 'none'
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left - Info */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-4">
                    {service.title}
                  </h2>
                  <p className="text-lg text-[#C9A86C] font-medium mb-4">
                    {service.subtitle}
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    {service.description}
                  </p>

                  {/* Benefits */}
                  <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    {service.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                          <benefit.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                      </div>
                    ))}
                  </div>

                  <Link to={createPageUrl('Contact')}>
                    <Button className="rounded-full px-8 bg-[#0A0A0B] hover:bg-[#0A0A0B]/90">
                      Discuter de votre projet
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>

                {/* Right - Features */}
                <div className={`${service.bgColor} rounded-3xl p-8 lg:p-10`}>
                  <h3 className="text-xl font-semibold text-[#0A0A0B] mb-6">
                    Ce que nous proposons
                  </h3>
                  <ul className="space-y-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 mt-0.5 bg-gradient-to-br ${service.color} text-white rounded-full`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-4"
            >
              Notre méthodologie
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Une approche éprouvée pour des réponses tactiques et pertinentes à vos enjeux.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 h-full border border-gray-100">
                  <div className="text-5xl font-bold text-[#C9A86C]/30 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0A0A0B] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gray-200" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0A0A0B]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-white mb-6"
          >
            Prêt à booster votre communication ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 mb-8"
          >
            Contactez-nous pour une consultation gratuite et découvrez comment 
            nous pouvons vous aider à atteindre vos objectifs.
          </motion.p>
          <Link to={createPageUrl('Contact')}>
            <Button className="rounded-full px-8 py-6 bg-[#C9A86C] hover:bg-[#B8975B] text-[#0A0A0B] font-semibold text-lg">
              Planifier un appel découverte
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
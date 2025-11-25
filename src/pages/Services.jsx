import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Lightbulb, Code2, TrendingUp, GraduationCap, ArrowRight, 
  CheckCircle, Sparkles, Target, Zap, Shield, Clock,
  Users, BarChart3, Globe, Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const services = [
  {
    id: 'consulting',
    icon: Lightbulb,
    title: 'Conseil & Stratégie',
    subtitle: 'Transformez votre vision en roadmap actionnable',
    description: 'Nous analysons votre écosystème digital, identifions les opportunités de croissance et définissons une stratégie sur mesure alignée avec vos objectifs business.',
    features: [
      'Audit digital complet (technique, UX, SEO)',
      'Analyse concurrentielle et benchmark',
      'Définition de la roadmap produit',
      'Workshops d\'innovation et idéation',
      'Business case et estimation ROI',
      'Accompagnement au changement'
    ],
    benefits: [
      { icon: Target, text: 'Objectifs clairs et mesurables' },
      { icon: Zap, text: 'Time-to-market optimisé' },
      { icon: Shield, text: 'Risques maîtrisés' },
    ],
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'development',
    icon: Code2,
    title: 'Développement',
    subtitle: 'Des solutions techniques robustes et évolutives',
    description: 'Notre équipe d\'experts conçoit et développe des applications web et mobiles performantes, scalables et sécurisées avec les dernières technologies.',
    features: [
      'Applications web modernes (React, Vue, Angular)',
      'Applications mobiles natives et cross-platform',
      'APIs RESTful et GraphQL',
      'Architecture cloud et microservices',
      'Intégrations tierces et CRM',
      'Maintenance et évolutions'
    ],
    benefits: [
      { icon: Globe, text: 'Solutions cross-platform' },
      { icon: Shield, text: 'Sécurité renforcée' },
      { icon: Zap, text: 'Performance optimale' },
    ],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'marketing',
    icon: TrendingUp,
    title: 'Marketing Digital',
    subtitle: 'Accélérez votre croissance en ligne',
    description: 'Des stratégies d\'acquisition et de conversion data-driven pour maximiser votre visibilité, générer des leads qualifiés et optimiser votre ROI marketing.',
    features: [
      'SEO technique et éditorial',
      'Campagnes SEA (Google Ads, Meta Ads)',
      'Social Media Management',
      'Content Marketing & Copywriting',
      'Email Marketing & Automation',
      'Analytics et reporting avancé'
    ],
    benefits: [
      { icon: BarChart3, text: 'ROI mesurable' },
      { icon: Users, text: 'Audience qualifiée' },
      { icon: TrendingUp, text: 'Croissance durable' },
    ],
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'formation',
    icon: GraduationCap,
    title: 'Formation',
    subtitle: 'Montez en compétences vos équipes',
    description: 'Programmes de formation personnalisés pour autonomiser vos équipes sur les compétences digitales essentielles à votre transformation.',
    features: [
      'Formations sur mesure (présentiel/distanciel)',
      'Workshops pratiques et hands-on',
      'Parcours e-learning interactifs',
      'Coaching individuel et mentorat',
      'Certifications professionnelles',
      'Accompagnement post-formation'
    ],
    benefits: [
      { icon: Users, text: 'Équipes autonomes' },
      { icon: Palette, text: 'Pédagogie innovante' },
      { icon: Clock, text: 'Formats flexibles' },
    ],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
  },
];

const processSteps = [
  { number: '01', title: 'Découverte', description: 'Analyse approfondie de vos besoins et objectifs' },
  { number: '02', title: 'Stratégie', description: 'Définition de la solution et de la roadmap' },
  { number: '03', title: 'Exécution', description: 'Développement agile avec livraisons itératives' },
  { number: '04', title: 'Optimisation', description: 'Amélioration continue et support dédié' },
];

export default function Services() {
  const [activeService, setActiveService] = useState('consulting');

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
            Des solutions sur mesure pour chaque défi
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            De la stratégie à l'exécution, nous vous accompagnons à chaque étape 
                              de votre transformation.
          </motion.p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                  activeService === service.id
                    ? 'bg-[#0A0A0B] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <service.icon className="w-5 h-5" />
                {service.title}
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
                  <Badge className={`mb-4 ${service.bgColor} text-gray-900 border-0`}>
                    {service.subtitle}
                  </Badge>
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-6">
                    {service.title}
                  </h2>
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
              Une approche éprouvée pour garantir le succès de vos projets digitaux.
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
                
                {/* Connector line */}
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
            Prêt à démarrer votre projet ?
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
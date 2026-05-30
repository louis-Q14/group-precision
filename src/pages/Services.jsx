import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Lightbulb, TrendingUp, ArrowRight, 
  CheckCircle, Sparkles, Target, Zap, Shield, Clock,
  Users, BarChart3, Globe, Megaphone, Monitor, Network,
  MessageSquare, Search, HeadphonesIcon, Coins, Briefcase,
  Building2, Handshake, Settings, RefreshCw, ShoppingCart, Archive, GraduationCap, Package, CreditCard, BookOpen, Database, Link2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const serviceCategories = [
  {
    id: 'communication',
    title: 'Communication Digitale',
    description: 'Élaborer et orchestrer des réponses tactiques à vos problématiques de communication',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    services: [
      {
        id: 'strategie',
        icon: Lightbulb,
        title: 'Conseil en Stratégie Marketing & Communication',
        subtitle: 'Élaborez une stratégie gagnante',
        description: 'Nous élaborons et orchestrons des réponses tactiques et pertinentes à vos problématiques de communication grand public ou B2B.',
        features: [
          'Audit et diagnostic de votre communication actuelle',
          'Définition de votre positionnement et messages clés',
          'Élaboration de plans de communication intégrés',
          'Stratégie de marque et identité visuelle',
          'Conseil en relations publiques et média',
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
        description: 'Conception et déploiement de campagnes publicitaires percutantes sur tous les canaux média.',
        features: [
          'Conception créative de campagnes publicitaires',
          'Achat d\'espaces média optimisé',
          'Campagnes TV, radio et presse',
          'Affichage et communication extérieure',
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
        description: 'Stratégies digitales complètes pour renforcer votre présence en ligne.',
        features: [
          'Stratégie social media et community management',
          'Content marketing et création de contenus',
          'SEO et référencement naturel',
          'Campagnes SEA (Google Ads, Meta Ads)',
          'Email marketing et automation'
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
        description: 'Animation et dynamisation de vos réseaux de distribution et partenaires.',
        features: [
          'Conception de programmes d\'animation',
          'Outils de communication réseau',
          'Événements et conventions',
          'Incentives et challenges commerciaux',
          'Formations et accompagnement terrain'
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
        id: 'web',
        icon: Monitor,
        title: 'Développement Web',
        subtitle: 'Créez votre vitrine digitale',
        description: 'Conception et développement de sites web et applications sur mesure.',
        features: [
          'Sites vitrines et institutionnels',
          'Sites e-commerce et marketplaces',
          'Applications web sur mesure',
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
        description: 'Services d\'assistance et de support pour vos utilisateurs.',
        features: [
          'Mise en place de hotlines dédiées',
          'Helpdesk et support technique',
          'Formation des utilisateurs',
          'Création de documentation et guides',
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
    ]
  },
  {
    id: 'economique',
    title: 'Développement Économique',
    description: 'Accompagner vos projets de développement et croissance économique',
    icon: Briefcase,
    color: 'from-emerald-500 to-green-500',
    services: [
      {
        id: 'financement',
        icon: Coins,
        title: 'Recherche de Financement',
        subtitle: 'Trouvez les fonds pour vos projets',
        description: 'Identification et accompagnement dans l\'obtention des financements adaptés à vos projets.',
        features: [
          'Identification des sources de financement',
          'Montage des dossiers de demande',
          'Recherche de subventions et aides publiques',
          'Accompagnement auprès des bailleurs de fonds',
          'Suivi et reporting des financements'
        ],
        benefits: [
          { icon: Coins, text: 'Fonds mobilisés' },
          { icon: Shield, text: 'Dossiers solides' },
          { icon: BarChart3, text: 'Taux de succès élevé' },
        ],
        color: 'from-emerald-500 to-green-500',
        bgColor: 'bg-emerald-50',
      },
      {
        id: 'prefinancement',
        icon: TrendingUp,
        title: 'Préfinancement de Projets',
        subtitle: 'Lancez vos projets rapidement',
        description: 'Solutions de préfinancement pour démarrer vos projets avant l\'obtention des fonds définitifs.',
        features: [
          'Analyse de faisabilité financière',
          'Structuration du préfinancement',
          'Mise en relation avec partenaires financiers',
          'Garanties et sécurisation',
          'Suivi de trésorerie projet'
        ],
        benefits: [
          { icon: Zap, text: 'Démarrage rapide' },
          { icon: Shield, text: 'Risques maîtrisés' },
          { icon: TrendingUp, text: 'Croissance accélérée' },
        ],
        color: 'from-blue-500 to-indigo-500',
        bgColor: 'bg-blue-50',
      },
      {
        id: 'projets',
        icon: Building2,
        title: 'Création de Projets Multi-sectoriels',
        subtitle: 'Développez des projets d\'envergure',
        description: 'Conception et structuration de projets impliquant plusieurs secteurs d\'activité.',
        features: [
          'Étude de faisabilité multi-sectorielle',
          'Montage de partenariats stratégiques',
          'Coordination des parties prenantes',
          'Business plan et modèle économique',
          'Pilotage et gouvernance projet'
        ],
        benefits: [
          { icon: Building2, text: 'Projets structurés' },
          { icon: Users, text: 'Synergies créées' },
          { icon: Target, text: 'Impact maximisé' },
        ],
        color: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-50',
      },
      {
        id: 'strategique',
        icon: Lightbulb,
        title: 'Consultation Stratégique',
        subtitle: 'Définissez votre vision',
        description: 'Accompagnement stratégique pour définir et atteindre vos objectifs de développement.',
        features: [
          'Diagnostic stratégique approfondi',
          'Définition de la vision et des objectifs',
          'Élaboration du plan stratégique',
          'Alignement organisationnel',
          'Tableaux de bord et indicateurs'
        ],
        benefits: [
          { icon: Lightbulb, text: 'Vision claire' },
          { icon: Target, text: 'Objectifs définis' },
          { icon: BarChart3, text: 'Résultats mesurables' },
        ],
        color: 'from-purple-500 to-violet-500',
        bgColor: 'bg-purple-50',
      },
      {
        id: 'organisation',
        icon: Settings,
        title: 'Organisation & Management',
        subtitle: 'Optimisez votre structure',
        description: 'Conseil en organisation pour améliorer l\'efficacité et la performance de votre structure.',
        features: [
          'Audit organisationnel',
          'Optimisation des processus',
          'Structuration des équipes',
          'Mise en place de systèmes de management',
          'Formation des managers'
        ],
        benefits: [
          { icon: Settings, text: 'Processus optimisés' },
          { icon: Users, text: 'Équipes performantes' },
          { icon: Zap, text: 'Efficacité accrue' },
        ],
        color: 'from-slate-500 to-gray-600',
        bgColor: 'bg-slate-50',
      },
      {
        id: 'expertise',
        icon: Search,
        title: 'Consultation Spécialisée / d\'Expertise',
        subtitle: 'Bénéficiez d\'experts métiers',
        description: 'Expertise pointue dans des domaines spécifiques pour répondre à vos enjeux techniques.',
        features: [
          'Études et analyses sectorielles',
          'Expertise technique spécialisée',
          'Benchmarks et meilleures pratiques',
          'Recommandations opérationnelles',
          'Transfer de compétences'
        ],
        benefits: [
          { icon: Search, text: 'Expertise pointue' },
          { icon: Shield, text: 'Fiabilité garantie' },
          { icon: Lightbulb, text: 'Solutions innovantes' },
        ],
        color: 'from-cyan-500 to-teal-500',
        bgColor: 'bg-cyan-50',
      },
      {
        id: 'changement',
        icon: RefreshCw,
        title: 'Accompagnement du Changement',
        subtitle: 'Réussissez vos transformations',
        description: 'Accompagnement des processus de transformation pour garantir l\'adhésion et le succès.',
        features: [
          'Diagnostic de maturité au changement',
          'Stratégie de conduite du changement',
          'Communication interne',
          'Formation et montée en compétences',
          'Suivi de l\'adoption'
        ],
        benefits: [
          { icon: RefreshCw, text: 'Transition réussie' },
          { icon: Users, text: 'Adhésion obtenue' },
          { icon: Target, text: 'Objectifs atteints' },
        ],
        color: 'from-rose-500 to-pink-500',
        bgColor: 'bg-rose-50',
      },
      {
        id: 'international',
        icon: Handshake,
        title: 'Relations Internationales',
        subtitle: 'Développez-vous à l\'international',
        description: 'Accompagnement pour développer vos activités et partenariats à l\'échelle internationale.',
        features: [
          'Étude des marchés internationaux',
          'Mise en relation avec partenaires étrangers',
          'Accompagnement aux négociations',
          'Structuration de partenariats internationaux',
          'Représentation et lobbying'
        ],
        benefits: [
          { icon: Handshake, text: 'Partenariats solides' },
          { icon: Globe, text: 'Expansion globale' },
          { icon: Shield, text: 'Risques maîtrisés' },
        ],
        color: 'from-indigo-500 to-purple-500',
        bgColor: 'bg-indigo-50',
      },
    ]
  },
  {
    id: 'plateformes',
    title: 'Plateformes Digitales',
    description: 'Nos plateformes propriétaires au service du numérique en RD Congo',
    icon: Database,
    color: 'from-orange-500 to-teal-500',
    services: [
      {
        id: 'sombateka',
        icon: ShoppingCart,
        title: 'SombaTeka — Plateforme de Vente en Ligne',
        subtitle: 'Le marché digital pour tous en RDC',
        description: 'SombaTeka est une plateforme e-commerce dédiée à la vente en ligne accessible à tous — particuliers, commerçants, PME et grandes entreprises. Elle facilite les échanges commerciaux en RD Congo et à l\'international avec des outils simples et sécurisés.',
        features: [
          'Création de boutiques en ligne personnalisées',
          'Système de paiement mobile et bancaire sécurisé',
          'Gestion des commandes et des stocks',
          'Livraison intégrée avec suivi en temps réel',
          'Marketplace multi-vendeurs et multi-catégories',
          'Tableau de bord analytics pour les vendeurs',
          'Support client dédié pour les marchands',
        ],
        benefits: [
          { icon: ShoppingCart, text: 'Vente simplifiée' },
          { icon: CreditCard, text: 'Paiements sécurisés' },
          { icon: Package, text: 'Livraison intégrée' },
        ],
        color: 'from-orange-500 to-amber-500',
        bgColor: 'bg-orange-50',
      },
      {
        id: 'harchive',
        icon: Archive,
        title: 'HARCHIVE — Archivage Académique Numérique',
        subtitle: 'Connecter tous les corps académiques de la RDC',
        description: 'HARCHIVE est une plateforme d\'archivage numérique dédiée au monde académique de la RD Congo. Elle centralise et sécurise les données des étudiants, enseignants et institutions, tout en créant un réseau national reliant tous les corps académiques du pays.',
        features: [
          'Archivage sécurisé des dossiers académiques des étudiants',
          'Gestion des diplômes et attestations numériques',
          'Réseau connectant universités, instituts et écoles de la RDC',
          'Vérification en ligne de l\'authenticité des diplômes',
          'Suivi du parcours académique de la licence au doctorat',
          'Annuaire des enseignants et chercheurs nationaux',
          'Partage de ressources pédagogiques entre institutions',
        ],
        benefits: [
          { icon: BookOpen, text: 'Archives fiables' },
          { icon: GraduationCap, text: 'Diplômes certifiés' },
          { icon: Link2, text: 'Réseau académique RDC' },
        ],
        color: 'from-teal-500 to-green-500',
        bgColor: 'bg-teal-50',
      },
    ]
  }
];

const processSteps = [
  { number: '01', title: 'Écoute', description: 'Compréhension approfondie de vos enjeux et objectifs' },
  { number: '02', title: 'Stratégie', description: 'Élaboration de solutions tactiques pertinentes' },
  { number: '03', title: 'Création', description: 'Conception et production des dispositifs' },
  { number: '04', title: 'Déploiement', description: 'Mise en œuvre et optimisation continue' },
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('communication');
  const [activeService, setActiveService] = useState('strategie');
  

  const currentCategory = serviceCategories.find(c => c.id === activeCategory);
  const currentService = currentCategory?.services.find(s => s.id === activeService);

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
            Nos Expertises
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Communication Digitale & Développement Économique : 
            des solutions complètes pour accompagner votre croissance.
          </motion.p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveService(category.services[0].id);
                }}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-[#0A0A0B] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-6 h-6" />
                <div className="text-left">
                  <div className="font-semibold">{category.title}</div>
                  <div className="text-xs opacity-70">{category.services.length} services</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Category Description */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#0A0A0B] mb-2">{currentCategory?.title}</h2>
            <p className="text-gray-600">{currentCategory?.description}</p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {currentCategory?.services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeService === service.id
                    ? 'bg-[#C9A86C] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <service.icon className="w-4 h-4" />
                <span className="hidden md:inline">{service.title.split(' ').slice(0, 2).join(' ')}</span>
                <span className="md:hidden">{service.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Service Content */}
          {currentService && (
            <motion.div
              key={currentService.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left - Info */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-4">
                    {currentService.title}
                  </h2>
                  <p className="text-lg text-[#C9A86C] font-medium mb-4">
                    {currentService.subtitle}
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    {currentService.description}
                  </p>

                  {/* Benefits */}
                  <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    {currentService.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentService.color} flex items-center justify-center`}>
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
                <div className={`${currentService.bgColor} rounded-3xl p-8 lg:p-10`}>
                  <h3 className="text-xl font-semibold text-[#0A0A0B] mb-6">
                    Ce que nous proposons
                  </h3>
                  <ul className="space-y-4">
                    {currentService.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 mt-0.5 bg-gradient-to-br ${currentService.color} text-white rounded-full`} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
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
            Prêt à développer votre activité ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 mb-8"
          >
            Contactez-nous pour une consultation gratuite et découvrez comment 
            nous pouvons vous accompagner.
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
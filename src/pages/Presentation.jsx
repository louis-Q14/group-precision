import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import {
  Lightbulb, TrendingUp, ArrowRight, CheckCircle, Sparkles, Target, Zap, Shield, Clock,
  Users, BarChart3, Globe, Megaphone, Monitor, Network, MessageSquare, Search,
  HeadphonesIcon, Coins, Briefcase, Building2, Handshake, Settings, RefreshCw,
  ShoppingCart, Archive, GraduationCap, Package, CreditCard, BookOpen, Database,
  Link2, Printer, Code2, Layers, Server, Smartphone, Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const companyStats = [
  { value: '5', label: 'Plateformes propriétaires' },
  { value: '3', label: 'Domaines d\'expertise' },
  { value: '20+', label: 'Services spécialisés' },
  { value: '100%', label: 'Sur mesure' },
];

const serviceCategories = [
  {
    id: 'communication',
    title: 'Communication Digitale',
    description: 'Élaborer et orchestrer des réponses tactiques à vos problématiques de communication grand public ou B2B, en alignant identité de marque, médias et digital pour un impact mesurable.',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    services: [
      {
        id: 'strategie',
        icon: Lightbulb,
        title: 'Conseil en Stratégie Marketing & Communication',
        subtitle: 'Élaborez une stratégie gagnante',
        description: 'Nous élaborons et orchestrons des réponses tactiques et pertinentes à vos problématiques de communication grand public ou B2B. Notre démarche part d\'un audit complet de votre écosystème pour définir un positionnement différenciant, des messages clés et un plan d\'action cohérent sur l\'ensemble de vos points de contact.',
        howItWorks: 'Audit & diagnostic → positionnement & messages clés → plan de communication intégré → déploiement coordonné → mesure et optimisation continue. Nous travaillons en atelier avec vos équipes, livrons des livrables structurés (chartes, plateformes de marque, plans éditoriaux) et accompagnons la mise en œuvre opérationnelle.',
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
        description: 'Conception et déploiement de campagnes publicitaires percutantes sur tous les canaux média. De la créativité au media planning, nous orchestrons des dispositifs qui touchent la bonne audience, au bon moment, avec le bon message — en TV, radio, presse, affichage et digital.',
        howItWorks: 'Brief créatif → conception et production des visuels/movies → media planning et achat d\'espaces optimisé → diffusion multi-canal → tracking et optimisation des performances. Nous pilotons le ROI de chaque canal et ajustons les investissements en temps réel.',
        features: [
          'Conception créative de campagnes publicitaires',
          'Achat d\'espaces média optimisé',
          'Campagnes TV, radio et presse',
          'Affichage et communication extérieure',
          'Mesure et optimisation des performances',
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
        description: 'Stratégies digitales complètes pour renforcer votre présence en ligne. Nous construisons votre écosystème digital : social media, contenu, référencement, acquisition payante et automation, pour générer un flux constant d\'engagement et de leads qualifiés.',
        howItWorks: 'Stratégie digitale → production de contenus → community management → acquisition (SEO/SEA) → nurturing & automation. Chaque levier est piloté par la donnée, avec des tableaux de bord partagés et des cycles d\'optimisation continus.',
        features: [
          'Stratégie social media et community management',
          'Content marketing et création de contenus',
          'SEO et référencement naturel',
          'Campagnes SEA (Google Ads, Meta Ads)',
          'Email marketing et automation',
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
        description: 'Animation et dynamisation de vos réseaux de distribution et partenaires. Nous concevons des programmes d\'animation qui créent de l\'engagement, stimulent la performance commerciale et renforcent le sentiment d\'appartenance à votre marque.',
        howItWorks: 'Diagnostic du réseau → conception du programme d\'animation → outils de communication dédiés → événements, incentives et challenges → formation et accompagnement terrain. Nous mesurons l\'engagement et l\'impact commercial à chaque étape.',
        features: [
          'Conception de programmes d\'animation',
          'Outils de communication réseau',
          'Événements et conventions',
          'Incentives et challenges commerciaux',
          'Formations et accompagnement terrain',
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
        description: 'Conception et développement de sites web et applications sur mesure. Nous concevons des expériences web performantes, accessibles et sécurisées, du site institutionnel à la marketplace complexe, avec une attention constante portée à l\'expérience utilisateur et à la vitesse.',
        howItWorks: 'Cadrage & UX/UI → développement front-end et back-end → intégrations tierces → tests & QA → mise en production → maintenance et évolutions. Nous utilisons des stacks modernes (React, Node.js) et des pratiques DevOps pour des livraisons fiables et itératives.',
        features: [
          'Sites vitrines et institutionnels',
          'Sites e-commerce et marketplaces',
          'Applications web sur mesure',
          'Maintenance et évolutions',
          'Hébergement et sécurité',
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
        description: 'Services d\'assistance et de support pour vos utilisateurs. Nous mettons en place des dispositifs de support réactifs et humains — hotlines, helpdesk, bases de connaissances — qui améliorent la satisfaction et l\'autonomie de vos utilisateurs.',
        howItWorks: 'Analyse des besoins support → mise en place de la hotline/helpdesk → création de la documentation → formation des utilisateurs → suivi de la satisfaction. Nous pilotons la qualité du support via des indicateurs clairs (temps de réponse, résolution, CSAT).',
        features: [
          'Mise en place de hotlines dédiées',
          'Helpdesk et support technique',
          'Formation des utilisateurs',
          'Création de documentation et guides',
          'Suivi de la satisfaction client',
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
    description: 'Accompagner vos projets de développement et de croissance économique, du financement à la structuration, en passant par le pilotage stratégique et l\'expansion internationale.',
    icon: Briefcase,
    color: 'from-emerald-500 to-green-500',
    services: [
      {
        id: 'financement',
        icon: Coins,
        title: 'Recherche de Financement',
        subtitle: 'Trouvez les fonds pour vos projets',
        description: 'Identification et accompagnement dans l\'obtention des financements adaptés à vos projets. Nous cartographions les sources de financement disponibles — bailleurs, fonds publics, investisseurs privés — et montons des dossiers solides qui maximisent vos chances de succès.',
        howItWorks: 'Analyse du besoin → identification des sources éligibles → montage du dossier → relationnement bailleurs → suivi et reporting. Nous restons à vos côtés jusqu\'au décaissement et au reporting de fin de projet.',
        features: [
          'Identification des sources de financement',
          'Montage des dossiers de demande',
          'Recherche de subventions et aides publiques',
          'Accompagnement auprès des bailleurs de fonds',
          'Suivi et reporting des financements',
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
        description: 'Solutions de préfinancement pour démarrer vos projets avant l\'obtention des fonds définitifs. Nous structurons des dispositifs de préfinancement qui sécurisent vos fournisseurs et partenaires tout en préservant votre trésorerie.',
        howItWorks: 'Analyse de faisabilité financière → structuration du préfinancement → mise en relation avec partenaires financiers → garanties et sécurisation → suivi de trésorerie projet.',
        features: [
          'Analyse de faisabilité financière',
          'Structuration du préfinancement',
          'Mise en relation avec partenaires financiers',
          'Garanties et sécurisation',
          'Suivi de trésorerie projet',
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
        description: 'Conception et structuration de projets impliquant plusieurs secteurs d\'activité. Nous orchestrons des projets complexes en mobilisant les bonnes compétences, en structurant les partenariats et en pilotant la gouvernance de bout en bout.',
        howItWorks: 'Étude de faisabilité multi-sectorielle → montage de partenariats → business plan & modèle économique → coordination des parties prenantes → pilotage et gouvernance projet.',
        features: [
          'Étude de faisabilité multi-sectorielle',
          'Montage de partenariats stratégiques',
          'Coordination des parties prenantes',
          'Business plan et modèle économique',
          'Pilotage et gouvernance projet',
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
        description: 'Accompagnement stratégique pour définir et atteindre vos objectifs de développement. Nous vous aidons à clarifier votre vision, à formuler une stratégie réaliste et à aligner votre organisation autour de priorités partagées.',
        howItWorks: 'Diagnostic stratégique → vision & objectifs → plan stratégique → alignement organisationnel → tableaux de bord et indicateurs de pilotage.',
        features: [
          'Diagnostic stratégique approfondi',
          'Définition de la vision et des objectifs',
          'Élaboration du plan stratégique',
          'Alignement organisationnel',
          'Tableaux de bord et indicateurs',
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
        description: 'Conseil en organisation pour améliorer l\'efficacité et la performance de votre structure. Nous diagnostiquons vos processus, identifions les goulots d\'étranglement et accompagnons la mise en place d\'une organisation plus agile et performante.',
        howItWorks: 'Audit organisationnel → optimisation des processus → structuration des équipes → systèmes de management → formation des managers.',
        features: [
          'Audit organisationnel',
          'Optimisation des processus',
          'Structuration des équipes',
          'Mise en place de systèmes de management',
          'Formation des managers',
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
        description: 'Expertise pointue dans des domaines spécifiques pour répondre à vos enjeux techniques. Nous mobilisons des experts métiers pour des missions ciblées : études sectorielles, benchmarks, recommandations techniques et transfert de compétences.',
        howItWorks: 'Cadrage du besoin d\'expertise → mobilisation de l\'expert métier → études et analyses → recommandations opérationnelles → transfert de compétences vers vos équipes.',
        features: [
          'Études et analyses sectorielles',
          'Expertise technique spécialisée',
          'Benchmarks et meilleures pratiques',
          'Recommandations opérationnelles',
          'Transfert de compétences',
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
        description: 'Accompagnement des processus de transformation pour garantir l\'adhésion et le succès. Nous concevons des stratégies de conduite du changement qui préparent, engagent et outillent vos équipes pour adopter durablement de nouvelles façons de travailler.',
        howItWorks: 'Diagnostic de maturité → stratégie de conduite du changement → communication interne → formation & montée en compétences → suivi de l\'adoption.',
        features: [
          'Diagnostic de maturité au changement',
          'Stratégie de conduite du changement',
          'Communication interne',
          'Formation et montée en compétences',
          'Suivi de l\'adoption',
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
        description: 'Accompagnement pour développer vos activités et partenariats à l\'échelle internationale. Nous facilitons l\'accès à de nouveaux marchés, la mise en relation avec des partenaires étrangers et la structuration d\'alliances durables.',
        howItWorks: 'Étude des marchés cibles → mise en relation partenaires → accompagnement aux négociations → structuration des partenariats → représentation et lobbying.',
        features: [
          'Étude des marchés internationaux',
          'Mise en relation avec partenaires étrangers',
          'Accompagnement aux négociations',
          'Structuration de partenariats internationaux',
          'Représentation et lobbying',
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
  }
];

const platforms = [
  {
    id: 'sombateka',
    icon: ShoppingCart,
    title: 'SombaTeka',
    tagline: 'Plateforme de Vente en Ligne',
    subtitle: 'Le marché digital pour tous en RDC',
    description: 'SombaTeka est une plateforme e-commerce dédiée à la vente en ligne accessible à tous — particuliers, commerçants, PME et grandes entreprises. Elle facilite les échanges commerciaux en RD Congo et à l\'international avec des outils simples et sécurisés, du paiement mobile à la livraison intégrée.',
    howItWorks: 'Un vendeur crée sa boutique en ligne en quelques minutes, ajoute ses produits, configure ses modes de paiement (Mobile Money, carte bancaire) et ses options de livraison. Les acheteurs parcourent le catalogue, commandent et suivent leur livraison en temps réel. La plateforme gère les transactions, les stocks et fournit un tableau de bord analytics complet aux marchands.',
    techStack: [
      { name: 'React', icon: Code2, role: 'Front-end (interface marchand & acheteur)' },
      { name: 'Node.js / Express', icon: Server, role: 'API back-end & logique métier' },
      { name: 'MongoDB', icon: Database, role: 'Base de données produits, commandes, utilisateurs' },
      { name: 'Mobile Money API', icon: CreditCard, role: 'Intégration paiements (M-Pesa, Airtel Money, Orange Money)' },
      { name: 'React Native', icon: Smartphone, role: 'Applications mobiles iOS & Android' },
    ],
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
    url: 'https://www.sombateka.com',
    status: 'live',
  },
  {
    id: 'harchive',
    icon: Archive,
    title: 'HARCHIVE',
    tagline: 'Archivage Académique Numérique',
    subtitle: 'Connecter tous les corps académiques de la RDC',
    description: 'HARCHIVE est une plateforme d\'archivage numérique dédiée au monde académique de la RD Congo. Elle centralise et sécurise les données des étudiants, enseignants et institutions, tout en créant un réseau national reliant tous les corps académiques du pays, de l\'université à l\'école professionnelle.',
    howItWorks: 'Chaque institution membre dispose d\'un espace sécurisé pour archiver les dossiers académiques, diplômes et attestations de ses étudiants. Les données sont vérifiables en ligne, ce qui garantit l\'authenticité des diplômes. Le réseau national permet aux institutions d\'échanger des ressources pédagogiques et de suivre le parcours académique des étudiants de la licence au doctorat.',
    techStack: [
      { name: 'React', icon: Code2, role: 'Interface institution & étudiants' },
      { name: 'Node.js / NestJS', icon: Server, role: 'API sécurisée & gestion des rôles' },
      { name: 'PostgreSQL', icon: Database, role: 'Stockage relationnel des dossiers académiques' },
      { name: 'IPFS / Stockage décentralisé', icon: Layers, role: 'Archivage immuable des diplômes' },
      { name: 'QR Code / Vérification', icon: Shield, role: 'Authentification des diplômes en ligne' },
    ],
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
    url: 'https://harchive.net',
    status: 'live',
  },
  {
    id: 'app243',
    icon: Briefcase,
    title: 'App243',
    tagline: 'Plateforme RH Tout-en-Un',
    subtitle: 'Gérez vos ressources humaines simplement',
    description: 'App243 est une plateforme de gestion des ressources humaines pensée pour l\'Afrique. Elle centralise la gestion des employés, fiches de paie, congés, pointage et recrutement dans une interface moderne et intuitive, afin de simplifier l\'administration RH des entreprises de toutes tailles.',
    howItWorks: 'L\'entreprise configure son organigramme et importe ses employés. Chaque collaborateur dispose d\'un espace personnel pour pointer, poser ses congés et consulter ses bulletins de paie. Les RH pilotent l\'ensemble depuis un tableau de bord en temps réel : salaires, contrats, attestations, notes de frais et recrutement, le tout dans un environnement sécurisé.',
    techStack: [
      { name: 'React', icon: Code2, role: 'Interface RH & espace employé' },
      { name: 'Node.js / Express', icon: Server, role: 'API back-end & calculs de paie' },
      { name: 'PostgreSQL', icon: Database, role: 'Données RH structurées & historisées' },
      { name: 'JWT / RBAC', icon: Shield, role: 'Authentification & contrôle d\'accès par rôle' },
      { name: 'React Native', icon: Smartphone, role: 'Application mobile pointage & congés' },
    ],
    features: [
      'Annuaire des employés et organigramme interactif',
      'Suivi des heures, pointage et calcul automatique des salaires',
      'Bulletins de paie, contrats et attestations centralisés',
      'Gestion des congés, notes de frais et recrutement',
      'Tableau de bord RH en temps réel',
      'Documents RH sécurisés et accessibles',
    ],
    benefits: [
      { icon: Briefcase, text: 'RH simplifiées' },
      { icon: Users, text: 'Employés gérés' },
      { icon: Shield, text: 'Données sécurisées' },
    ],
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    url: 'https://app243.com',
    status: 'live',
  },
  {
    id: 'parckbox',
    icon: Printer,
    title: 'PARCK BOX',
    tagline: 'Imprimerie & Coworking',
    subtitle: 'Imprimez. Réservez. Travaillez.',
    description: 'PARCK BOX est une plateforme tout-en-un qui réunit une imprimerie en ligne et la location d\'espaces de travail. Commandez vos impressions avec devis instantané, ou réservez un bureau équipé en quelques clics, avec paiement sécurisé et suivi dans votre espace personnel.',
    howItWorks: 'Pour l\'impression : l\'utilisateur configure son document (format, couleur, nombre d\'exemplaires, reliure) et obtient un devis instantané, puis commande et paie en ligne ; un service express 2h est disponible. Pour le coworking : l\'utilisateur choisit un bureau parmi 10 espaces équipés (individuel, réunion, événementiel), réserve à l\'heure avec remises dégressives et reçoit sa facture PDF. Tout est suivi depuis un espace personnel.',
    techStack: [
      { name: 'React', icon: Code2, role: 'Front-end commande & réservation' },
      { name: 'Node.js / Express', icon: Server, role: 'API back-end & génération de devis' },
      { name: 'PostgreSQL', icon: Database, role: 'Commandes, réservations, factures' },
      { name: 'Stripe / Mobile Money', icon: CreditCard, role: 'Paiements sécurisés en ligne' },
      { name: 'PDF Generator', icon: Package, role: 'Génération de devis et factures PDF' },
    ],
    features: [
      'Commande d\'impression en ligne avec devis instantané',
      'Impression Noir & Blanc ou couleur, A4/A3/A5, reliures incluses',
      'Service express 2h disponible',
      'Location de 10 bureaux équipés (individuels, réunions, événementiels)',
      'Réservation à l\'heure avec remises dégressives',
      'Paiement sécurisé et facture PDF',
    ],
    benefits: [
      { icon: Printer, text: 'Impression en ligne' },
      { icon: Building2, text: 'Bureaux à louer' },
      { icon: CreditCard, text: 'Paiement sécurisé' },
    ],
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    url: 'https://parckbox.com',
    status: 'live',
  },
  {
    id: 'orbitalinvest',
    icon: Coins,
    title: 'OrbitalInvest',
    tagline: 'Plateforme d\'Investissement',
    subtitle: 'Investissez simplement et intelligemment',
    description: 'OrbitalInvest est une plateforme d\'investissement conçue pour rendre la gestion financière accessible à tous. Elle offre des outils d\'analyse, un suivi de portefeuille et des opportunités d\'investissement adaptées aux objectifs de chaque investisseur, particuliers comme entreprises.',
    howItWorks: 'L\'utilisateur crée son profil investisseur et définit ses objectifs. La plateforme propose des opportunités d\'investissement diversifiées, fournit des outils d\'analyse et un tableau de bord de suivi de portefeuille en temps réel. Des conseils personnalisés accompagnent chaque décision, dans un environnement sécurisé et conforme aux réglementations financières.',
    techStack: [
      { name: 'React', icon: Code2, role: 'Interface investisseur & tableau de bord' },
      { name: 'Python / FastAPI', icon: Server, role: 'API back-end & moteur d\'analyse' },
      { name: 'PostgreSQL', icon: Database, role: 'Données financières & portefeuilles' },
      { name: 'Machine Learning', icon: Cpu, role: 'Outils d\'aide à la décision & recommandations' },
      { name: 'Chiffrement AES-256', icon: Shield, role: 'Sécurité & conformité des transactions' },
    ],
    features: [
      'Gestion et suivi de portefeuille en temps réel',
      'Outils d\'analyse et d\'aide à la décision',
      'Opportunités d\'investissement diversifiées',
      'Tableau de bord financier personnalisé',
      'Sécurité et conformité des transactions',
      'Accompagnement et conseils en investissement',
    ],
    benefits: [
      { icon: Coins, text: 'Investissements simplifiés' },
      { icon: TrendingUp, text: 'Portefeuille suivi' },
      { icon: Shield, text: 'Sécurité garantie' },
    ],
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-50',
    url: null,
    status: 'construction',
  },
];

const processSteps = [
  { number: '01', title: 'Écoute', description: 'Compréhension approfondie de vos enjeux et objectifs' },
  { number: '02', title: 'Stratégie', description: 'Élaboration de solutions tactiques pertinentes' },
  { number: '03', title: 'Création', description: 'Conception et production des dispositifs' },
  { number: '04', title: 'Déploiement', description: 'Mise en œuvre et optimisation continue' },
];

export default function Presentation() {
  const [activeCategory, setActiveCategory] = useState('communication');
  const [activeService, setActiveService] = useState('strategie');
  const [activePlatform, setActivePlatform] = useState('sombateka');

  const currentCategory = serviceCategories.find(c => c.id === activeCategory);
  const currentService = currentCategory?.services.find(s => s.id === activeService);
  const currentPlatform = platforms.find(p => p.id === activePlatform);

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0B] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#C9A86C]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#C9A86C]" />
            <span className="text-sm text-white">Présentation de l'entreprise</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            PRECISIONS Group
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-10"
          >
            Cabinet de conseil en communication digitale et développement économique,
            éditeur de plateformes numériques propriétaires au service de la RD Congo et de l'Afrique.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {companyStats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[#C9A86C]">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A86C]/10 mb-6">
                <Building2 className="w-4 h-4 text-[#C9A86C]" />
                <span className="text-sm font-medium text-[#C9A86C]">À propos</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-6">
                Un cabinet, deux métiers, cinq plateformes
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                PRECISIONS Group accompagne les entreprises, institutions et entrepreneurs dans leur
                communication digitale et leur développement économique. Notre approche conjugue
                conseil stratégique, exécution opérationnelle et produits numériques propriétaires.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Au-delà du conseil, nous concevons et opérons nos propres plateformes —
                SombaTeka, HARCHIVE, App243, PARCK BOX et OrbitalInvest — qui adressent des besoins
                concrets du marché africain : commerce, éducation, RH, services et finance.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Conseil', 'Exécution', 'Produits numériques', 'Sur mesure'].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {serviceCategories.map((cat) => (
                <div key={cat.id} className={`p-6 rounded-2xl bg-gradient-to-br ${cat.color} text-white`}>
                  <cat.icon className="w-8 h-8 mb-3" />
                  <div className="text-2xl font-bold">{cat.services.length}</div>
                  <div className="text-sm opacity-90">{cat.title}</div>
                </div>
              ))}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500 to-teal-500 text-white">
                <Database className="w-8 h-8 mb-3" />
                <div className="text-2xl font-bold">{platforms.length}</div>
                <div className="text-sm opacity-90">Plateformes</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A86C]/10 mb-4">
              <Briefcase className="w-4 h-4 text-[#C9A86C]" />
              <span className="text-sm font-medium text-[#C9A86C]">Nos services</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-4">
              Expertises & prestations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deux domaines d'expertise, vingt services spécialisés pour accompagner votre croissance de bout en bout.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
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
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
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

          {/* Category Description */}
          <div className="text-center mb-10 max-w-3xl mx-auto">
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
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <service.icon className="w-4 h-4" />
                <span className="hidden md:inline">{service.title.split(' ').slice(0, 3).join(' ')}</span>
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
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#0A0A0B] mb-3">
                    {currentService.title}
                  </h3>
                  <p className="text-lg text-[#C9A86C] font-medium mb-4">
                    {currentService.subtitle}
                  </p>
                  <p className="text-base text-gray-600 mb-6">
                    {currentService.description}
                  </p>

                  <div className="p-5 rounded-2xl bg-white border border-gray-200 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-[#C9A86C]" />
                      <h4 className="font-semibold text-[#0A0A0B]">Comment ça fonctionne</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{currentService.howItWorks}</p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {currentService.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentService.color} flex items-center justify-center`}>
                          <benefit.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`${currentService.bgColor} rounded-3xl p-8 lg:p-10`}>
                  <h4 className="text-xl font-semibold text-[#0A0A0B] mb-6">
                    Ce que nous proposons
                  </h4>
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

      {/* Platforms */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A86C]/10 mb-4">
              <Database className="w-4 h-4 text-[#C9A86C]" />
              <span className="text-sm font-medium text-[#C9A86C]">Plateformes propriétaires</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-4">
              Nos produits numériques
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cinq plateformes éditées par PRECISIONS Group, conçues pour répondre aux besoins concrets du marché africain.
            </p>
          </div>

          {/* Platform selector cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePlatform(p.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-300 ${
                  activePlatform === p.id
                    ? `bg-gradient-to-br ${p.color} text-white shadow-lg`
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <p.icon className="w-8 h-8 mb-3" />
                <div className="font-bold">{p.title}</div>
                <div className={`text-xs mt-1 ${activePlatform === p.id ? 'opacity-90' : 'text-gray-500'}`}>
                  {p.tagline}
                </div>
              </button>
            ))}
          </div>

          {/* Active platform detail */}
          {currentPlatform && (
            <motion.div
              key={currentPlatform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left - description & how it works */}
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${currentPlatform.color} flex items-center justify-center`}>
                      <currentPlatform.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-[#0A0A0B]">{currentPlatform.title}</h3>
                      <p className="text-[#C9A86C] font-medium">{currentPlatform.tagline}</p>
                    </div>
                  </div>

                  <p className="text-base text-gray-600 mb-5">{currentPlatform.description}</p>

                  <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-[#C9A86C]" />
                      <h4 className="font-semibold text-[#0A0A0B]">Comment ça fonctionne</h4>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{currentPlatform.howItWorks}</p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4 mb-8">
                    {currentPlatform.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${currentPlatform.color} flex items-center justify-center`}>
                          <benefit.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                      </div>
                    ))}
                  </div>

                  {currentPlatform.status === 'live' ? (
                    <a href={currentPlatform.url} target="_blank" rel="noopener noreferrer">
                      <Button className="rounded-full px-8 bg-[#0A0A0B] hover:bg-[#0A0A0B]/90">
                        Visiter {currentPlatform.title}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </a>
                  ) : (
                    <Button disabled className="rounded-full px-8 bg-gray-400 text-white cursor-not-allowed opacity-70">
                      Site en construction
                    </Button>
                  )}
                </div>

                {/* Right - features + tech stack */}
                <div>
                  <div className={`${currentPlatform.bgColor} rounded-3xl p-8 lg:p-10 mb-6`}>
                    <h4 className="text-xl font-semibold text-[#0A0A0B] mb-6">
                      Fonctionnalités clés
                    </h4>
                    <ul className="space-y-4">
                      {currentPlatform.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className={`w-5 h-5 mt-0.5 bg-gradient-to-br ${currentPlatform.color} text-white rounded-full`} />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-8 rounded-3xl bg-[#0A0A0B]">
                    <div className="flex items-center gap-2 mb-6">
                      <Code2 className="w-5 h-5 text-[#C9A86C]" />
                      <h4 className="text-xl font-semibold text-white">Stack technique</h4>
                    </div>
                    <div className="space-y-3">
                      {currentPlatform.techStack.map((tech, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                          <tech.icon className="w-5 h-5 text-[#C9A86C] mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-sm font-semibold text-white">{tech.name}</div>
                            <div className="text-xs text-gray-400">{tech.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
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
                  <div className="text-5xl font-bold text-[#C9A86C]/30 mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold text-[#0A0A0B] mb-2">{step.title}</h3>
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
            Travaillons ensemble
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 mb-8"
          >
            Contactez-nous pour une consultation gratuite et découvrez comment nos services
            et nos plateformes peuvent accélérer votre développement.
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
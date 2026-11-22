import PageHero from '@/components/brand/PageHero';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Lightbulb, TrendingUp, Target, Zap, Shield, Clock,
  Users, BarChart3, Globe, Megaphone, Monitor, Network,
  MessageSquare, Search, HeadphonesIcon, Coins, Briefcase,
  Building2, Handshake, Settings, RefreshCw, ShoppingCart, Archive, GraduationCap, Package, CreditCard, BookOpen, Database, Link2, Printer, Wallet
} from 'lucide-react';

const serviceCategories = [
  {
    id: 'communication',
    title: 'Communication Digitale',
    description: 'Élaborer et orchestrer des réponses tactiques à vos problématiques de communication',
    icon: Globe,
    color: 'from-comm to-comm-700',
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
        color: 'from-comm to-comm-700',
        bgColor: 'bg-comm-50',
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
        color: 'from-comm to-comm-700',
        bgColor: 'bg-comm-50',
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
        color: 'from-comm to-comm-700',
        bgColor: 'bg-comm-50',
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
        color: 'from-comm to-comm-700',
        bgColor: 'bg-comm-50',
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
        color: 'from-digital to-digital-700',
        bgColor: 'bg-digital-50',
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
        color: 'from-digital to-digital-700',
        bgColor: 'bg-digital-50',
      },
    ]
  },
  {
    id: 'economique',
    title: 'Développement Économique',
    description: 'Accompagner vos projets de développement et croissance économique',
    icon: Briefcase,
    color: 'from-fin to-fin-700',
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
        color: 'from-fin to-fin-700',
        bgColor: 'bg-fin-50',
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
        color: 'from-fin to-fin-700',
        bgColor: 'bg-fin-50',
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
        color: 'from-fin to-fin-700',
        bgColor: 'bg-fin-50',
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
        color: 'from-advice to-advice-700',
        bgColor: 'bg-advice-50',
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
        color: 'from-advice to-advice-700',
        bgColor: 'bg-advice-50',
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
        color: 'from-advice to-advice-700',
        bgColor: 'bg-advice-50',
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
        color: 'from-training-700 to-training-700',
        bgColor: 'bg-training-50',
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
        color: 'from-advice to-advice-700',
        bgColor: 'bg-advice-50',
      },
    ]
  },
  {
    id: 'plateformes',
    title: 'Plateformes Digitales',
    description: 'Nos plateformes propriétaires au service du numérique en RD Congo',
    icon: Database,
    color: 'from-digital to-digital-700',
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
        color: 'from-digital to-digital-700',
        bgColor: 'bg-digital-50',
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
        color: 'from-digital to-digital-700',
        bgColor: 'bg-digital-50',
      },
      {
        id: 'app243',
        icon: Briefcase,
        title: 'App243 — Plateforme RH Tout-en-Un',
        subtitle: 'Gérez vos ressources humaines simplement',
        description: 'App243 est une plateforme de gestion des ressources humaines pensée pour l\'Afrique. Elle centralise la gestion des employés, fiches de paie, congés, pointage et recrutement dans une interface moderne et intuitive, afin de simplifier l\'administration RH des entreprises.',
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
        color: 'from-digital to-digital-700',
        bgColor: 'bg-digital-50',
      },
      {
        id: 'parckbox',
        icon: Printer,
        title: 'PARCK BOX — Imprimerie & Coworking',
        subtitle: 'Imprimez. Réservez. Travaillez.',
        description: 'PARCK BOX est une plateforme tout-en-un qui réunit une imprimerie en ligne et la location d\'espaces de travail. Commandez vos impressions avec devis instantané, ou réservez un bureau équipé en quelques clics, avec paiement sécurisé et suivi dans votre espace.',
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
        color: 'from-digital to-digital-700',
        bgColor: 'bg-digital-50',
      },
      {
        id: 'pay243',
        icon: Wallet,
        title: 'Pay243 — Portefeuille Électronique',
        subtitle: 'Payez vos achats en ligne simplement',
        description: 'Pay243 est un portefeuille électronique conçu pour faciliter les achats en ligne : vous approvisionnez votre portefeuille, puis vous réglez vos achats sur internet en quelques gestes.',
        features: [
          'Portefeuille électronique personnel',
          'Paiement des achats en ligne',
          'Suivi de vos paiements',
        ],
        benefits: [
          { icon: Wallet, text: 'Portefeuille électronique' },
          { icon: ShoppingCart, text: 'Achats en ligne facilités' },
        ],
        color: 'from-digital to-digital-700',
        bgColor: 'bg-digital-50',
      },
      {
        id: 'orbitalinvest',
        icon: Coins,
        title: 'OrbitalInvest — Plateforme d\'Investissement',
        subtitle: 'Investissez simplement et intelligemment',
        description: 'OrbitalInvest est une plateforme d\'investissement conçue pour rendre la gestion financière accessible à tous. Elle offre des outils d\'analyse, un suivi de portefeuille et des opportunités d\'investissement adaptées aux objectifs de chaque investisseur, particuliers comme entreprises.',
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
        color: 'from-digital to-digital-700',
        bgColor: 'bg-digital-50',
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

// Les liens « #métier » de l'accueil et du pied de page ouvrent la bonne catégorie et le bon service
const HASH_TARGETS = {
  communication: ['communication', 'strategie'],
  financement: ['economique', 'financement'],
  digital: ['communication', 'web'],
  formation: ['economique', 'changement'],
  conseil: ['economique', 'strategique'],
  plateformes: ['plateformes', 'sombateka'],
};

const PLATFORM_LINKS = {
  sombateka: 'https://www.sombateka.com',
  harchive: 'https://harchive.net',
  app243: 'https://app243.com',
  parckbox: 'https://parckbox.com',
  pay243: 'https://pay243.com',
};

export default function Services() {
  const { hash } = useLocation();
  const [activeCategory, setActiveCategory] = useState('communication');
  const [activeService, setActiveService] = useState('strategie');

  useEffect(() => {
    const target = HASH_TARGETS[hash.replace('#', '')];
    if (target) {
      setActiveCategory(target[0]);
      setActiveService(target[1]);
    }
  }, [hash]);

  const currentCategory = serviceCategories.find(c => c.id === activeCategory);
  const currentService = currentCategory?.services.find(s => s.id === activeService);
  const platformUrl = currentService && PLATFORM_LINKS[currentService.id];

  return (
    <main className="bg-black text-white">
      <PageHero
        title="Nos métiers"
        lede="Communication, financement, digital, formation et conseil : le détail de ce que nous prenons en charge, service par service."
      />

      <section>
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          {/* Catégories */}
          <div className="flex flex-wrap gap-2 py-8" role="tablist" aria-label="Catégories de services">
            {serviceCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setActiveService(category.services[0].id);
                }}
                className={`inline-flex items-center h-11 px-5 rounded-full border transition-colors ${
                  activeCategory === category.id ? 'bg-white text-black border-white' : 'border-white/15 bg-white/5 text-white/70 hover:text-white hover:border-white/30'
                }`}
              >
                {category.title}
                <span className="ml-2 text-sm opacity-55">{category.services.length}</span>
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-x-10 gap-y-10 pb-24">
            {/* Services de la catégorie */}
            <nav className="lg:col-span-4" aria-label={currentCategory?.title}>
              <p className="text-white/55">{currentCategory?.description}</p>
              <ul className="mt-6 rounded-2xl glass p-2">
                {currentCategory?.services.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => setActiveService(service.id)}
                      aria-current={activeService === service.id ? 'true' : undefined}
                      className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between gap-4 transition-colors ${
                        activeService === service.id ? 'bg-white/10 font-medium text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {service.title.split(' — ')[0]}
                      {activeService === service.id && <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_white] shrink-0" aria-hidden="true" />}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Service choisi */}
            {currentService && (
              <article key={currentService.id} className="lg:col-span-7 lg:col-start-6 rounded-3xl glass p-7 lg:p-10">
                <h2 className="text-title font-semibold text-gradient">{currentService.title}</h2>
                <p className="mt-4 text-lg font-medium">{currentService.subtitle}</p>
                <p className="mt-4 text-lede text-white/60 max-w-2xl">{currentService.description}</p>

                <h3 className="mt-10 text-sm text-white/45">Ce que nous proposons</h3>
                <ul className="mt-3 grid sm:grid-cols-2 gap-2">
                  {currentService.features.map((feature) => (
                    <li key={feature} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white/85">{feature}</li>
                  ))}
                </ul>


                <div className="mt-10">
                  {platformUrl ? (
                    <a href={platformUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center h-12 px-6 rounded-full bg-white text-black font-medium hover:bg-white/85">
                      Visiter {currentService.title.split(' — ')[0]}
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  ) : currentService.id === 'orbitalinvest' ? (
                    <p className="text-white/45">Site en construction</p>
                  ) : (
                    <Link to={createPageUrl('Contact')} className="inline-flex items-center h-12 px-6 rounded-full bg-white text-black font-medium hover:bg-white/85">
                      Discuter de votre projet
                    </Link>
                  )}
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* Méthode : une vraie séquence, d'où la numérotation */}
      <section className="border-t border-white/10 py-24">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <h2 className="text-display font-semibold text-gradient">Notre méthode</h2>
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step) => (
              <li key={step.number} className="rounded-2xl glass p-6">
                <span className="text-sm text-white/45 tabular">Étape {Number(step.number)}</span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-2 text-white/60">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}

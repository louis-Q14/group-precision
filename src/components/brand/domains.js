import { Megaphone, TrendingUp, MonitorSmartphone, GraduationCap, Compass } from 'lucide-react';

/**
 * Les cinq métiers de PRECISIONS Group : source unique pour l'accueil, les services,
 * les filtres et les en-têtes. Chaque métier a sa couleur (tailwind.config.js) et son pictogramme.
 *
 * Les classes sont écrites en entier (pas de concaténation) pour que Tailwind les détecte.
 */
export const DOMAINS = [
  {
    id: 'communication',
    icon: Megaphone,
    hex: '#E2553E',
    classes: { solid: 'bg-comm', soft: 'bg-comm-50', text: 'text-comm-700', border: 'border-t-comm', fill: 'fill-comm' },
    FR: {
      name: 'Communication',
      pitch: 'Faire connaître ce que vous faites',
      text: 'Stratégie de marque, campagnes média et présence en ligne, du message jusqu’à sa diffusion.',
      services: ['Stratégie marketing et communication', 'Publicité média', 'Communication digitale et publishing', 'Animation de réseau'],
    },
    EN: {
      name: 'Communication',
      pitch: 'Make what you do known',
      text: 'Brand strategy, media campaigns and online presence, from the message to its distribution.',
      services: ['Marketing and communication strategy', 'Media advertising', 'Digital communication and publishing', 'Network engagement'],
    },
  },
  {
    id: 'financement',
    icon: TrendingUp,
    hex: '#1E8A5F',
    classes: { solid: 'bg-fin', soft: 'bg-fin-50', text: 'text-fin-700', border: 'border-t-fin', fill: 'fill-fin' },
    FR: {
      name: 'Financement',
      pitch: 'Financer ce que vous lancez',
      text: 'Recherche de fonds, préfinancement et montage de projets multisectoriels.',
      services: ['Recherche de financement', 'Préfinancement de projets', 'Création de projets multisectoriels'],
    },
    EN: {
      name: 'Financing',
      pitch: 'Finance what you launch',
      text: 'Fundraising, pre-financing and structuring of multi-sector projects.',
      services: ['Funding search', 'Project pre-financing', 'Multi-sector project design'],
    },
  },
  {
    id: 'digital',
    icon: MonitorSmartphone,
    hex: '#2F6BFF',
    classes: { solid: 'bg-digital', soft: 'bg-digital-50', text: 'text-digital-700', border: 'border-t-digital', fill: 'fill-digital' },
    FR: {
      name: 'Digital et numérique',
      pitch: 'Outiller votre quotidien',
      text: 'Sites et applications sur mesure, assistance aux utilisateurs et nos cinq plateformes.',
      services: ['Développement web', 'Assistance aux utilisateurs', 'Plateformes SombaTeka, HARCHIVE, App243, PARCK BOX, OrbitalInvest'],
    },
    EN: {
      name: 'Digital',
      pitch: 'Equip your daily work',
      text: 'Custom websites and apps, user support and our five platforms.',
      services: ['Web development', 'User support', 'SombaTeka, HARCHIVE, App243, PARCK BOX and OrbitalInvest platforms'],
    },
  },
  {
    id: 'formation',
    icon: GraduationCap,
    hex: '#F2B233',
    classes: { solid: 'bg-training', soft: 'bg-training-50', text: 'text-training-700', border: 'border-t-training', fill: 'fill-training' },
    FR: {
      name: 'Formation',
      pitch: 'Faire monter vos équipes en compétences',
      text: 'Formation des équipes et accompagnement du changement, pour que les nouveaux outils et méthodes soient adoptés.',
      services: ['Formation des équipes', 'Accompagnement du changement', 'Adoption des outils numériques'],
    },
    EN: {
      name: 'Training',
      pitch: 'Build your teams’ skills',
      text: 'Team training and change management, so new tools and methods are actually adopted.',
      services: ['Team training', 'Change management', 'Digital tool adoption'],
    },
  },
  {
    id: 'conseil',
    icon: Compass,
    hex: '#7A5AF8',
    classes: { solid: 'bg-advice', soft: 'bg-advice-50', text: 'text-advice-700', border: 'border-t-advice', fill: 'fill-advice' },
    FR: {
      name: 'Conseil',
      pitch: 'Décider avec une vision claire',
      text: 'Stratégie, organisation, expertise métier et relations internationales.',
      services: ['Consultation stratégique', 'Organisation et management', 'Consultation spécialisée', 'Relations internationales'],
    },
    EN: {
      name: 'Consulting',
      pitch: 'Decide with a clear vision',
      text: 'Strategy, organisation, specialist expertise and international relations.',
      services: ['Strategic consulting', 'Organisation and management', 'Specialist consulting', 'International relations'],
    },
  },
];

export const getDomain = (id) => DOMAINS.find((d) => d.id === id);
export const domainCopy = (domain, language) => domain[language] ?? domain.FR;

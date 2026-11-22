// Edge Function Supabase : génère la présentation PRECISIONS Group au format Word (.docx).
// Réservée aux administrateurs (table public.admins). Le fichier est renvoyé directement
// en téléchargement : rien n'est stocké publiquement.
//
// Appel depuis le site (admin connecté) :
//   const { data } = await supabase.functions.invoke('generate-presentation-doc'); // data : Blob
import { createClient } from 'npm:@supabase/supabase-js@2';
import {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  PageBreak, LevelFormat, convertInchesToTwip
} from 'npm:docx@8.5.0';

const GOLD = 'C9A86C';
const DARK = '0A0A0B';
const MUTED = '6B7280';

// Helpers
const h1 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_1,
  spacing: { before: 360, after: 160 },
  children: [new TextRun({ text, bold: true, size: 32, color: DARK })],
});

const h2 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_2,
  spacing: { before: 280, after: 120 },
  children: [new TextRun({ text, bold: true, size: 26, color: DARK })],
});

const h3 = (text) => new Paragraph({
  heading: HeadingLevel.HEADING_3,
  spacing: { before: 220, after: 100 },
  children: [new TextRun({ text, bold: true, size: 22, color: GOLD })],
});

const body = (text, opts = {}) => new Paragraph({
  spacing: { after: 120, line: 300 },
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({ text, size: 22, color: '1A1A2E', ...opts })],
});

const bullet = (text) => new Paragraph({
  spacing: { after: 60, line: 280 },
  bullet: { level: 0 },
  children: [new TextRun({ text, size: 22, color: '1A1A2E' })],
});

const label = (text) => new Paragraph({
  spacing: { before: 120, after: 60 },
  children: [new TextRun({ text, bold: true, size: 22, color: GOLD })],
});

const spacer = () => new Paragraph({ spacing: { after: 120 }, children: [] });

const divider = () => new Paragraph({
  border: { bottom: { color: 'E8E0D4', space: 1, style: BorderStyle.SINGLE, size: 6 } },
  spacing: { after: 200 },
  children: [],
});

const services = [
  {
    cat: 'Communication Digitale',
    desc: 'Élaborer et orchestrer des réponses tactiques à vos problématiques de communication grand public ou B2B, en alignant identité de marque, médias et digital pour un impact mesurable.',
    items: [
      { t: 'Conseil en Stratégie Marketing & Communication', s: 'Élaborez une stratégie gagnante', d: "Nous élaborons et orchestrons des réponses tactiques et pertinentes à vos problématiques de communication grand public ou B2B. Notre démarche part d'un audit complet de votre écosystème pour définir un positionnement différenciant, des messages clés et un plan d'action cohérent sur l'ensemble de vos points de contact.", f: "Audit et diagnostic de votre communication actuelle; Définition de votre positionnement et messages clés; Élaboration de plans de communication intégrés; Stratégie de marque et identité visuelle; Conseil en relations publiques et média.", how: "Audit & diagnostic, positionnement & messages clés, plan de communication intégré, déploiement coordonné, mesure et optimisation continue. Nous travaillons en atelier avec vos équipes et livrons des livrables structurés." },
      { t: 'Publicité Média', s: 'Maximisez votre visibilité', d: "Conception et déploiement de campagnes publicitaires percutantes sur tous les canaux média. De la créativité au media planning, nous orchestrons des dispositifs qui touchent la bonne audience, au bon moment, avec le bon message.", f: "Conception créative de campagnes publicitaires; Achat d'espaces média optimisé; Campagnes TV, radio et presse; Affichage et communication extérieure; Mesure et optimisation des performances.", how: "Brief créatif, conception et production des visuels, media planning et achat d'espaces optimisé, diffusion multi-canal, tracking et optimisation des performances en temps réel." },
      { t: 'Communication Digitale & Publishing', s: 'Rayonnez sur le digital', d: "Stratégies digitales complètes pour renforcer votre présence en ligne. Nous construisons votre écosystème digital : social media, contenu, référencement, acquisition payante et automation.", f: "Stratégie social media et community management; Content marketing et création de contenus; SEO et référencement naturel; Campagnes SEA (Google Ads, Meta Ads); Email marketing et automation.", how: "Stratégie digitale, production de contenus, community management, acquisition (SEO/SEA), nurturing et automation. Chaque levier est piloté par la donnée avec des cycles d'optimisation continus." },
      { t: 'Animation de Réseau', s: 'Fédérez vos partenaires', d: "Animation et dynamisation de vos réseaux de distribution et partenaires. Nous concevons des programmes d'animation qui créent de l'engagement et stimulent la performance commerciale.", f: "Conception de programmes d'animation; Outils de communication réseau; Événements et conventions; Incentives et challenges commerciaux; Formations et accompagnement terrain.", how: "Diagnostic du réseau, conception du programme d'animation, outils de communication dédiés, événements et incentives, formation et accompagnement terrain." },
      { t: 'Développement Web', s: 'Créez votre vitrine digitale', d: "Conception et développement de sites web et applications sur mesure. Nous concevons des expériences web performantes, accessibles et sécurisées, du site institutionnel à la marketplace complexe.", f: "Sites vitrines et institutionnels; Sites e-commerce et marketplaces; Applications web sur mesure; Maintenance et évolutions; Hébergement et sécurité.", how: "Cadrage & UX/UI, développement front-end et back-end, intégrations tierces, tests & QA, mise en production, maintenance et évolutions." },
      { t: 'Assistance aux Utilisateurs', s: 'Accompagnez vos clients', d: "Services d'assistance et de support pour vos utilisateurs. Nous mettons en place des dispositifs de support réactifs et humains qui améliorent la satisfaction et l'autonomie de vos utilisateurs.", f: "Mise en place de hotlines dédiées; Helpdesk et support technique; Formation des utilisateurs; Création de documentation et guides; Suivi de la satisfaction client.", how: "Analyse des besoins support, mise en place de la hotline/helpdesk, création de la documentation, formation des utilisateurs, suivi de la satisfaction." },
    ]
  },
  {
    cat: 'Développement Économique',
    desc: "Accompagner vos projets de développement et de croissance économique, du financement à la structuration, en passant par le pilotage stratégique et l'expansion internationale.",
    items: [
      { t: 'Recherche de Financement', s: 'Trouvez les fonds pour vos projets', d: "Identification et accompagnement dans l'obtention des financements adaptés à vos projets. Nous cartographions les sources de financement et montons des dossiers solides.", f: "Identification des sources de financement; Montage des dossiers de demande; Recherche de subventions et aides publiques; Accompagnement auprès des bailleurs de fonds; Suivi et reporting des financements.", how: "Analyse du besoin, identification des sources éligibles, montage du dossier, relationnement bailleurs, suivi et reporting jusqu'au décaissement." },
      { t: 'Préfinancement de Projets', s: 'Lancez vos projets rapidement', d: "Solutions de préfinancement pour démarrer vos projets avant l'obtention des fonds définitifs. Nous structurons des dispositifs qui sécurisent vos partenaires tout en préservant votre trésorerie.", f: "Analyse de faisabilité financière; Structuration du préfinancement; Mise en relation avec partenaires financiers; Garanties et sécurisation; Suivi de trésorerie projet.", how: "Analyse de faisabilité, structuration du préfinancement, mise en relation avec partenaires financiers, garanties et sécurisation, suivi de trésorerie projet." },
      { t: 'Création de Projets Multi-sectoriels', s: "Développez des projets d'envergure", d: "Conception et structuration de projets impliquant plusieurs secteurs d'activité. Nous orchestrons des projets complexes en mobilisant les bonnes compétences et en pilotant la gouvernance.", f: "Étude de faisabilité multi-sectorielle; Montage de partenariats stratégiques; Coordination des parties prenantes; Business plan et modèle économique; Pilotage et gouvernance projet.", how: "Étude de faisabilité, montage de partenariats, business plan & modèle économique, coordination des parties prenantes, pilotage et gouvernance projet." },
      { t: 'Consultation Stratégique', s: 'Définissez votre vision', d: "Accompagnement stratégique pour définir et atteindre vos objectifs de développement. Nous aidons à clarifier la vision, formuler une stratégie réaliste et aligner l'organisation.", f: "Diagnostic stratégique approfondi; Définition de la vision et des objectifs; Élaboration du plan stratégique; Alignement organisationnel; Tableaux de bord et indicateurs.", how: "Diagnostic stratégique, vision & objectifs, plan stratégique, alignement organisationnel, tableaux de bord et indicateurs de pilotage." },
      { t: 'Organisation & Management', s: 'Optimisez votre structure', d: "Conseil en organisation pour améliorer l'efficacité et la performance de votre structure. Nous diagnostiquons vos processus et accompagnons une organisation plus agile.", f: "Audit organisationnel; Optimisation des processus; Structuration des équipes; Mise en place de systèmes de management; Formation des managers.", how: "Audit organisationnel, optimisation des processus, structuration des équipes, systèmes de management, formation des managers." },
      { t: "Consultation Spécialisée / d'Expertise", s: 'Bénéficiez d\'experts métiers', d: "Expertise pointue dans des domaines spécifiques pour répondre à vos enjeux techniques. Nous mobilisons des experts métiers pour des missions ciblées.", f: "Études et analyses sectorielles; Expertise technique spécialisée; Benchmarks et meilleures pratiques; Recommandations opérationnelles; Transfert de compétences.", how: "Cadrage du besoin, mobilisation de l'expert métier, études et analyses, recommandations opérationnelles, transfert de compétences vers vos équipes." },
      { t: 'Accompagnement du Changement', s: 'Réussissez vos transformations', d: "Accompagnement des processus de transformation pour garantir l'adhésion et le succès. Nous concevons des stratégies de conduite du changement qui outillent vos équipes.", f: "Diagnostic de maturité au changement; Stratégie de conduite du changement; Communication interne; Formation et montée en compétences; Suivi de l'adoption.", how: "Diagnostic de maturité, stratégie de conduite du changement, communication interne, formation & montée en compétences, suivi de l'adoption." },
      { t: 'Relations Internationales', s: "Développez-vous à l'international", d: "Accompagnement pour développer vos activités et partenariats à l'échelle internationale. Nous facilitons l'accès à de nouveaux marchés et la structuration d'alliances durables.", f: "Étude des marchés internationaux; Mise en relation avec partenaires étrangers; Accompagnement aux négociations; Structuration de partenariats internationaux; Représentation et lobbying.", how: "Étude des marchés cibles, mise en relation partenaires, accompagnement aux négociations, structuration des partenariats, représentation et lobbying." },
    ]
  }
];

const platforms = [
  {
    name: 'SombaTeka',
    tagline: 'Plateforme de Vente en Ligne',
    subtitle: 'Le marché digital pour tous en RDC',
    desc: "SombaTeka est une plateforme e-commerce dédiée à la vente en ligne accessible à tous, particuliers, commerçants, PME et grandes entreprises. Elle facilite les échanges commerciaux en RD Congo et à l'international avec des outils simples et sécurisés, du paiement mobile à la livraison intégrée.",
    how: "Un vendeur crée sa boutique en ligne en quelques minutes, ajoute ses produits, configure ses modes de paiement (Mobile Money, carte bancaire) et ses options de livraison. Les acheteurs parcourent le catalogue, commandent et suivent leur livraison en temps réel. La plateforme gère les transactions, les stocks et fournit un tableau de bord analytics complet aux marchands.",
    features: ["Création de boutiques en ligne personnalisées", "Système de paiement mobile et bancaire sécurisé", "Gestion des commandes et des stocks", "Livraison intégrée avec suivi en temps réel", "Marketplace multi-vendeurs et multi-catégories", "Tableau de bord analytics pour les vendeurs", "Support client dédié pour les marchands"],
    status: 'Opérationnel',
    url: 'https://www.sombateka.com',
  },
  {
    name: 'HARCHIVE',
    tagline: 'Archivage Académique Numérique',
    subtitle: 'Connecter tous les corps académiques de la RDC',
    desc: "HARCHIVE est une plateforme d'archivage numérique dédiée au monde académique de la RD Congo. Elle centralise et sécurise les données des étudiants, enseignants et institutions, tout en créant un réseau national reliant tous les corps académiques du pays.",
    how: "Chaque institution membre dispose d'un espace sécurisé pour archiver les dossiers académiques, diplômes et attestations de ses étudiants. Les données sont vérifiables en ligne, ce qui garantit l'authenticité des diplômes. Le réseau national permet aux institutions d'échanger des ressources pédagogiques et de suivre le parcours académique des étudiants.",
    features: ["Archivage sécurisé des dossiers académiques des étudiants", "Gestion des diplômes et attestations numériques", "Réseau connectant universités, instituts et écoles de la RDC", "Vérification en ligne de l'authenticité des diplômes", "Suivi du parcours académique de la licence au doctorat", "Annuaire des enseignants et chercheurs nationaux", "Partage de ressources pédagogiques entre institutions"],
    status: 'Opérationnel',
    url: 'https://harchive.net',
  },
  {
    name: 'App243',
    tagline: 'Plateforme RH Tout-en-Un',
    subtitle: 'Gérez vos ressources humaines simplement',
    desc: "App243 est une plateforme de gestion des ressources humaines pensée pour l'Afrique. Elle centralise la gestion des employés, fiches de paie, congés, pointage et recrutement dans une interface moderne et intuitive, afin de simplifier l'administration RH des entreprises de toutes tailles.",
    how: "L'entreprise configure son organigramme et importe ses employés. Chaque collaborateur dispose d'un espace personnel pour pointer, poser ses congés et consulter ses bulletins de paie. Les RH pilotent l'ensemble depuis un tableau de bord en temps réel : salaires, contrats, attestations, notes de frais et recrutement.",
    features: ["Annuaire des employés et organigramme interactif", "Suivi des heures, pointage et calcul automatique des salaires", "Bulletins de paie, contrats et attestations centralisés", "Gestion des congés, notes de frais et recrutement", "Tableau de bord RH en temps réel", "Documents RH sécurisés et accessibles"],
    status: 'Opérationnel',
    url: 'https://app243.com',
  },
  {
    name: 'PARCK BOX',
    tagline: 'Imprimerie & Coworking',
    subtitle: 'Imprimez. Réservez. Travaillez.',
    desc: "PARCK BOX est une plateforme tout-en-un qui réunit une imprimerie en ligne et la location d'espaces de travail. Commandez vos impressions avec devis instantané, ou réservez un bureau équipé en quelques clics, avec paiement sécurisé et suivi dans votre espace personnel.",
    how: "Pour l'impression, l'utilisateur configure son document (format, couleur, nombre d'exemplaires, reliure) et obtient un devis instantané, puis commande et paie en ligne ; un service express 2h est disponible. Pour le coworking, l'utilisateur choisit un bureau parmi 10 espaces équipés, réserve à l'heure avec remises dégressives et reçoit sa facture PDF.",
    features: ["Commande d'impression en ligne avec devis instantané", "Impression Noir & Blanc ou couleur, A4/A3/A5, reliures incluses", "Service express 2h disponible", "Location de 10 bureaux équipés (individuels, réunions, événementiels)", "Réservation à l'heure avec remises dégressives", "Paiement sécurisé et facture PDF"],
    status: 'Opérationnel',
    url: 'https://parckbox.com',
  },
  {
    name: 'OrbitalInvest',
    tagline: "Plateforme d'Investissement",
    subtitle: 'Investissez simplement et intelligemment',
    desc: "OrbitalInvest est une plateforme d'investissement conçue pour rendre la gestion financière accessible à tous. Elle offre des outils d'analyse, un suivi de portefeuille et des opportunités d'investissement adaptées aux objectifs de chaque investisseur, particuliers comme entreprises.",
    how: "L'utilisateur crée son profil investisseur et définit ses objectifs. La plateforme propose des opportunités d'investissement diversifiées, fournit des outils d'analyse et un tableau de bord de suivi de portefeuille en temps réel. Des conseils personnalisés accompagnent chaque décision, dans un environnement sécurisé et conforme.",
    features: ["Gestion et suivi de portefeuille en temps réel", "Outils d'analyse et d'aide à la décision", "Opportunités d'investissement diversifiées", "Tableau de bord financier personnalisé", "Sécurité et conformité des transactions", "Accompagnement et conseils en investissement"],
    status: 'En construction',
    url: null,
  },
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGINS')?.split(',')[0]?.trim() || '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Expose-Headers': 'Content-Disposition',
};

const jsonError = (error: string, status: number) =>
  new Response(JSON.stringify({ error }), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
  });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS_HEADERS });

  try {
    // Client Supabase agissant avec les droits de l'utilisateur qui appelle
    const authorization = req.headers.get('Authorization') ?? '';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authorization } } },
    );

    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      return jsonError('Authentification requise', 401);
    }
    const { data: isAdmin, error: adminError } = await supabase.rpc('is_admin');
    if (adminError || !isAdmin) {
      return jsonError('Accès réservé aux administrateurs', 403);
    }

    const children = [];

    // ===== COVER =====
    children.push(new Paragraph({ spacing: { before: 2400 }, children: [] }));
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
      children: [new TextRun({ text: 'PRECISIONS GROUP', bold: true, size: 56, color: DARK })],
    }));
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 120 },
      children: [new TextRun({ text: 'Dossier de présentation', size: 32, color: GOLD })],
    }));
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 600 },
      children: [new TextRun({ text: 'Services & Plateformes propriétaires', size: 24, color: MUTED })],
    }));
    children.push(new Paragraph({
      alignment: AlignmentType.CENTER,
      border: { top: { color: GOLD, space: 1, style: BorderStyle.SINGLE, size: 12 } },
      spacing: { before: 200, after: 200 },
      children: [new TextRun({ text: 'Communication Digitale · Développement Économique · Plateformes Numériques', size: 20, color: MUTED })],
    }));
    children.push(new Paragraph({ children: [new PageBreak()] }));

    // ===== TABLE OF CONTENTS (manual) =====
    children.push(h1('Sommaire'));
    const toc = [
      '1. Présentation de l\'entreprise',
      '2. Nos domaines d\'expertise',
      '3. Communication Digitale',
      '4. Développement Économique',
      '5. Nos plateformes propriétaires',
      '6. SombaTeka',
      '7. HARCHIVE',
      '8. App243',
      '9. PARCK BOX',
      '10. OrbitalInvest',
      '11. Notre méthodologie',
      '12. Travaillons ensemble',
    ];
    toc.forEach((line) => children.push(new Paragraph({
      spacing: { after: 80 },
      children: [new TextRun({ text: line, size: 22, color: '1A1A2E' })],
    })));
    children.push(new Paragraph({ children: [new PageBreak()] }));

    // ===== 1. COMPANY =====
    children.push(h1('1. Présentation de l\'entreprise'));
    children.push(body("PRECISIONS Group est un cabinet de conseil en communication digitale et développement économique, éditeur de plateformes numériques propriétaires au service de la RD Congo et de l'Afrique. Notre approche conjugue conseil stratégique, exécution opérationnelle et produits numériques propriétaires."));
    children.push(body("Au-delà du conseil, nous concevons et opérons nos propres plateformes — SombaTeka, HARCHIVE, App243, PARCK BOX et OrbitalInvest — qui adressent des besoins concrets du marché africain : commerce, éducation, ressources humaines, services et finance."));
    children.push(label('Chiffres clés'));
    children.push(bullet('5 plateformes propriétaires'));
    children.push(bullet('2 domaines d\'expertise'));
    children.push(bullet('20+ services spécialisés'));
    children.push(bullet('100% sur mesure'));
    children.push(divider());

    // ===== 2. EXPERTISE =====
    children.push(h1('2. Nos domaines d\'expertise'));
    children.push(body("PRECISIONS Group structure son offre autour de deux domaines d'expertise complémentaires, couvrant l'ensemble du cycle de croissance de nos clients, de la communication à la structuration financière et à l'expansion internationale."));
    children.push(spacer());

    // ===== 3 & 4. SERVICES =====
    services.forEach((cat, idx) => {
      children.push(h1(`${idx + 3}. ${cat.cat}`));
      children.push(body(cat.desc));
      children.push(spacer());
      cat.items.forEach((svc) => {
        children.push(h3(svc.t));
        children.push(body(svc.s, { italics: true, color: GOLD }));
        children.push(body(svc.d));
        children.push(label('Comment ça fonctionne'));
        children.push(body(svc.how));
        children.push(label('Ce que nous proposons'));
        svc.f.split('; ').forEach((f) => children.push(bullet(f)));
        children.push(spacer());
      });
      children.push(new Paragraph({ children: [new PageBreak()] }));
    });

    // ===== 5. PLATFORMS INTRO =====
    children.push(h1('5. Nos plateformes propriétaires'));
    children.push(body("PRECISIONS Group édite cinq plateformes numériques conçues pour répondre aux besoins concrets du marché africain. Chacune adresse un secteur distinct : commerce, éducation, ressources humaines, services de proximité et finance."));
    children.push(divider());

    // ===== 6-10. PLATFORMS =====
    platforms.forEach((p, idx) => {
      children.push(h1(`${idx + 6}. ${p.name}`));
      children.push(body(p.tagline, { bold: true, color: GOLD, size: 24 }));
      children.push(body(p.subtitle, { italics: true, color: MUTED }));
      children.push(spacer());
      children.push(label('Description'));
      children.push(body(p.desc));
      children.push(label('Comment ça fonctionne'));
      children.push(body(p.how));
      children.push(label('Fonctionnalités clés'));
      p.features.forEach((f) => children.push(bullet(f)));
      children.push(label('Statut'));
      children.push(body(p.status + (p.url ? ` — ${p.url}` : ''), { bold: true, color: p.status === 'Opérationnel' ? '16A34A' : 'B45309' }));
      children.push(divider());
    });

    // ===== 11. METHODOLOGY =====
    children.push(h1('11. Notre méthodologie'));
    children.push(body("Une approche éprouvée en quatre étapes pour apporter des réponses tactiques et pertinentes à vos enjeux."));
    const steps = [
      { n: '01', t: 'Écoute', d: 'Compréhension approfondie de vos enjeux et objectifs.' },
      { n: '02', t: 'Stratégie', d: 'Élaboration de solutions tactiques pertinentes.' },
      { n: '03', t: 'Création', d: 'Conception et production des dispositifs.' },
      { n: '04', t: 'Déploiement', d: 'Mise en œuvre et optimisation continue.' },
    ];
    steps.forEach((s) => {
      children.push(new Paragraph({
        spacing: { before: 120, after: 40 },
        children: [
          new TextRun({ text: `${s.n}  `, bold: true, size: 28, color: GOLD }),
          new TextRun({ text: s.t, bold: true, size: 24, color: DARK }),
        ],
      }));
      children.push(body(s.d));
    });
    children.push(divider());

    // ===== 12. CTA =====
    children.push(h1('12. Travaillons ensemble'));
    children.push(body("Contactez-nous pour une consultation gratuite et découvrez comment nos services et nos plateformes peuvent accélérer votre développement. Rendez-vous sur notre site internet pour échanger avec nos équipes."));

    const doc = new Document({
      styles: {
        default: {
          document: { run: { font: 'Calibri', size: 22 } },
        },
      },
      numbering: {
        config: [{
          reference: 'bullets',
          levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT }],
        }],
      },
      sections: [{
        properties: {
          page: { margin: { top: convertInchesToTwip(1), bottom: convertInchesToTwip(1), left: convertInchesToTwip(1), right: convertInchesToTwip(1) } },
        },
        children,
      }],
    });

    const buffer = await Packer.toBuffer(doc);
    return new Response(buffer, {
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': 'attachment; filename="PRECISIONS_Group_Presentation.docx"',
      },
    });
  } catch (error) {
    console.error('Erreur génération présentation:', (error as Error)?.message, (error as Error)?.stack);
    return jsonError('Erreur interne du serveur', 500);
  }
});
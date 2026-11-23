import { SERVICES_EN } from './servicesEN';

/**
 * Version anglaise de la Présentation du groupe (page À propos), indexée par identifiant.
 * Titres, listes et points forts sont partagés avec la page Métiers.
 */

const CATEGORY_DESCRIPTIONS_EN = {
  communication: 'Designing and orchestrating tactical answers to your consumer or B2B communication challenges, aligning brand identity, media and digital for measurable impact.',
  economique: 'Supporting your development and economic growth projects, from financing and structuring to strategic management and international expansion.',
};

const CATEGORY_TITLES_EN = {
  communication: 'Digital Communication',
  economique: 'Economic Development',
};

const SERVICE_DETAILS_EN = {
  strategie: {
    description: 'We design and orchestrate relevant, tactical answers to your consumer or B2B communication challenges. We start with a full audit of your ecosystem to define a distinctive positioning, key messages and a consistent action plan across all your touchpoints.',
    howItWorks: 'Audit and assessment → positioning and key messages → integrated communication plan → coordinated roll-out → continuous measurement and optimization. We run workshops with your teams, deliver structured outputs (brand guidelines, brand platforms, editorial plans) and support the operational roll-out.',
  },
  publicite: {
    description: 'Design and roll-out of impactful advertising campaigns across all media channels. From creative work to media planning, we orchestrate campaigns that reach the right audience, at the right time, with the right message — on TV, radio, print, outdoor and digital.',
    howItWorks: 'Creative brief → design and production of visuals and films → media planning and optimized media buying → multi-channel broadcast → performance tracking and optimization. We manage the ROI of each channel and adjust investment in real time.',
  },
  digital: {
    description: 'Complete digital strategies to strengthen your online presence. We build your digital ecosystem — social media, content, search, paid acquisition and automation — to generate a steady flow of engagement and qualified leads.',
    howItWorks: 'Digital strategy → content production → community management → acquisition (SEO/SEA) → nurturing and automation. Every lever is data-driven, with shared dashboards and continuous optimization cycles.',
  },
  reseau: {
    description: 'Running and energizing your distribution and partner networks. We design engagement programs that build commitment, boost sales performance and strengthen the sense of belonging to your brand.',
    howItWorks: 'Network assessment → engagement program design → dedicated communication tools → events, incentives and challenges → field training and support. We measure engagement and sales impact at every stage.',
  },
  web: {
    description: 'Design and development of custom websites and applications. We build fast, accessible and secure web experiences, from corporate websites to complex marketplaces, with constant attention to user experience and speed.',
    howItWorks: 'Scoping and UX/UI → front-end and back-end development → third-party integrations → testing and QA → go-live → maintenance and updates. We use modern stacks (React, Node.js) and DevOps practices for reliable, iterative delivery.',
  },
  support: {
    description: 'Help desk and support services for your users. We set up responsive, human support — hotlines, help desks, knowledge bases — that improves your users’ satisfaction and self-sufficiency.',
    howItWorks: 'Support needs analysis → hotline and help desk set-up → documentation → user training → satisfaction monitoring. We manage support quality with clear indicators (response time, resolution, CSAT).',
  },
  financement: {
    description: 'Identifying the right funding for your projects and helping you secure it. We map the available funding sources — donors, public funds, private investors — and build solid applications that maximize your chances of success.',
    howItWorks: 'Needs analysis → identification of eligible sources → application preparation → relations with funders → follow-up and reporting. We stay by your side until disbursement and end-of-project reporting.',
  },
  prefinancement: {
    description: 'Pre-financing solutions to start your projects before the final funds are secured. We structure pre-financing arrangements that reassure your suppliers and partners while protecting your cash flow.',
    howItWorks: 'Financial feasibility analysis → pre-financing structuring → introductions to financial partners → guarantees and risk protection → project cash-flow monitoring.',
  },
  projets: {
    description: 'Designing and structuring projects that involve several business sectors. We orchestrate complex projects by bringing in the right skills, structuring partnerships and managing governance from start to finish.',
    howItWorks: 'Multi-sector feasibility study → partnership building → business plan and business model → stakeholder coordination → project management and governance.',
  },
  strategique: {
    description: 'Strategic support to define and achieve your development goals. We help you clarify your vision, build a realistic strategy and align your organization around shared priorities.',
    howItWorks: 'Strategic assessment → vision and goals → strategic plan → organizational alignment → dashboards and management indicators.',
  },
  organisation: {
    description: 'Organizational consulting to improve the efficiency and performance of your structure. We assess your processes, identify bottlenecks and help you set up a more agile, high-performing organization.',
    howItWorks: 'Organizational audit → process optimization → team structuring → management systems → manager training.',
  },
  expertise: {
    description: 'In-depth expertise in specific fields to address your technical challenges. We bring in industry experts for targeted assignments: sector studies, benchmarks, technical recommendations and skills transfer.',
    howItWorks: 'Scoping of the expertise needed → assignment of the industry expert → studies and analyses → operational recommendations → skills transfer to your teams.',
  },
  changement: {
    description: 'Supporting transformation processes to secure buy-in and success. We design change management strategies that prepare, engage and equip your teams to adopt new ways of working for the long term.',
    howItWorks: 'Readiness assessment → change management strategy → internal communication → training and upskilling → adoption monitoring.',
  },
  international: {
    description: 'Support to develop your activities and partnerships on an international scale. We open doors to new markets, introduce you to foreign partners and help structure lasting alliances.',
    howItWorks: 'Target market study → partner introductions → negotiation support → partnership structuring → representation and advocacy.',
  },
};

const PLATFORMS_EN = {
  sombateka: {
    tagline: 'Online Sales Platform',
    description: 'SombaTeka is an e-commerce platform open to everyone — individuals, retailers, SMEs and large companies. It makes trade easier in the DR Congo and abroad with simple, secure tools, from mobile payment to integrated delivery.',
    howItWorks: 'A seller creates an online store in minutes, adds products and sets up payment methods (Mobile Money, bank card) and delivery options. Buyers browse the catalog, order and track their delivery in real time. The platform handles transactions and inventory, and gives merchants a complete analytics dashboard.',
    techRoles: [
      'Front-end (merchant and buyer interface)',
      'Back-end API and business logic',
      'Product, order and user database',
      'Payment integration (M-Pesa, Airtel Money, Orange Money)',
      'iOS and Android mobile apps',
    ],
  },
  harchive: {
    tagline: 'Digital Academic Archives',
    description: 'Harchive is a digital archiving platform for the academic world in the DR Congo. It centralizes and secures the records of students, teachers and institutions, while building a national network linking every academic body in the country, from universities to vocational schools.',
    howItWorks: 'Each member institution has a secure space to archive its students’ academic records, diplomas and certificates. Records can be verified online, which guarantees that diplomas are authentic. The national network lets institutions share teaching resources and follow students’ academic paths from bachelor’s degree to PhD.',
    techRoles: [
      'Institution and student interface',
      'Secure API and role management',
      'Relational storage of academic records',
      'Tamper-proof diploma archiving',
      'Online diploma authentication',
    ],
    techNames: { 3: 'IPFS / Decentralized storage', 4: 'QR code / Verification' },
  },
  app243: {
    tagline: 'All-in-One HR Platform',
    description: 'App243 is a human resources platform designed for Africa. It brings employee management, payroll, leave, time tracking and recruitment together in a modern, intuitive interface to simplify HR administration for companies of all sizes.',
    howItWorks: 'The company sets up its org chart and imports its employees. Each employee has a personal space to clock in, request leave and view payslips. HR manages everything from a real-time dashboard — salaries, contracts, certificates, expenses and recruitment — in a secure environment.',
    techRoles: [
      'HR interface and employee space',
      'Back-end API and payroll calculation',
      'Structured, versioned HR data',
      'Authentication and role-based access control',
      'Mobile app for time tracking and leave',
    ],
  },
  parckbox: {
    tagline: 'Printing, spaces, studio and training',
    howItWorks: 'Printing: upload your files, choose your options and get an instant quote; the paid order and its invoice appear in “My space”. Spaces: buy an hour package, then book whenever you like; each booking is checked automatically (availability, no double booking, enough hours left). Studio: set rental, photo shoots, video production or event coverage, with an estimated price before you confirm, an online deposit and the balance paid on site. Digital invitations: customizable templates, online RSVPs and QR code check-in on the day. Digital and AI training: in-person workshops, online sessions, individual paths or tailored programs.',
    techRoles: [
      'Ordering and booking front-end',
      'Back-end API and quote generation',
      'Orders, bookings and invoices',
      'Secure online payments',
      'PDF quotes and invoices',
    ],
  },
  pay243: {
    tagline: 'E-wallet',
  },
  orbitalinvest: {
    tagline: 'Investment Platform',
    howItWorks: 'Users create an investor profile and set their goals. The platform offers diversified investment opportunities, analysis tools and a real-time portfolio dashboard. Personalized advice supports every decision, in a secure environment that complies with financial regulations.',
    techRoles: [
      'Investor interface and dashboard',
      'Back-end API and analysis engine',
      'Financial and portfolio data',
      'Decision-support tools and recommendations',
      'Transaction security and compliance',
    ],
    techNames: { 4: 'AES-256 encryption' },
  },
};

const withBenefits = (item, en) => ({
  ...item,
  ...en,
  benefits: item.benefits.map((b, i) => ({ ...b, text: en.benefits?.[i] ?? b.text })),
});

export function localizePresentation(categories, platforms) {
  return {
    categories: categories.map((category) => ({
      ...category,
      title: CATEGORY_TITLES_EN[category.id] ?? category.title,
      description: CATEGORY_DESCRIPTIONS_EN[category.id] ?? category.description,
      services: category.services.map((service) =>
        withBenefits(service, { ...SERVICES_EN[service.id], ...SERVICE_DETAILS_EN[service.id] }),
      ),
    })),
    platforms: platforms.map((platform) => {
      const shared = SERVICES_EN[platform.id] || {};
      const own = PLATFORMS_EN[platform.id] || {};
      const { techRoles, techNames, ...rest } = own;
      return {
        ...withBenefits(platform, {
          subtitle: shared.subtitle,
          description: shared.description,
          features: shared.features,
          benefits: shared.benefits,
          ...rest,
        }),
        techStack: platform.techStack?.map((tech, i) => ({
          ...tech,
          name: techNames?.[i] ?? tech.name,
          role: techRoles?.[i] ?? tech.role,
        })),
      };
    }),
  };
}

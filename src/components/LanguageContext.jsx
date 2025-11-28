import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  FR: {
    // Navigation
    nav: {
      home: 'Accueil',
      services: 'Services',
      portfolio: 'Réalisations',
      about: 'À propos',
      blog: 'Blog',
      contact: 'Contact',
      viewAll: 'Voir tout',
      startProject: 'Démarrer un projet',
    },
    // Hero
    hero: {
      tagline: 'Agence digitale',
      title: 'Transformons vos idées en succès',
      subtitle: 'Nous accompagnons les entreprises dans leur transformation avec des solutions innovantes et sur mesure.',
      cta: 'Discuter de votre projet',
      scrollDown: 'Défiler',
    },
    // Services
    services: {
      tagline: 'Nos services',
      title: 'Des solutions complètes pour votre transformation',
      subtitle: 'Une approche holistique combinant stratégie, technologie et créativité pour des résultats mesurables et durables.',
      viewAll: 'Voir tous nos services',
      learnMore: 'En savoir plus',
      projectDev: 'Développement des Projets',
      projectDevDesc: 'Création et développement de vos projets de A à Z, du design à la mise en production.',
      consultation: 'Consultation',
      consultationDesc: 'Accompagnement personnalisé et expertise pour guider vos décisions stratégiques.',
      financing: 'Recherche des Financements',
      financingDesc: 'Identification et accompagnement dans l\'obtention de financements pour vos projets.',
      strategy: 'Conseil & Stratégie',
      strategyDesc: 'Audit digital complet, définition de votre roadmap et accompagnement stratégique.',
      marketing: 'Marketing Digital',
      marketingDesc: 'Stratégies d\'acquisition et de conversion optimisées pour accélérer votre croissance.',
      training: 'Formation',
      trainingDesc: 'Programmes de formation sur mesure pour monter en compétences vos équipes.',
    },
    // Portfolio
    portfolio: {
      tagline: 'Nos réalisations',
      title: 'Des projets qui font la différence',
      subtitle: 'Découvrez comment nous avons aidé nos clients à atteindre leurs objectifs.',
      viewAll: 'Voir tous les projets',
      categories: {
        all: 'Tous',
        web: 'Web',
        mobile: 'Mobile',
        branding: 'Branding',
        marketing: 'Marketing',
      },
    },
    // Testimonials
    testimonials: {
      tagline: 'La satisfaction de nos clients est notre plus grande fierté. Découvrez leurs témoignages.',
      title: 'Ce que disent nos clients',
    },
    // CTA
    cta: {
      title: 'Prêt à transformer votre vision en réalité ?',
      subtitle: 'Discutons de votre projet et découvrez comment nous pouvons vous aider.',
      bookCall: 'Réserver un appel',
      contactUs: 'Nous contacter',
    },
    // Contact
    contact: {
      tagline: 'Contact',
      title: 'Parlons de votre projet',
      subtitle: 'Nous sommes là pour vous accompagner. Contactez-nous pour une consultation gratuite.',
      form: {
        fullName: 'Nom complet',
        email: 'Email professionnel',
        phone: 'Téléphone',
        company: 'Entreprise',
        projectType: 'Type de projet',
        budget: 'Budget estimé',
        message: 'Votre message',
        submit: 'Envoyer le message',
        sending: 'Envoi en cours...',
        success: 'Message envoyé !',
        successMessage: 'Merci pour votre message. Notre équipe vous contactera dans les 24h.',
        sendAnother: 'Envoyer un autre message',
      },
      info: {
        title: 'Nos coordonnées',
        email: 'Email',
        phone: 'Téléphone',
        address: 'Adresse',
        hours: 'Horaires',
        followUs: 'Suivez-nous',
        quickActions: 'Actions rapides',
        bookCall: 'Réserver un appel découverte',
        startChat: 'Démarrer un chat',
      },
      faq: {
        title: 'Questions fréquentes',
        subtitle: 'Retrouvez les réponses aux questions les plus courantes.',
      },
    },
    // Footer
    footer: {
      newsletter: {
        title: 'Restez informé',
        subtitle: 'Recevez nos dernières actualités et conseils.',
        placeholder: 'Votre email',
        subscribe: 'S\'abonner',
      },
      description: 'Votre partenaire pour la transformation digitale. Nous créons des solutions innovantes pour propulser votre croissance.',
      copyright: 'Tous droits réservés.',
    },
    // Common
    common: {
      readMore: 'Lire la suite',
      seeMore: 'Voir plus',
      close: 'Fermer',
      loading: 'Chargement...',
    },
  },
  EN: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      portfolio: 'Portfolio',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      viewAll: 'View all',
      startProject: 'Start a project',
    },
    // Hero
    hero: {
      tagline: 'Digital agency',
      title: 'Let\'s transform your ideas into success',
      subtitle: 'We help businesses with their transformation through innovative and tailored solutions.',
      cta: 'Discuss your project',
      scrollDown: 'Scroll down',
    },
    // Services
    services: {
      tagline: 'Our services',
      title: 'Complete solutions for your transformation',
      subtitle: 'A holistic approach combining strategy, technology and creativity for measurable and lasting results.',
      viewAll: 'View all our services',
      learnMore: 'Learn more',
      projectDev: 'Project Development',
      projectDevDesc: 'Creation and development of your projects from A to Z, from design to production.',
      consultation: 'Consultation',
      consultationDesc: 'Personalized support and expertise to guide your strategic decisions.',
      financing: 'Funding Research',
      financingDesc: 'Identification and support in obtaining funding for your projects.',
      strategy: 'Consulting & Strategy',
      strategyDesc: 'Complete digital audit, roadmap definition and strategic support.',
      marketing: 'Digital Marketing',
      marketingDesc: 'Optimized acquisition and conversion strategies to accelerate your growth.',
      training: 'Training',
      trainingDesc: 'Custom training programs to upskill your teams.',
    },
    // Portfolio
    portfolio: {
      tagline: 'Our work',
      title: 'Projects that make a difference',
      subtitle: 'Discover how we helped our clients achieve their goals.',
      viewAll: 'View all projects',
      categories: {
        all: 'All',
        web: 'Web',
        mobile: 'Mobile',
        branding: 'Branding',
        marketing: 'Marketing',
      },
    },
    // Testimonials
    testimonials: {
      tagline: 'Our clients\' satisfaction is our greatest pride. Discover their testimonials.',
      title: 'What our clients say',
    },
    // CTA
    cta: {
      title: 'Ready to transform your vision into reality?',
      subtitle: 'Let\'s discuss your project and discover how we can help you.',
      bookCall: 'Book a call',
      contactUs: 'Contact us',
    },
    // Contact
    contact: {
      tagline: 'Contact',
      title: 'Let\'s talk about your project',
      subtitle: 'We are here to support you. Contact us for a free consultation.',
      form: {
        fullName: 'Full name',
        email: 'Professional email',
        phone: 'Phone',
        company: 'Company',
        projectType: 'Project type',
        budget: 'Estimated budget',
        message: 'Your message',
        submit: 'Send message',
        sending: 'Sending...',
        success: 'Message sent!',
        successMessage: 'Thank you for your message. Our team will contact you within 24 hours.',
        sendAnother: 'Send another message',
      },
      info: {
        title: 'Our contact details',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        hours: 'Hours',
        followUs: 'Follow us',
        quickActions: 'Quick actions',
        bookCall: 'Book a discovery call',
        startChat: 'Start a chat',
      },
      faq: {
        title: 'Frequently asked questions',
        subtitle: 'Find answers to the most common questions.',
      },
    },
    // Footer
    footer: {
      newsletter: {
        title: 'Stay informed',
        subtitle: 'Receive our latest news and tips.',
        placeholder: 'Your email',
        subscribe: 'Subscribe',
      },
      description: 'Your partner for digital transformation. We create innovative solutions to drive your growth.',
      copyright: 'All rights reserved.',
    },
    // Common
    common: {
      readMore: 'Read more',
      seeMore: 'See more',
      close: 'Close',
      loading: 'Loading...',
    },
  },
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'FR';
    }
    return 'FR';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { createPageUrl } from '@/utils';
import { db } from '@/api/db';
import { useLanguage } from '@/components/LanguageContext';
import { DOMAINS, domainCopy } from '@/components/brand/domains';

const PLATFORMS = [
  { name: 'SombaTeka', url: 'https://www.sombateka.com' },
  { name: 'HARCHIVE', url: 'https://harchive.net' },
  { name: 'App243', url: 'https://app243.com' },
  { name: 'PARCK BOX', url: 'https://parckbox.com' },
  { name: 'Pay243', url: 'https://pay243.com' },
  { name: 'OrbitalInvest', url: null },
];

const COPY = {
  FR: {
    about: 'Communication, financement, digital, formation et conseil au service des entreprises et des institutions de la RD Congo.',
    group: 'Le groupe',
    trades: 'Nos métiers',
    platforms: 'Nos plateformes',
    soon: 'bientôt',
    newsletterTitle: 'Recevoir les actualités du groupe',
    emailLabel: 'Adresse email',
    subscribe: 'S’inscrire',
    subscribed: 'Inscription enregistrée',
    error: 'L’inscription n’a pas pu être enregistrée. Réessayez dans un instant.',
    legal: 'Mentions légales',
    rights: 'Tous droits réservés.',
    links: [
      { name: 'Présentation du groupe', href: 'About' },
      { name: 'Réalisations', href: 'Portfolio' },
      { name: 'Actualités', href: 'Blog' },
      { name: 'Témoignages', href: 'Testimonials' },
      { name: 'Contact', href: 'Contact' },
    ],
  },
  EN: {
    about: 'Communication, financing, digital, training and consulting for companies and institutions across the DR Congo.',
    group: 'The group',
    trades: 'What we do',
    platforms: 'Our platforms',
    soon: 'soon',
    newsletterTitle: 'Get group news',
    emailLabel: 'Email address',
    subscribe: 'Subscribe',
    subscribed: 'Subscription saved',
    error: 'Your subscription could not be saved. Try again in a moment.',
    legal: 'Legal notice',
    rights: 'All rights reserved.',
    links: [
      { name: 'About the group', href: 'About' },
      { name: 'Projects', href: 'Portfolio' },
      { name: 'News', href: 'Blog' },
      { name: 'Testimonials', href: 'Testimonials' },
      { name: 'Contact', href: 'Contact' },
    ],
  },
};

function FooterHeading({ children }) {
  return (
    <h2 className="text-[0.95rem] font-medium text-white mb-4">{children}</h2>
  );
}

export default function Footer() {
  const { language } = useLanguage();
  const copy = COPY[language] ?? COPY.FR;
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await db.Lead.submit({ email, full_name: 'Newsletter Subscriber', source: 'newsletter', status: 'new' });
      toast.success(copy.subscribed);
      setEmail('');
    } catch (error) {
      console.error('Erreur inscription newsletter:', error);
      toast.error(copy.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const linkClass = 'hover:text-white hover:underline underline-offset-4';

  return (
    <footer className="bg-black text-white/55 text-[0.95rem] border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-[minmax(0,1fr)] sm:grid-cols-2 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <img src="/images/precision-logo.png" alt="PRECISION Group" className="h-6 w-auto invert" />
            <p className="mt-6 max-w-sm">{copy.about}</p>
            <address className="mt-6 not-italic leading-relaxed">
              100, av. Colonel Ebeya et TSF<br />
              Gombe, Kinshasa, RD Congo<br />
              <a href="mailto:contact@precisions.group" className="text-white underline underline-offset-4">
                contact@precisions.group
              </a>
            </address>
          </div>

          <nav className="lg:col-span-2 lg:col-start-6" aria-label={copy.group}>
            <FooterHeading>{copy.group}</FooterHeading>
            <ul className="space-y-2.5">
              {copy.links.map((link) => (
                <li key={link.href}><Link to={createPageUrl(link.href)} className={linkClass}>{link.name}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label={copy.trades}>
            <FooterHeading>{copy.trades}</FooterHeading>
            <ul className="space-y-2.5">
              {DOMAINS.map((domain) => (
                <li key={domain.id}>
                  <Link to={`${createPageUrl('Services')}#${domain.id}`} className={linkClass}>{domainCopy(domain, language).name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-2" aria-label={copy.platforms}>
            <FooterHeading>{copy.platforms}</FooterHeading>
            <ul className="space-y-2.5">
              {PLATFORMS.map((platform) => (
                <li key={platform.name}>
                  {platform.url ? (
                    <a href={platform.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {platform.name}<span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  ) : (
                    <span>{platform.name} <span className="text-white/45">({copy.soon})</span></span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-14 py-8 border-y border-white/10 flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
          <p className="font-medium text-white">{copy.newsletterTitle}</p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2 w-full md:max-w-md">
            <label htmlFor="newsletter-email" className="sr-only">{copy.emailLabel}</label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.emailLabel}
              className="min-w-0 flex-1 h-12 rounded-full bg-white/5 border border-white/15 px-5 text-white placeholder:text-white/40 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-12 px-6 rounded-full bg-white text-black font-medium hover:bg-white/85 disabled:opacity-60 transition-colors"
            >
              {copy.subscribe}
            </button>
          </form>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-between text-sm text-white/55">
          <p>© {new Date().getFullYear()} PRECISIONS Group. {copy.rights}</p>
          <Link to={createPageUrl('MentionsLegales')} className="hover:text-white">{copy.legal}</Link>
        </div>
      </div>

    </footer>
  );
}

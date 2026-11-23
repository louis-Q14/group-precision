import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/LanguageContext';

const getNavItems = (language) => [
  { name: language === 'FR' ? 'Le groupe' : 'The group', href: 'About' },
  { name: language === 'FR' ? 'Nos métiers' : 'What we do', href: 'Services' },
  { name: language === 'FR' ? 'Réalisations' : 'Projects', href: 'Portfolio' },
  { name: language === 'FR' ? 'Actualités' : 'News', href: 'Blog' },
  { name: language === 'FR' ? 'Témoignages' : 'Testimonials', href: 'Testimonials' },
];

function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="flex items-center text-sm" role="group" aria-label="Langue / Language">
      {['FR', 'EN'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          className={`px-1.5 py-1 ${language === code ? 'text-white font-semibold' : 'text-white/45 hover:text-white'}`}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = getNavItems(language);
  const isActive = (href) => pathname.toLowerCase() === createPageUrl(href);

  useEffect(() => setIsMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsMenuOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-xl text-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between gap-8">
        <Link to="/" className="shrink-0" aria-label="PRECISION Group, accueil">
          <img src="/images/precision-logo.png" alt="PRECISION Group" className="h-6 w-auto invert" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={createPageUrl(item.href)}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={`text-[0.95rem] transition-colors ${
                isActive(item.href) ? 'text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <LanguageToggle language={language} setLanguage={setLanguage} />
          <Link
            to={createPageUrl('Contact')}
            className="inline-flex items-center h-9 px-4 rounded-full bg-white text-black text-sm font-medium hover:bg-white/85 transition-colors"
          >
            {language === 'FR' ? 'Nous écrire' : 'Write to us'}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="menu-mobile"
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          className="lg:hidden -mr-2 p-2"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menu mobile : se déplie sous la barre, sans recouvrir l'écran */}
      {isMenuOpen && (
        <nav id="menu-mobile" className="lg:hidden border-t border-white/10 bg-black h-[calc(100dvh-4rem)] overflow-y-auto px-5 py-6 flex flex-col" aria-label="Navigation mobile">
          {[{ name: language === 'FR' ? 'Accueil' : 'Home', href: 'Home' }, ...navItems, { name: 'Contact', href: 'Contact' }].map((item) => (
            <Link
              key={item.href}
              to={item.href === 'Home' ? '/' : createPageUrl(item.href)}
              className="py-3 text-2xl font-semibold tracking-tight border-b border-white/10"
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-auto pt-8 flex items-center justify-between">
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <a href="mailto:contact@precisions.group" className="text-white/70 underline underline-offset-4">contact@precisions.group</a>
          </div>
        </nav>
      )}
    </header>
  );
}

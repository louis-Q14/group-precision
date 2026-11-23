import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';

function SkipLink() {
  const { language } = useLanguage();
  return (
    <a
      href="#contenu"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded-md"
    >
      {language === 'EN' ? 'Skip to content' : 'Aller au contenu'}
    </a>
  );
}

export default function Layout({ children, currentPageName }) {
  // Site public en thème sombre ; l'Admin reste en clair pour la saisie
  const dark = currentPageName !== 'Admin';
  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', dark);
  }, [dark]);

  return (
    <LanguageProvider>
      <div className={`min-h-screen flex flex-col ${dark ? 'bg-black text-white' : 'bg-mist'}`}>
        <SkipLink />
        <Header />
        <div id="contenu" className="flex-1">
          {children}
        </div>
        <Footer />
        <Toaster position="top-right" richColors theme={dark ? 'dark' : 'light'} />
      </div>
    </LanguageProvider>
  );
}

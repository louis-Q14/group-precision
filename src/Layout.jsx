import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import { LanguageProvider, useLanguage } from '@/components/LanguageContext';
import { ThemeProvider, useTheme } from '@/components/ThemeContext';

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

function Shell({ children, currentPageName }) {
  const { theme } = useTheme();
  // Site public en thème sombre ou clair, au choix du visiteur ; l'Admin reste neutre pour la saisie
  const isPublic = currentPageName !== 'Admin';
  const dark = isPublic && theme === 'dark';
  const light = isPublic && theme === 'light';
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('theme-dark', dark);
    root.classList.toggle('theme-light', light);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', light ? '#ECE7E0' : '#000000');
  }, [dark, light]);

  return (
    <LanguageProvider>
      <div className={`min-h-screen flex flex-col ${isPublic ? 'bg-black text-white' : 'bg-mist'}`}>
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

export default function Layout(props) {
  return (
    <ThemeProvider>
      <Shell {...props} />
    </ThemeProvider>
  );
}

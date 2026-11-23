import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

export default function PageNotFound() {
  const { pathname } = useLocation();
  const { language } = useLanguage();
  const en = language === 'EN';

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-8xl font-semibold tracking-tight text-gradient">404</h1>

        <div className="space-y-3">
          <h2 className="text-2xl font-medium text-white">{en ? 'Page not found' : 'Page introuvable'}</h2>
          <p className="text-white/60 leading-relaxed">
            {en ? 'The page ' : 'La page '}
            <span className="font-medium text-white/85">{en ? `“${pathname}”` : `« ${pathname} »`}</span>
            {en ? ' does not exist or has been moved.' : ' n’existe pas ou a été déplacée.'}
          </p>
        </div>

        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white/75 bg-white/[0.04] border border-white/10 rounded-lg hover:border-white/40 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            {en ? 'Back to home' : 'Retour à l’accueil'}
          </Link>
        </div>
      </div>
    </div>
  );
}

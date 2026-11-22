import { Link, useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function PageNotFound() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAFA]">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl font-light text-gray-300">404</h1>
          <div className="h-0.5 w-16 bg-[#C9A86C] mx-auto" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-medium text-[#0A0A0B]">Page introuvable</h2>
          <p className="text-gray-600 leading-relaxed">
            La page <span className="font-medium text-gray-800">« {pathname} »</span> n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-[#C9A86C] transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

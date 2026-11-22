import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

/**
 * En-tête des pages intérieures : fil d'Ariane, titre en Archivo élargi, chapeau.
 */
export default function PageHero({ title, lede, children }) {
  const { language } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-black text-white border-b border-white/10">
      <div className="absolute inset-0 -z-10 bg-grid" aria-hidden="true" />
      <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-48 h-[440px] w-[820px] max-w-[150vw] glow" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-5 lg:px-8 pt-8 pb-16 lg:pb-24">
        <nav aria-label={language === 'FR' ? 'Fil d’Ariane' : 'Breadcrumb'}>
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/45">
            <li>
              <Link to="/" className="hover:text-white underline-offset-4 hover:underline">
                {language === 'FR' ? 'Accueil' : 'Home'}
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
            <li aria-current="page" className="text-white/80">{title}</li>
          </ol>
        </nav>

        <h1 className="mt-12 lg:mt-16 text-hero font-semibold text-gradient max-w-[18ch]">{title}</h1>

        {lede && (
          <div className="mt-6 grid lg:grid-cols-12">
            <p className="lg:col-span-6 text-lede text-white/60">{lede}</p>
          </div>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

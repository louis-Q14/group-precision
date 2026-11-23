import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';
import { Reveal } from '@/components/brand/Reveal';

// Projets repris de la page Réalisations
const PROJECTS = [
  {
    name: 'Terreau Fertile',
    image: '/images/a9e794b0a_1.jpg',
    FR: { tag: 'Agriculture, financement', text: 'Plateforme de soutien aux maraîchers : accès à la terre et au financement de court terme pour une production locale durable.' },
    EN: { tag: 'Agriculture, financing', text: 'A platform supporting market gardeners: access to land and short-term financing for sustainable local production.' },
  },
  {
    name: 'Harchive',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=900&fit=crop',
    FR: { tag: 'Éducation, numérique', text: 'Plateforme qui met en relation tous les acteurs de l’éducation en République démocratique du Congo.' },
    EN: { tag: 'Education, digital', text: 'A platform connecting every education stakeholder in the Democratic Republic of the Congo.' },
  },
];

export default function ProjectsSection() {
  const { language } = useLanguage();
  const portfolio = createPageUrl('Portfolio');

  return (
    <section className="bg-black text-white py-24 lg:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="text-display font-semibold text-gradient">{language === 'FR' ? 'Réalisations' : 'Projects'}</h2>
          <Link to={portfolio} className="group inline-flex items-center gap-2 text-white/80 hover:text-white">
            {language === 'FR' ? 'Toutes nos réalisations' : 'All projects'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-4">
          {PROJECTS.map((project, i) => {
            const t = project[language] ?? project.FR;
            return (
              <Reveal key={project.name} delay={i * 0.1}>
                <Link to={portfolio} className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10">
                  <img src={project.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <span className="inline-block rounded-full glass px-3 py-1 text-xs text-white/80">{t.tag}</span>
                    <h3 className="mt-4 text-2xl lg:text-3xl font-semibold tracking-tight">{project.name}</h3>
                    <p className="mt-2 text-white/70 max-w-md">{t.text}</p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

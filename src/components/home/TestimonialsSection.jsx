import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/LanguageContext';
import usePublicEntity from '@/hooks/usePublicEntity';

/**
 * Témoignages approuvés dans l'Admin. La section ne s'affiche pas tant qu'il n'y en a aucun :
 * pas de faux témoignages de remplissage.
 */
export default function TestimonialsSection() {
  const { language } = useLanguage();
  const { items } = usePublicEntity('Testimonial', { filter: { is_approved: true } });

  if (items.length === 0) return null;

  const [main, ...others] = items.slice(0, 3);
  const signature = (t) => [t.author_name, [t.position, t.company].filter(Boolean).join(', ')].filter(Boolean);

  return (
    <section className="bg-black text-white py-24 lg:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 lg:px-8 grid lg:grid-cols-12 gap-12">
        <figure className="lg:col-span-7">
          <blockquote className="text-[clamp(1.4rem,2.4vw,2.1rem)] font-medium tracking-tight leading-snug">
            « {main.content} »
          </blockquote>
          <figcaption className="mt-8 ">
            <span className="block font-semibold text-white">{signature(main)[0]}</span>
            {signature(main)[1] && <span className="block text-sm text-white/50">{signature(main)[1]}</span>}
          </figcaption>
        </figure>

        <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-10">
          {others.map((t) => (
            <figure key={t.id}>
              <blockquote className="text-white/75">« {t.content} »</blockquote>
              <figcaption className="mt-3 text-sm">
                <span className="font-semibold text-white">{signature(t)[0]}</span>
                {signature(t)[1] && <span className="text-white/50">, {signature(t)[1]}</span>}
              </figcaption>
            </figure>
          ))}
          <Link
            to={createPageUrl('Testimonials')}
            className="text-white/80 underline underline-offset-4 hover:text-white w-fit"
          >
            {language === 'FR' ? 'Lire tous les témoignages' : 'Read all testimonials'}
          </Link>
        </div>
      </div>
    </section>
  );
}

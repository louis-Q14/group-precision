import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/LanguageContext';
import usePublicEntity from '@/hooks/usePublicEntity';
import { getFallbackTeam } from '@/components/brand/team';
import { Reveal } from '@/components/brand/Reveal';

/** La direction du groupe, en portraits noir et blanc. */
export default function TeamSection() {
  const { language } = useLanguage();
  const { items, fromDatabase } = usePublicEntity('TeamMember', {
    sortByOrder: true,
    fallback: getFallbackTeam(language),
  });
  const team = (fromDatabase
    ? items.map((m) => ({ id: m.id, name: m.name, position: m.position, image: m.photo_url }))
    : items
  ).slice(0, 5);

  if (team.length === 0) return null;

  return (
    <section className="relative bg-black text-white py-24 lg:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <Reveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-display font-semibold text-gradient">
              {language === 'FR' ? 'Notre direction' : 'Our leadership'}
            </h2>
            <p className="mt-5 text-lede text-white/60">
              {language === 'FR'
                ? 'Communicants, consultants, ingénieurs et juristes. Vous travaillez directement avec eux.'
                : 'Communicators, consultants, engineers and lawyers. You work with them directly.'}
            </p>
          </div>
          <Link to={createPageUrl('About')} className="group inline-flex items-center gap-2 text-white/80 hover:text-white">
            {language === 'FR' ? 'Découvrir le groupe' : 'Discover the group'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </Reveal>

        <ul className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {team.map((person, i) => (
            <Reveal as="li" key={person.id ?? person.name} delay={i * 0.06}>
              <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 light:bg-[#DDD5CA]">
                {person.image && (
                  <img
                    src={person.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-4 pt-16">
                  <p className="font-medium leading-snug">{person.name}</p>
                  {person.position && <p className="text-sm text-white/60">{person.position}</p>}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

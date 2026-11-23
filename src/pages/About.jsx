import PageHero from '@/components/brand/PageHero';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight,
  Target, Lightbulb, Handshake, Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageContext';
import Presentation from './Presentation';
import usePublicEntity from '@/hooks/usePublicEntity';
import { getFallbackTeam } from '@/components/brand/team';

const getValues = (language) => [
  {
    icon: Target,
    title: 'Excellence',
    description: language === 'FR'
      ? 'Nous visons la perfection dans chaque détail, chaque ligne de code, chaque pixel.'
      : 'We strive for perfection in every detail, every line of code, every pixel.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: language === 'FR'
      ? 'Nous repoussons constamment les limites pour créer des solutions avant-gardistes.'
      : 'We constantly push boundaries to create cutting-edge solutions.',
  },
  {
    icon: Handshake,
    title: language === 'FR' ? 'Partenariat' : 'Partnership',
    description: language === 'FR'
      ? 'Nous construisons des relations durables basées sur la confiance et la transparence.'
      : 'We build lasting relationships based on trust and transparency.',
  },
  {
    icon: Leaf,
    title: language === 'FR' ? 'Responsabilité' : 'Responsibility',
    description: language === 'FR'
      ? 'Nous nous engageons pour un numérique éthique et respectueux de l\'environnement.'
      : 'We are committed to ethical and environmentally responsible digital practices.',
  },
];

const getTimeline = (language) => [
  { year: '2024', title: language === 'FR' ? 'Fondation' : 'Foundation', description: language === 'FR' ? 'Création de PRECISION par Louis-Quatorze Kazadi' : 'PRECISION founded by Louis-Quatorze Kazadi' },
  { year: '2024', title: language === 'FR' ? 'Premiers clients' : 'First clients', description: language === 'FR' ? 'Signature de nos premiers contrats en RD Congo' : 'Our first contracts signed in the DR Congo' },
  { year: '2025', title: language === 'FR' ? 'Croissance' : 'Growth', description: language === 'FR' ? 'Expansion de l\'équipe et diversification des services' : 'Team expansion and service diversification' },
  { year: '2025', title: language === 'FR' ? 'Aujourd\'hui' : 'Today', description: language === 'FR' ? '20+ experts, présence en RD Congo, projets internationaux' : '20+ experts, a presence in the DR Congo and international projects' },
];

export default function About() {
  const { language } = useLanguage();
  const { items: teamRows, fromDatabase } = usePublicEntity('TeamMember', {
    sortByOrder: true,
    fallback: getFallbackTeam(language),
  });
  // Les fiches Admin utilisent photo_url ; le contenu de repli utilise image
  const team = fromDatabase
    ? teamRows.map((m) => ({ id: m.id, name: m.name, position: m.position, image: m.photo_url, linkedin: m.linkedin }))
    : teamRows;
  const values = getValues(language);
  const timeline = getTimeline(language);
  
  return (
    <main>
      <PageHero
        title={language === 'FR' ? 'À propos de PRECISION Group' : 'About PRECISION Group'}
        lede={language === 'FR'
          ? 'Cabinet de conseil en communication digitale et en développement économique, et éditeur de plateformes numériques, au service de la RD Congo et de l’Afrique.'
          : 'A consultancy in digital communication and economic development, and a publisher of digital platforms, serving the DR Congo and Africa.'}
      />

      {/* Qui nous sommes */}
      <section className=" py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <h2 className="text-title text-white">
              {language === 'FR' ? 'Une équipe pluridisciplinaire à Kinshasa' : 'A multidisciplinary team in Kinshasa'}
            </h2>
            <p className="mt-6 text-lede text-white/70">
              {language === 'FR'
                ? 'Communicants, consultants, ingénieurs et juristes travaillent ensemble pour transformer des ambitions en résultats mesurables.'
                : 'Communicators, consultants, engineers and lawyers work together to turn ambitions into measurable results.'}
            </p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-6">
              <div>
                <dt className="text-sm text-white/60">Experts</dt>
                <dd className="mt-1 text-subtitle text-white tabular">20+</dd>
              </div>
              <div>
                <dt className="text-sm text-white/60">{language === 'FR' ? 'Bureaux' : 'Offices'}</dt>
                <dd className="mt-1 text-subtitle text-white tabular">3</dd>
              </div>
              <div>
                <dt className="text-sm text-white/60">{language === 'FR' ? 'Plateformes' : 'Platforms'}</dt>
                <dd className="mt-1 text-subtitle text-white tabular">6</dd>
              </div>
            </dl>
          </div>
          <div className="lg:col-span-6">
            <img
              src="/images/equipe-kinshasa.jpg"
              alt={language === 'FR' ? 'L’équipe PRECISION au travail' : 'The PRECISION team at work'}
              className="w-full rounded-lg object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Services et plateformes en détail */}
      <Presentation />

      {/* Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-4"
            >
              {language === 'FR' ? 'Nos valeurs' : 'Our values'}
            </motion.h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {language === 'FR' 
                ? 'Les principes qui guident chacune de nos actions et décisions.'
                : 'The principles that guide each of our actions and decisions.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-4"
            >
              {language === 'FR' ? 'Notre histoire' : 'Our story'}
            </motion.h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <Badge className="mb-2 bg-white/10 text-white border-0">{item.year}</Badge>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-white/60">{item.description}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-white/[0.04] border border-white/10 relative z-10 hidden lg:block" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-4"
            >
              {language === 'FR' ? 'Notre équipe' : 'Our team'}
            </motion.h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {language === 'FR' 
                ? 'Des experts passionnés qui donnent vie à vos projets.'
                : 'Passionate experts who bring your projects to life.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.id ?? member.name}
                className="cursor-pointer max-w-[250px] mx-auto"
              >
                <motion.div 
                  className="relative overflow-hidden rounded-2xl mb-4  group"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-[306px] object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                  ) : (
                    // Membre sans photo : initiales sur fond doré
                    <div className="w-full h-[306px] flex items-center justify-center bg-white/10 border border-white/15 text-white text-5xl font-semibold tracking-tight">
                      {member.name?.split(' ').map((part) => part[0]).slice(0, 2).join('')}
                    </div>
                  )}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-gold-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-white/60">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          
          <motion.h2
            className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-6"
          >
            {language === 'FR' ? 'Envie de faire partie de l\'équipe ?' : 'Want to be part of the team?'}
          </motion.h2>
          
          <motion.p
            className="text-lg text-white/60 mb-8"
          >
            {language === 'FR' 
              ? 'Nous sommes toujours à la recherche de talents passionnés pour rejoindre notre équipe.'
              : 'We are always looking for passionate talents to join our team.'}
          </motion.p>
          
          <Link to={createPageUrl('Contact')}>
            <Button className="rounded-full px-8 py-6 bg-white text-black hover:bg-white/85 text-lg">
              {language === 'FR' ? 'Voir nos offres' : 'See our offers'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { 
  Sparkles, ArrowRight, Award, Users, Globe2, Heart,
  Linkedin, Twitter, Target, Lightbulb, Handshake, Leaf
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageContext';

const getTeam = (language) => [
  {
    name: 'Louis-Quatorze Kazadi',
    position: language === 'FR' ? 'CEO & Fondateur' : 'CEO & Founder',
    bio: '',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69260002cce4fa45e27a5d57/386c3a38d_Gemini_Generated_Image_g2ibwyg2ibwyg2ib.png',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Erick Tshamala Kazadi',
    position: 'CEO',
    bio: '',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69260002cce4fa45e27a5d57/3c8027f17_Image_126.png',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Serge Biona Mwenga',
    position: language === 'FR' ? 'Directeur de Projet' : 'Project Director',
    bio: '',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69260002cce4fa45e27a5d57/d1c5dcc4f_photo_04.png',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Maitre Joel Mukuna Kalala',
    position: language === 'FR' ? 'Conseil Juridique' : 'Legal Advisor',
    bio: '',
    image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69260002cce4fa45e27a5d57/79b2c13f8_Image_200.png',
    linkedin: '#',
    isLeadership: true,
  },
  ];

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
  { year: '2024', title: language === 'FR' ? 'Fondation' : 'Foundation', description: language === 'FR' ? 'Création de PRECISIONS par Louis-Quatorze Kzd' : 'PRECISIONS founded by Louis-Quatorze Kzd' },
  { year: '2024', title: language === 'FR' ? 'Premiers clients' : 'First Clients', description: language === 'FR' ? 'Signature de nos premiers contrats en RD Congo' : 'Signing our first contracts in DR Congo' },
  { year: '2025', title: language === 'FR' ? 'Croissance' : 'Growth', description: language === 'FR' ? 'Expansion de l\'équipe et diversification des services' : 'Team expansion and service diversification' },
  { year: '2025', title: language === 'FR' ? 'Aujourd\'hui' : 'Today', description: language === 'FR' ? '20+ experts, présence en RD Congo, projets internationaux' : '20+ experts, DR Congo presence, international projects' },
];

const certifications = [
  'Google Partner Premier',
  'Meta Business Partner',
  'HubSpot Solutions Partner',
  'AWS Advanced Partner',
  'Shopify Plus Partner',
];

export default function About() {
  const { language } = useLanguage();
  const team = getTeam(language);
  const values = getValues(language);
  const timeline = getTimeline(language);
  
  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0B] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#C9A86C]/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-8"
              >
                <Sparkles className="w-4 h-4 text-[#C9A86C]" />
                <span className="text-sm text-white">{language === 'FR' ? 'À propos' : 'About'}</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                {language === 'FR' ? 'Nous créons l\'avenir' : 'We create the future'}
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-400 mb-8"
              >
                {language === 'FR' 
                  ? 'Une équipe passionnée d\'experts qui transforme les ambitions digitales en succès mesurables.'
                  : 'A passionate team of experts transforming digital ambitions into measurable success.'}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#C9A86C]" />
                  <span className="text-white">{language === 'FR' ? 'Top 10 Agences RD Congo' : 'Top 10 DR Congo Agencies'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#C9A86C]" />
                  <span className="text-white">20+ {language === 'FR' ? 'Experts' : 'Experts'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe2 className="w-6 h-6 text-[#C9A86C]" />
                  <span className="text-white">3 {language === 'FR' ? 'Bureaux' : 'Offices'}</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="relative cursor-pointer"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <motion.img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69260002cce4fa45e27a5d57/411ca2a35_travail.jpg"
                  alt="Team"
                  className="w-full transition-transform duration-700"
                  whileHover={{ scale: 1.05 }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-3xl" 
                  style={{
                    boxShadow: 'inset 0 0 60px 30px rgba(10, 10, 11, 0.4)'
                  }}
                  whileHover={{
                    boxShadow: 'inset 0 0 80px 40px rgba(201, 168, 108, 0.2)'
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-4"
            >
              {language === 'FR' ? 'Nos valeurs' : 'Our Values'}
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'FR' 
                ? 'Les principes qui guident chacune de nos actions et décisions.'
                : 'The principles that guide each of our actions and decisions.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#C9A86C]/10 flex items-center justify-center mb-6">
                  <value.icon className="w-8 h-8 text-[#C9A86C]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0B] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-4"
            >
              {language === 'FR' ? 'Notre histoire' : 'Our Story'}
            </motion.h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 hidden lg:block" />
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <Badge className="mb-2 bg-[#C9A86C] text-white border-0">{item.year}</Badge>
                    <h3 className="text-xl font-semibold text-[#0A0A0B] mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-[#0A0A0B] relative z-10 hidden lg:block" />
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-4"
            >
              {language === 'FR' ? 'Notre équipe' : 'Our Team'}
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'FR' 
                ? 'Des experts passionnés qui donnent vie à vos projets.'
                : 'Passionate experts who bring your projects to life.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="cursor-pointer max-w-[250px] mx-auto"
              >
                <motion.div 
                  className="relative overflow-hidden rounded-2xl mb-4 shadow-lg group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[306px] object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-[#C9A86C]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
                <h3 className="text-xl font-semibold text-[#0A0A0B]">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A86C]/10 mb-6"
          >
            <Heart className="w-4 h-4 text-[#C9A86C]" />
            <span className="text-sm font-medium text-[#0A0A0B]">
              {language === 'FR' ? 'Rejoignez l\'aventure' : 'Join the Adventure'}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-6"
          >
            {language === 'FR' ? 'Envie de faire partie de l\'équipe ?' : 'Want to be part of the team?'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            {language === 'FR' 
              ? 'Nous sommes toujours à la recherche de talents passionnés pour rejoindre notre équipe.'
              : 'We are always looking for passionate talents to join our team.'}
          </motion.p>
          
          <Link to={createPageUrl('Contact')}>
            <Button className="rounded-full px-8 py-6 bg-[#0A0A0B] hover:bg-[#0A0A0B]/90 text-white text-lg">
              {language === 'FR' ? 'Voir nos offres' : 'See our offers'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
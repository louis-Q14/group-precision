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

const team = [
  {
    name: 'Alexandre Martin',
    position: 'CEO & Fondateur',
    bio: '15 ans d\'expérience en transformation digitale. Ancien directeur chez McKinsey Digital.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Sophie Dubois',
    position: 'Directrice Créative',
    bio: 'Designer primée avec 12 ans d\'expérience en branding et UX pour des marques internationales.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Thomas Chen',
    position: 'CTO',
    bio: 'Expert en architecture cloud et IA. Ancien tech lead chez Google Cloud.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Marie Laurent',
    position: 'Directrice Marketing',
    bio: 'Spécialiste growth marketing avec un track record de +200% de croissance pour ses clients.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    linkedin: '#',
    isLeadership: true,
  },
  {
    name: 'Pierre Bernard',
    position: 'Lead Developer',
    bio: 'Full-stack expert avec une passion pour les architectures scalables et performantes.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    linkedin: '#',
    isLeadership: false,
  },
  {
    name: 'Emma Richard',
    position: 'UX Designer Senior',
    bio: 'Spécialiste en recherche utilisateur et design d\'interfaces centrées sur l\'humain.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    linkedin: '#',
    isLeadership: false,
  },
];

const values = [
  {
    icon: Target,
    title: 'Excellence',
    description: 'Nous visons la perfection dans chaque détail, chaque ligne de code, chaque pixel.',
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Nous repoussons constamment les limites pour créer des solutions avant-gardistes.',
  },
  {
    icon: Handshake,
    title: 'Partenariat',
    description: 'Nous construisons des relations durables basées sur la confiance et la transparence.',
  },
  {
    icon: Leaf,
    title: 'Responsabilité',
    description: 'Nous nous engageons pour un numérique éthique et respectueux de l\'environnement.',
  },
];

const timeline = [
  { year: '2012', title: 'Fondation', description: 'Création de PRECISIONS par Alexandre Martin' },
  { year: '2015', title: 'Première levée', description: 'Série A de 5M€ pour accélérer notre croissance' },
  { year: '2018', title: 'Expansion', description: 'Ouverture de bureaux à Londres et Berlin' },
  { year: '2020', title: '100 collaborateurs', description: 'Cap symbolique franchi malgré la crise' },
  { year: '2023', title: 'Certification B Corp', description: 'Reconnaissance de l\'engagement RSE de PRECISIONS' },
  { year: '2024', title: 'Aujourd\'hui', description: '150+ projets, 45 experts, présence internationale' },
];

const certifications = [
  'Google Partner Premier',
  'Meta Business Partner',
  'HubSpot Solutions Partner',
  'AWS Advanced Partner',
  'Shopify Plus Partner',
];

export default function About() {
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
                <span className="text-sm text-white">À propos</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
              >
                Nous créons l'avenir digital
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-400 mb-8"
              >
                Une équipe passionnée d'experts qui transforme les ambitions digitales 
                en succès mesurables depuis plus de 12 ans.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-6"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#C9A86C]" />
                  <span className="text-white">Top 10 Agences France</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#C9A86C]" />
                  <span className="text-white">45+ Experts</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe2 className="w-6 h-6 text-[#C9A86C]" />
                  <span className="text-white">3 Bureaux</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team"
                className="rounded-3xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl">
                <div className="text-4xl font-bold text-[#0A0A0B]">12+</div>
                <div className="text-gray-600">Années d'expertise</div>
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
              Nos valeurs
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident chacune de nos actions et décisions.
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
              Notre histoire
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
              Notre équipe
            </motion.h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Des experts passionnés qui donnent vie à vos projets.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-[350px] object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm">{member.bio}</p>
                    <a href={member.linkedin} className="inline-flex items-center gap-2 text-[#C9A86C] text-sm mt-2 hover:underline">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-[#0A0A0B]">{member.name}</h3>
                <p className="text-gray-600">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-[#0A0A0B]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Certifications & Partenariats</h3>
              <p className="text-gray-400">Reconnus par les leaders de l'industrie</p>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {certifications.map((cert) => (
                <div key={cert} className="px-4 py-2 bg-white/5 rounded-full text-sm text-white">
                  {cert}
                </div>
              ))}
            </div>
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
            <span className="text-sm font-medium text-[#0A0A0B]">Rejoignez l'aventure</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-6"
          >
            Envie de faire partie de l'équipe ?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600 mb-8"
          >
            Nous sommes toujours à la recherche de talents passionnés pour rejoindre notre équipe.
          </motion.p>
          
          <Link to={createPageUrl('Contact')}>
            <Button className="rounded-full px-8 py-6 bg-[#0A0A0B] hover:bg-[#0A0A0B]/90 text-white text-lg">
              Voir nos offres
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
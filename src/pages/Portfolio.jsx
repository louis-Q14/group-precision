import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const projects = [
  {
    id: 1,
    title: 'HARCHIVE',
    client: 'HARCHIVE',
    category: 'web',
    industry: 'tech',
    description: 'Plateforme innovante visant à mettre en communication tous les acteurs de l\'éducation en République Démocratique du Congo et bien plus encore.',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    challenge: 'Connecter les différents acteurs du système éducatif congolais sur une plateforme unifiée.',
    solution: 'Développement d\'une plateforme collaborative permettant aux enseignants, élèves, parents et institutions de communiquer efficacement.',
    results: [
      { label: 'Utilisateurs', value: 'En cours' },
      { label: 'Universités', value: 'RDC' },
    ],
    testimonial: 'Une solution révolutionnaire pour l\'éducation en RDC.',
    testimonialAuthor: 'Équipe HARCHIVE',
    technologies: ['Web', 'Mobile', 'Cloud'],
    websiteUrl: 'https://www.harchive.net',
  },
  {
    id: 2,
    title: 'Terreau Fertile',
    client: 'Terreau Fertile',
    category: 'web',
    industry: 'other',
    description: 'Plateforme de soutien aux maraîchers facilitant l\'accès à la terre et au financement de court terme pour dynamiser l\'agriculture locale et promouvoir une production durable.',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop',
    challenge: 'Permettre aux maraîchers d\'accéder facilement à des terres cultivables et à des financements adaptés à leurs besoins.',
    solution: 'Création d\'une plateforme connectant les maraîchers aux propriétaires fonciers et aux institutions de microfinance pour des solutions de financement court terme.',
    results: [
      { label: 'Secteur', value: 'Agriculture' },
      { label: 'Impact', value: 'Durable' },
    ],
    testimonial: 'Une initiative qui transforme le quotidien des agriculteurs locaux.',
    testimonialAuthor: 'Équipe Terreau Fertile',
    technologies: ['Web', 'Fintech', 'AgriTech'],
  },
];

const categories = [
  { id: 'all', name: 'Tous les projets' },
  { id: 'web', name: 'Web' },
  { id: 'mobile', name: 'Mobile' },
  { id: 'branding', name: 'Branding' },
  { id: 'marketing', name: 'Marketing' },
];

const industries = [
  { id: 'all', name: 'Toutes industries' },
  { id: 'tech', name: 'Tech' },
  { id: 'finance', name: 'Finance' },
  { id: 'retail', name: 'Retail' },
  { id: 'healthcare', name: 'Santé' },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projects.filter(p => {
    const categoryMatch = activeCategory === 'all' || p.category === activeCategory;
    const industryMatch = activeIndustry === 'all' || p.industry === activeIndustry;
    return categoryMatch && industryMatch;
  });

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-[#0A0A0B] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C9A86C]/20 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#C9A86C]" />
            <span className="text-sm text-white">Portfolio</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Nos réalisations
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Découvrez les projets qui ont transformé nos clients et créé de la valeur durable.
          </motion.p>
        </div>
      </section>

      {/* Filters & Projects */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-[#0A0A0B] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustry(ind.id)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                    activeIndustry === ind.id
                      ? 'bg-[#C9A86C] text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {ind.name}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer group"
                >
                  <div className="relative h-[350px] rounded-2xl overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <Badge className="w-fit mb-3 bg-white/20 text-white border-0 backdrop-blur-sm">
                        {project.client}
                      </Badge>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex gap-4 mt-4">
                        {project.results.slice(0, 2).map((metric) => (
                          <div key={metric.label}>
                            <div className="text-lg font-bold text-[#C9A86C]">{metric.value}</div>
                            <div className="text-xs text-white/60">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ExternalLink className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <div>
              <div className="relative h-[300px]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="mb-3 bg-white/20 text-white border-0">
                    {selectedProject.client}
                  </Badge>
                  <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-lg text-gray-600 mb-8">{selectedProject.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-[#0A0A0B] mb-2">Le défi</h3>
                    <p className="text-gray-600">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0A0A0B] mb-2">Notre solution</h3>
                    <p className="text-gray-600">{selectedProject.solution}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {selectedProject.results.map((metric) => (
                    <div key={metric.label} className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#C9A86C]">{metric.value}</div>
                      <div className="text-sm text-gray-600">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-[#0A0A0B] rounded-2xl p-6 mb-8">
                  <p className="text-white italic mb-4">"{selectedProject.testimonial}"</p>
                  <p className="text-gray-400 text-sm">— {selectedProject.testimonialAuthor}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-gray-50">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {selectedProject.websiteUrl && (
                  <a 
                    href={selectedProject.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0B] text-white rounded-full hover:bg-[#0A0A0B]/90 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visiter le site
                  </a>
                )}
                </div>
                </div>
                )}
                </DialogContent>
                </Dialog>

      {/* CTA */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-[#0A0A0B] mb-6"
          >
            Votre projet pourrait être le prochain
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 mb-8"
          >
            Discutons de vos ambitions et voyons comment nous pouvons créer ensemble quelque chose d'exceptionnel.
          </motion.p>
          <Link to={createPageUrl('Contact')}>
            <Button className="rounded-full px-8 py-6 bg-[#0A0A0B] hover:bg-[#0A0A0B]/90 text-white text-lg">
              Démarrer votre projet
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
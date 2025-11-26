import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const projects = [
  {
    id: 1,
    title: 'Projet HARCHIVE',
    client: 'HARCHIVE',
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    metrics: [
      { value: '100%', label: 'Réussite' },
      { value: 'Livré', label: 'Statut' },
    ],
  },
  {
    id: 2,
    title: 'Fintech Revolution',
    client: 'NeoBank Corp',
    category: 'finance',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    metrics: [
      { value: '+340%', label: 'Croissance' },
      { value: '2.5M', label: 'Utilisateurs' },
    ],
  },
  {
    id: 2,
    title: 'E-Commerce Premium',
    client: 'Luxe Fashion',
    category: 'retail',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    metrics: [
      { value: '+180%', label: 'Conversions' },
      { value: '45%', label: 'Panier moyen' },
    ],
  },
  {
    id: 3,
    title: 'Plateforme SaaS',
    client: 'TechStart',
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
    metrics: [
      { value: '99.9%', label: 'Uptime' },
      { value: '50K+', label: 'Entreprises' },
    ],
  },
  {
    id: 4,
    title: 'App Santé',
    client: 'MedTech Plus',
    category: 'healthcare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
    metrics: [
      { value: '4.9★', label: 'App Store' },
      { value: '1M+', label: 'Downloads' },
    ],
  },
];

const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'tech', name: 'Tech' },
  { id: 'finance', name: 'Finance' },
  { id: 'retail', name: 'Retail' },
  { id: 'healthcare', name: 'Santé' },
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A0A0B]/5 mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#C9A86C]" />
              <span className="text-sm font-medium text-[#0A0A0B]">Portfolio</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0A0A0B] mb-4"
            >
              Nos réalisations
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-600"
            >
              Des projets qui ont transformé nos clients et leurs industries.
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
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
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={createPageUrl('Portfolio')}>
                  <div className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer">
                    {/* Image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <Badge className="w-fit mb-4 bg-white/20 text-white border-0 backdrop-blur-sm">
                        {project.client}
                      </Badge>
                      
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                        {project.title}
                      </h3>
                      
                      {/* Metrics */}
                      <div className="flex gap-6">
                        {project.metrics.map((metric) => (
                          <div key={metric.label}>
                            <div className="text-2xl font-bold text-[#C9A86C]">
                              {metric.value}
                            </div>
                            <div className="text-sm text-white/60">{metric.label}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Hover Arrow */}
                      <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to={createPageUrl('Portfolio')}>
            <Button 
              size="lg" 
              variant="outline"
              className="rounded-full px-8 border-2 border-[#0A0A0B] text-[#0A0A0B] hover:bg-[#0A0A0B] hover:text-white"
            >
              Voir tous les projets
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
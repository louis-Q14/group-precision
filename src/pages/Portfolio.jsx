import PageHero from '@/components/brand/PageHero';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Composant pour le carrousel d'images animé
function ImageCarousel({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return <img src={images[0]} alt={title} className="w-full h-full object-cover" />;
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} - ${currentIndex + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full object-cover absolute inset-0"
        />
      </AnimatePresence>
      {/* Indicateurs */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

const projects = [
  {
    id: 1,
    title: 'Harchive',
    client: 'Harchive',
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
    testimonialAuthor: 'Équipe Harchive',
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
    image: '/images/a9e794b0a_1.jpg',
    images: [
      '/images/a9e794b0a_1.jpg',
      '/images/69d2ef54e_2.jpg',
      '/images/9591f7424_3.jpg',
      '/images/a0341ecde_4.jpg',
      '/images/691026fba_5.jpg',
      '/images/5dc2bbcd3_6.jpg',
      '/images/cc67569f6_7.jpg',
      '/images/ac3c91785_8.jpg',
      '/images/2f9178cdf_9.jpg',
      '/images/486e5bc92_10.jpg',
      '/images/f40cb40cb_11.jpg',
    ],
    challenge: 'Permettre aux maraîchers d\'accéder facilement à des terres cultivables et à des financements adaptés à leurs besoins.',
    solution: 'Création d\'une plateforme connectant les maraîchers aux propriétaires fonciers et aux institutions de microfinance pour des solutions de financement court terme.',
    results: [
      { label: 'Secteur', value: 'Agriculture' },
      { label: 'Impact', value: 'Durable' },
    ],
    testimonial: 'Une initiative qui transforme le quotidien des agriculteurs locaux.',
    testimonialAuthor: 'Équipe Terreau Fertile',
    technologies: [],
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
      <PageHero
        title="Réalisations"
        lede="Des projets menés pour nos clients et pour le groupe, de la communication aux plateformes."
      />

      {/* Filters & Projects */}
      <section className="py-16">
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
                      ? 'bg-white/[0.04] border border-white/10 text-white'
                      : 'bg-white/[0.07] text-white/60 hover:bg-white/10'
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
                      ? 'bg-white/10 text-white'
                      : 'bg-white/[0.04] text-white/60 hover:bg-white/10'
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
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer group"
                >
                  <div className="relative h-[350px] rounded-2xl overflow-hidden">
                      {project.images ? (
                        <div className="w-full h-full transition-transform duration-700 group-hover:scale-110">
                          <ImageCarousel images={project.images} title={project.title} />
                        </div>
                      ) : (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    
                    <div className="on-dark absolute inset-0 p-6 flex flex-col justify-end">
                      <Badge className="w-fit mb-3 bg-white/20 text-white border-0 backdrop-blur-sm">
                        {project.client}
                      </Badge>
                      <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-white/70 text-sm line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex gap-4 mt-4">
                        {project.results.slice(0, 2).map((metric) => (
                          <div key={metric.label}>
                            <div className="text-lg font-semibold tracking-tight text-gold">{metric.value}</div>
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
                {selectedProject.images ? (
                  <ImageCarousel images={selectedProject.images} title={selectedProject.title} />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="mb-3 bg-white/20 text-white border-0">
                    {selectedProject.client}
                  </Badge>
                  <h2 className="text-3xl font-semibold tracking-tight text-white">{selectedProject.title}</h2>
                </div>
              </div>
              
              <div className="p-8">
                <p className="text-lg text-white/60 mb-8">{selectedProject.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Le défi</h3>
                    <p className="text-white/60">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Notre solution</h3>
                    <p className="text-white/60">{selectedProject.solution}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {selectedProject.results.map((metric) => (
                    <div key={metric.label} className="bg-white/[0.04] rounded-xl p-4 text-center">
                      <div className="text-2xl font-semibold tracking-tight text-gold">{metric.value}</div>
                      <div className="text-sm text-white/60">{metric.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 mb-8">
                  <p className="text-white italic mb-4">"{selectedProject.testimonial}"</p>
                  <p className="text-white/40 text-sm">— {selectedProject.testimonialAuthor}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="bg-white/[0.04]">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {selectedProject.websiteUrl && (
                  <a 
                    href={selectedProject.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/[0.04] border border-white/10 text-white rounded-full hover:bg-white/85 transition-colors"
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
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-6"
          >
            Votre projet pourrait être le prochain
          </motion.h2>
          <motion.p
            className="text-lg text-white/60 mb-8"
          >
            Discutons de vos ambitions et voyons comment nous pouvons créer ensemble quelque chose d'exceptionnel.
          </motion.p>
          <Link to={createPageUrl('Contact')}>
            <Button className="rounded-full px-8 py-6 bg-white text-black hover:bg-white/85 text-lg">
              Démarrer votre projet
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}

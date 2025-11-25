import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Sparkles, ArrowRight, Clock, User, Tag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const articles = [
  {
    id: 1,
    title: 'Les tendances UX/UI à suivre en 2024',
    slug: 'tendances-ux-ui-2024',
    excerpt: 'Découvrez les innovations design qui transforment l\'expérience utilisateur cette année. Du design émotionnel aux micro-interactions.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
    author: 'Sophie Dubois',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    category: 'insights',
    tags: ['Design', 'UX', 'Tendances'],
    readingTime: 8,
    publishedAt: new Date('2024-01-15'),
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Comment l\'IA révolutionne le marketing digital',
    slug: 'ia-marketing-digital',
    excerpt: 'L\'intelligence artificielle transforme les stratégies marketing. Personnalisation, automation et analyse prédictive au service de la croissance.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop',
    author: 'Marie Laurent',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    category: 'insights',
    tags: ['IA', 'Marketing', 'Innovation'],
    readingTime: 12,
    publishedAt: new Date('2024-01-10'),
    isFeatured: true,
  },
  {
    id: 3,
    title: 'Guide complet : React Server Components',
    slug: 'guide-react-server-components',
    excerpt: 'Tout ce que vous devez savoir sur les Server Components et comment ils améliorent les performances de vos applications React.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
    author: 'Thomas Chen',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    category: 'tutorials',
    tags: ['React', 'Development', 'Performance'],
    readingTime: 15,
    publishedAt: new Date('2024-01-05'),
    isFeatured: false,
  },
  {
    id: 4,
    title: 'Étude de cas : Transformation digitale NeoBank',
    slug: 'case-study-neobank',
    excerpt: 'Comment nous avons aidé NeoBank à augmenter son taux de conversion de 340% grâce à une refonte UX complète.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
    author: 'Alexandre Martin',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    category: 'case-study',
    tags: ['Case Study', 'Fintech', 'UX'],
    readingTime: 10,
    publishedAt: new Date('2024-01-01'),
    isFeatured: false,
  },
  {
    id: 5,
    title: 'SEO technique : Les fondamentaux pour 2024',
    slug: 'seo-technique-2024',
    excerpt: 'Core Web Vitals, structure des données et optimisation technique : le guide complet pour améliorer votre référencement.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=500&fit=crop',
    author: 'Marie Laurent',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    category: 'tutorials',
    tags: ['SEO', 'Marketing', 'Performance'],
    readingTime: 14,
    publishedAt: new Date('2023-12-20'),
    isFeatured: false,
  },
  {
    id: 6,
    title: 'PRECISIONS annonce sa certification B Corp',
    slug: 'certification-b-corp',
    excerpt: 'Une étape majeure dans notre engagement pour un numérique responsable et éthique.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop',
    author: 'Alexandre Martin',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    category: 'news',
    tags: ['RSE', 'Entreprise', 'Actualité'],
    readingTime: 5,
    publishedAt: new Date('2023-12-15'),
    isFeatured: false,
  },
];

const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'insights', name: 'Insights' },
  { id: 'tutorials', name: 'Tutoriels' },
  { id: 'news', name: 'Actualités' },
  { id: 'case-study', name: 'Études de cas' },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredArticles = articles.filter(a => a.isFeatured);
  
  const filteredArticles = articles.filter(a => {
    const categoryMatch = activeCategory === 'all' || a.category === activeCategory;
    const searchMatch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        a.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch && !a.isFeatured;
  });

  return (
    <main>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#0A0A0B] relative overflow-hidden">
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
            <span className="text-sm text-white">Blog & Ressources</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Insights & Expertise
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Articles, tutoriels et études de cas pour rester à la pointe du digital.
          </motion.p>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0A0A0B] mb-8">À la une</h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[300px] rounded-2xl overflow-hidden mb-6">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-[#C9A86C] text-white border-0">
                    {categories.find(c => c.id === article.category)?.name}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={article.authorImage}
                    alt={article.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium text-[#0A0A0B]">{article.author}</div>
                    <div className="text-sm text-gray-500">
                      {format(article.publishedAt, 'd MMMM yyyy', { locale: fr })}
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    {article.readingTime} min
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-[#0A0A0B] mb-3 group-hover:text-[#C9A86C] transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-gray-600">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 bg-[#FAFAFA]">
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
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            
            <div className="relative w-full lg:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 w-full lg:w-[300px] rounded-full border-gray-200"
              />
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-white/90 text-[#0A0A0B] border-0">
                    {categories.find(c => c.id === article.category)?.name}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4 text-sm text-gray-500">
                    <span>{format(article.publishedAt, 'd MMM yyyy', { locale: fr })}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.readingTime} min
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#0A0A0B] mb-3 group-hover:text-[#C9A86C] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{article.excerpt}</p>
                  
                  <div className="flex items-center gap-3">
                    <img
                      src={article.authorImage}
                      alt={article.author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-[#0A0A0B]">{article.author}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Aucun article trouvé pour cette recherche.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-[#0A0A0B]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-white mb-6"
          >
            Restez informé
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 mb-8"
          >
            Recevez nos derniers articles et ressources directement dans votre boîte mail.
          </motion.p>
          
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Votre email"
              className="flex-1 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl px-6"
            />
            <Button className="h-14 px-8 bg-[#C9A86C] hover:bg-[#B8975B] text-[#0A0A0B] rounded-xl">
              S'abonner
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
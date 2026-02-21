import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { Sparkles, ArrowRight, Clock, User, Tag, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageContext';

const articles = [];

const getCategories = (language) => [
  { id: 'all', name: language === 'FR' ? 'Tous' : 'All' },
  { id: 'insights', name: 'Insights' },
  { id: 'tutorials', name: language === 'FR' ? 'Tutoriels' : 'Tutorials' },
  { id: 'news', name: language === 'FR' ? 'Actualités' : 'News' },
  { id: 'case-study', name: language === 'FR' ? 'Études de cas' : 'Case Studies' },
];

export default function Blog() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = getCategories(language);
  const dateLocale = language === 'FR' ? fr : enUS;

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
            {language === 'FR' 
              ? 'Articles, tutoriels et études de cas pour rester à la pointe du digital.'
              : 'Articles, tutorials and case studies to stay at the cutting edge of digital.'}
          </motion.p>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0A0A0B] mb-8">
            {language === 'FR' ? 'À la une' : 'Featured'}
          </h2>
          
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
                      {format(article.publishedAt, 'd MMMM yyyy', { locale: dateLocale })}
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
                placeholder={language === 'FR' ? 'Rechercher un article...' : 'Search an article...'}
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
                    <span>{format(article.publishedAt, 'd MMM yyyy', { locale: dateLocale })}</span>
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
              <p className="text-gray-500 text-lg">
                {language === 'FR' ? 'Aucun article trouvé pour cette recherche.' : 'No articles found for this search.'}
              </p>
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
            {language === 'FR' ? 'Restez informé' : 'Stay Informed'}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400 mb-8"
          >
            {language === 'FR' 
              ? 'Recevez nos derniers articles et ressources directement dans votre boîte mail.'
              : 'Receive our latest articles and resources directly in your inbox.'}
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
              placeholder={language === 'FR' ? 'Votre email' : 'Your email'}
              className="flex-1 h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl px-6"
            />
            <Button className="h-14 px-8 bg-[#C9A86C] hover:bg-[#B8975B] text-[#0A0A0B] rounded-xl">
              {language === 'FR' ? 'S\'abonner' : 'Subscribe'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.form>
        </div>
      </section>
    </main>
  );
}
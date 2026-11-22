import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/components/LanguageContext';
import usePublicEntity from '@/hooks/usePublicEntity';
import PageHero from '@/components/brand/PageHero';

const getCategories = (language) => [
  { id: 'all', name: language === 'FR' ? 'Tous' : 'All' },
  { id: 'insights', name: 'Insights' },
  { id: 'tutorials', name: language === 'FR' ? 'Tutoriels' : 'Tutorials' },
  { id: 'news', name: language === 'FR' ? 'Actualités' : 'News' },
  { id: 'case-study', name: language === 'FR' ? 'Études de cas' : 'Case Studies' },
];

// Fiche BlogPost (Admin) -> objet utilisé par la page
const toArticle = (post) => ({
  id: post.id,
  slug: post.slug || post.id,
  title: post.title ?? '',
  excerpt: post.excerpt ?? '',
  content: post.content ?? '',
  coverImage: post.cover_image,
  author: post.author,
  category: post.category,
  tags: post.tags ?? [],
  readingTime: post.reading_time,
  isFeatured: Boolean(post.is_featured),
  publishedAt: post.created_at ? new Date(post.created_at) : null,
});

const formatDate = (date, pattern, locale) =>
  date && !Number.isNaN(date.getTime()) ? format(date, pattern, { locale }) : '';

// Rendu Markdown sans plugin de typographie : styles posés élément par élément.
// react-markdown n'interprète pas le HTML brut, le contenu reste donc sûr.
const markdownComponents = {
  h1: (props) => <h2 className="text-3xl font-semibold tracking-tight text-white mt-10 mb-4" {...props} />,
  h2: (props) => <h2 className="text-2xl font-semibold tracking-tight text-white mt-10 mb-4" {...props} />,
  h3: (props) => <h3 className="text-xl font-semibold text-white mt-8 mb-3" {...props} />,
  p: (props) => <p className="text-lg text-white/75 leading-relaxed mb-5" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 mb-5 space-y-2 text-lg text-white/75" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 mb-5 space-y-2 text-lg text-white/75" {...props} />,
  a: (props) => <a className="text-gold underline hover:no-underline" target="_blank" rel="noopener noreferrer" {...props} />,
  blockquote: (props) => <blockquote className="border-l-4 border-white/30 pl-4 italic text-white/60 my-6" {...props} />,
  code: (props) => <code className="bg-white/[0.07] rounded px-1.5 py-0.5 text-sm" {...props} />,
  pre: (props) => <pre className="bg-white/[0.04] border border-white/10 text-gray-100 rounded-xl p-4 overflow-x-auto my-6 text-sm" {...props} />,
  img: ({ alt, ...props }) => <img alt={alt ?? ''} className="rounded-xl my-6 w-full" {...props} />,
};

function CoverImage({ article, className }) {
  if (article.coverImage) {
    return <img src={article.coverImage} alt={article.title} className={className} />;
  }
  // Article sans image : aplat bleu nuit avec le logo
  return (
    <div className={`${className} bg-white/[0.04] border border-white/10 relative overflow-hidden`} aria-hidden="true">
      <img src="/images/precision-logo.png" alt="" className="absolute inset-0 m-auto w-1/2 invert opacity-80" />
    </div>
  );
}

function ArticleView({ article, categories, dateLocale, language }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.id]);

  return (
    <main>
      <section className="pt-14 pb-12 border-y border-white/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link to={{ search: '' }} className="inline-flex items-center gap-2 text-white/40 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" />
            {language === 'FR' ? 'Tous les articles' : 'All articles'}
          </Link>
          {article.category && (
            <Badge className="bg-white/10 text-white border-0 mb-4">
              {categories.find((c) => c.id === article.category)?.name}
            </Badge>
          )}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/40">
            {article.author && <span>{article.author}</span>}
            {article.publishedAt && <span>{formatDate(article.publishedAt, 'd MMMM yyyy', dateLocale)}</span>}
            {article.readingTime && (
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{article.readingTime} min</span>
            )}
          </div>
        </div>
      </section>

      <article className="py-12 bg-white/[0.04] border border-white/10">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {article.coverImage && (
            <img src={article.coverImage} alt={article.title} className="w-full rounded-2xl mb-10 max-h-[420px] object-cover" />
          )}
          <ReactMarkdown components={markdownComponents}>{article.content}</ReactMarkdown>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-white/60">{tag}</Badge>
              ))}
            </div>
          )}
        </div>
      </article>
    </main>
  );
}

export default function Blog() {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Seuls les articles marqués « Publié » dans l'Admin sont affichés
  const { items: posts, isLoading } = usePublicEntity('BlogPost', { filter: { is_published: true } });
  const articles = posts.map(toArticle);

  const categories = getCategories(language);
  const dateLocale = language === 'FR' ? fr : enUS;

  const selectedSlug = searchParams.get('article');
  const selectedArticle = selectedSlug ? articles.find((a) => a.slug === selectedSlug) : null;

  if (selectedArticle) {
    return <ArticleView article={selectedArticle} categories={categories} dateLocale={dateLocale} language={language} />;
  }

  const query = searchQuery.trim().toLowerCase();
  const isFiltering = activeCategory !== 'all' || query !== '';
  const featuredArticles = articles.filter((a) => a.isFeatured);

  const filteredArticles = articles.filter((a) => {
    const categoryMatch = activeCategory === 'all' || a.category === activeCategory;
    const searchMatch = !query ||
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.tags.some((tag) => tag.toLowerCase().includes(query));
    // Sans filtre, les articles « À la une » sont déjà affichés au-dessus
    return categoryMatch && searchMatch && (isFiltering || !a.isFeatured);
  });

  const articleLink = (article) => ({ search: `?article=${encodeURIComponent(article.slug)}` });

  return (
    <main>
      <PageHero
        title="Blog"
        lede={language === 'FR'
          ? 'Analyses, guides pratiques et études de cas sur la communication, le financement et le numérique en RD Congo.'
          : 'Analysis, practical guides and case studies on communication, financing and digital in the DR Congo.'}
      />

      {/* Featured Articles */}
      {!isFiltering && featuredArticles.length > 0 && (
        <section className="py-16 border-b">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <h2 className="text-2xl font-semibold tracking-tight text-white mb-8">
              {language === 'FR' ? 'À la une' : 'Featured'}
            </h2>

            <div className="grid lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  className="group"
                >
                  <Link to={articleLink(article)} className="block">
                    <div className="relative h-[300px] rounded-2xl overflow-hidden mb-6">
                      <CoverImage
                        article={article}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {article.category && (
                        <Badge className="absolute top-4 left-4 bg-white/10 text-white border-0">
                          {categories.find((c) => c.id === article.category)?.name}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div>
                        {article.author && <div className="font-medium text-white">{article.author}</div>}
                        <div className="text-sm text-white/50">
                          {formatDate(article.publishedAt, 'd MMMM yyyy', dateLocale)}
                        </div>
                      </div>
                      {article.readingTime && (
                        <div className="ml-auto flex items-center gap-1 text-sm text-white/50">
                          <Clock className="w-4 h-4" />
                          {article.readingTime} min
                        </div>
                      )}
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight text-white mb-3 group-hover:text-white transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && <p className="text-white/60 mb-4">{article.excerpt}</p>}
                  </Link>

                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-white/60">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
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
                      : 'bg-white/[0.04] border border-white/10 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <Input
                type="search"
                placeholder={language === 'FR' ? 'Rechercher un article...' : 'Search an article...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 w-full lg:w-[300px] rounded-full border-white/10"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white/30" />
            </div>
          ) : (
            <>
              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <motion.article
                    key={article.id}
                    className="group bg-white/[0.04] border border-white/10 rounded-2xl overflow-hidden border border-white/10 hover:shadow-xl transition-all duration-300"
                  >
                    <Link to={articleLink(article)} className="block">
                      <div className="relative h-[200px] overflow-hidden">
                        <CoverImage
                          article={article}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {article.category && (
                          <Badge className="absolute top-4 left-4 bg-black/70 backdrop-blur text-white border-0">
                            {categories.find((c) => c.id === article.category)?.name}
                          </Badge>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-4 text-sm text-white/50">
                          <span>{formatDate(article.publishedAt, 'd MMM yyyy', dateLocale)}</span>
                          {article.readingTime && (
                            <>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {article.readingTime} min
                              </span>
                            </>
                          )}
                        </div>

                        <h3 className="text-xl font-semibold tracking-tight text-white mb-3 group-hover:text-white transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        {article.excerpt && <p className="text-white/60 text-sm mb-4 line-clamp-2">{article.excerpt}</p>}

                        {article.author && (
                          <span className="text-sm font-medium text-white">{article.author}</span>
                        )}
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-white/50 text-lg">
                    {articles.length === 0
                      ? (language === 'FR' ? 'Les premiers articles arrivent bientôt.' : 'First articles coming soon.')
                      : isFiltering
                        ? (language === 'FR' ? 'Aucun article trouvé pour cette recherche.' : 'No articles found for this search.')
                        : null}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {/* Inscription aux publications : formulaire du pied de page */}
    </main>
  );
}

import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { createPageUrl } from '@/utils';
import { useLanguage } from '@/components/LanguageContext';
import usePublicEntity from '@/hooks/usePublicEntity';

/**
 * Trois dernières actualités publiées (articles du blog).
 * La section n'apparaît pas tant qu'aucun article n'est publié.
 */
export default function NewsSection() {
  const { language } = useLanguage();
  const { items } = usePublicEntity('BlogPost', { filter: { is_published: true } });
  const posts = items.slice(0, 3);

  if (posts.length === 0) return null;

  const locale = language === 'FR' ? fr : enUS;
  const blogUrl = createPageUrl('Blog');

  return (
    <section className="bg-black text-white py-24 lg:py-32 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-display font-semibold text-gradient">{language === 'FR' ? 'Actualités' : 'News'}</h2>
          </div>
          <Link to={blogUrl} className="text-white/80 underline underline-offset-4 hover:text-white">
            {language === 'FR' ? 'Toutes les actualités' : 'All news'}
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="group">
              <Link to={{ pathname: blogUrl, search: `?article=${encodeURIComponent(post.slug || post.id)}` }} className="block">
                <div className="aspect-[16/10] rounded-2xl border border-white/10 bg-neutral-900 overflow-hidden">
                  {post.cover_image ? (
                    <img src={post.cover_image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <img src="/images/97a9c9cc7_PRECISIONS_logo.png" alt="" className="w-1/2 invert opacity-40" />
                    </div>
                  )}
                </div>
                {post.created_at && (
                  <time dateTime={post.created_at} className="mt-5 block text-sm text-white/50">
                    {format(new Date(post.created_at), 'd MMMM yyyy', { locale })}
                  </time>
                )}
                <h3 className="mt-2 text-xl font-semibold tracking-tight group-hover:underline underline-offset-4">{post.title}</h3>
                {post.excerpt && <p className="mt-3 text-white/60 line-clamp-3">{post.excerpt}</p>}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

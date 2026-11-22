import { requireSupabase } from '@/lib/supabase';

/**
 * Accès aux tables Supabase avec une interface simple, par entité :
 *
 *   db.Lead.list('-created_at')                 // tri : '-col' = décroissant, 'col' = croissant
 *   db.BlogPost.filter({ is_published: true })  // égalité sur un ou plusieurs champs
 *   db.Project.create({ ... })                  // insère et renvoie la ligne créée (Admin)
 *   db.Lead.submit({ ... })                     // insère sans relire la ligne (visiteurs anonymes)
 *   db.Project.update(id, { ... })
 *   db.Project.delete(id)
 *
 * Les droits sont appliqués côté base par les règles RLS (supabase/migrations) :
 * un visiteur peut seulement envoyer un lead ou un témoignage et lire le contenu publié.
 */
export const TABLES = {
  Lead: 'leads',
  Project: 'projects',
  Service: 'services',
  BlogPost: 'blog_posts',
  Testimonial: 'testimonials',
  TeamMember: 'team_members',
  FAQ: 'faqs',
};

const from = (entity) => requireSupabase().from(TABLES[entity]);

const withSort = (query, sort = '-created_at') => {
  const descending = sort.startsWith('-');
  return query.order(sort.replace(/^-/, ''), { ascending: !descending });
};

async function run(query) {
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

function entityApi(entity) {
  return {
    list: (sort) => run(withSort(from(entity).select('*'), sort)),
    filter: (match, sort) => run(withSort(from(entity).select('*').match(match), sort)),
    create: (values) => run(from(entity).insert(values).select().single()),
    // Les visiteurs n'ont pas le droit de relire les tables privées (leads) :
    // on insère sans demander la ligne en retour.
    submit: (values) => run(from(entity).insert(values)),
    update: (id, values) => run(from(entity).update(values).eq('id', id).select().single()),
    delete: (id) => run(from(entity).delete().eq('id', id)),
  };
}

export const db = Object.fromEntries(Object.keys(TABLES).map((entity) => [entity, entityApi(entity)]));

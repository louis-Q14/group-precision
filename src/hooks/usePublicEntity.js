import { useQuery } from '@tanstack/react-query';
import { db } from '@/api/db';
import { isSupabaseConfigured } from '@/lib/supabase';

const byDisplayOrder = (a, b) => {
  const ao = typeof a.display_order === 'number' ? a.display_order : Infinity;
  const bo = typeof b.display_order === 'number' ? b.display_order : Infinity;
  return ao - bo;
};

/**
 * Lit une table Supabase pour une page publique.
 *
 * - `filter`      : critères d'égalité (ex. { is_published: true })
 * - `sortByOrder` : trie par `display_order` (croissant), sinon du plus récent au plus ancien
 * - `fallback`    : contenu affiché si la base est vide, inaccessible ou non configurée,
 *                   pour que la page ne soit jamais vide tant que l'Admin n'a pas été rempli
 *
 * Retourne { items, isLoading, isError, fromDatabase }.
 * Pendant le chargement, `items` est vide (pas de clignotement entre repli et données).
 */
export default function usePublicEntity(entity, { filter, sortByOrder = false, fallback } = {}) {
  const query = useQuery({
    queryKey: ['public', entity, filter ?? null],
    queryFn: () => {
      const api = db[entity];
      return filter ? api.filter(filter, '-created_at') : api.list('-created_at');
    },
    staleTime: 5 * 60 * 1000,
    // Sans Supabase configuré, aucune requête : le contenu par défaut s'affiche directement
    enabled: isSupabaseConfigured,
  });

  if (query.isLoading) {
    return { items: [], isLoading: true, isError: false, fromDatabase: false };
  }

  const rows = Array.isArray(query.data) ? query.data : [];
  if (rows.length > 0) {
    return {
      items: sortByOrder ? [...rows].sort(byDisplayOrder) : rows,
      isLoading: false,
      isError: false,
      fromDatabase: true,
    };
  }

  if (query.isError) console.error(`Lecture de ${entity} impossible :`, query.error);
  return { items: fallback ?? [], isLoading: false, isError: query.isError, fromDatabase: false };
}

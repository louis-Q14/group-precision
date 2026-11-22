import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * true quand le fichier .env contient l'URL et la clé publique Supabase.
 * Sans configuration, le site public reste fonctionnel (contenus par défaut),
 * seuls les formulaires et l'Admin sont indisponibles.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

if (!isSupabaseConfigured && import.meta.env.DEV) {
  console.warn(
    'Supabase non configuré : définissez VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env.local ' +
    '(voir README). Le site s’affiche avec ses contenus par défaut.'
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true },
    })
  : null;

export class SupabaseNotConfiguredError extends Error {
  constructor() {
    super('Service momentanément indisponible.');
    this.name = 'SupabaseNotConfiguredError';
  }
}

export function requireSupabase() {
  if (!supabase) throw new SupabaseNotConfiguredError();
  return supabase;
}

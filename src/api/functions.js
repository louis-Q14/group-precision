import { requireSupabase } from '@/lib/supabase';

const GENERIC_ERROR = 'Une erreur est survenue. Veuillez réessayer.';

/** Erreur renvoyée par une Edge Function, avec un message affichable au visiteur. */
export class FunctionError extends Error {
  constructor(message) {
    super(message || GENERIC_ERROR);
    this.name = 'FunctionError';
  }
}

/**
 * Appelle une Edge Function Supabase (dossier supabase/functions).
 * En cas d'échec, lève une FunctionError dont le message est celui renvoyé par la fonction
 * (ex. « Adresse email invalide »), ou un message générique.
 */
export async function invokeFunction(name, body) {
  const { data, error } = await requireSupabase().functions.invoke(name, { body });

  if (error) {
    let message = GENERIC_ERROR;
    try {
      const payload = await error.context?.json?.();
      if (typeof payload?.error === 'string' && payload.error) message = payload.error;
    } catch {
      // réponse non JSON (réseau, délai dépassé…) : on garde le message générique
    }
    throw new FunctionError(message);
  }

  if (data?.success === false) {
    throw new FunctionError(data.error);
  }
  return data;
}

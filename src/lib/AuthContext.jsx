import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

/**
 * Session de l'administrateur (Supabase Auth, email + mot de passe).
 * Le site public n'exige aucune connexion : seul l'Admin s'en sert.
 *
 * isAdmin est calculé par la fonction SQL public.is_admin() (table public.admins),
 * c'est donc la base qui décide, pas le navigateur.
 */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  const refreshAdminFlag = useCallback(async (currentSession) => {
    if (!currentSession) {
      setIsAdmin(false);
      return;
    }
    const { data, error } = await supabase.rpc('is_admin');
    if (error) {
      console.error('Vérification du rôle admin impossible :', error);
      setIsAdmin(false);
    } else {
      setIsAdmin(Boolean(data));
    }
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;

    supabase.auth.getSession().then(async ({ data }) => {
      if (!active) return;
      setSession(data.session);
      await refreshAdminFlag(data.session);
      if (active) setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      // Pas d'appel Supabase directement dans ce callback (recommandation Supabase) :
      // on le diffère pour éviter un blocage.
      setTimeout(() => {
        if (active) refreshAdminFlag(newSession);
      }, 0);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [refreshAdminFlag]);

  const signIn = async (email, password) => {
    if (!supabase) throw new Error('Service momentanément indisponible.');
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setSession(data.session);
      await refreshAdminFlag(data.session);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user: session?.user ?? null,
        isAuthenticated: Boolean(session),
        isAdmin,
        isLoading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth doit être utilisé dans un AuthProvider');
  return context;
}

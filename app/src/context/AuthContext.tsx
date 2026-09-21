import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { requireSupabase, supabase } from '../../../lib/supabase';

export type User = { id: string; nome: string; email: string; tipo_pele?: string | null; tema: 'light' | 'dark'; notificacoes: boolean };
type AuthContextValue = {
  user: User | null; isLoading: boolean; isInitializing: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signUp: (nome: string, email: string, senha: string, tipoPele: string) => Promise<'authenticated' | 'verification_required'>;
  signOut: () => Promise<void>;
  updatePreferences: (preferences: { tema?: 'light' | 'dark'; notificacoes?: boolean }) => Promise<void>;
};
const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const message = (error: { message?: string } | null): string => error?.message ?? 'Não foi possível concluir a solicitação.';

async function profileFromSession(session: Session): Promise<User> {
  const { data, error } = await supabase.from('profiles').select('id, full_name, skin_type, theme_mode, notifications_enabled').eq('id', session.user.id).single();
  if (error || !data) throw new Error('Não foi possível carregar seu perfil. Tente entrar novamente.');
  return { id: data.id, nome: data.full_name, email: session.user.email ?? '', tipo_pele: data.skin_type, tema: data.theme_mode, notificacoes: data.notifications_enabled };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null); const [isLoading, setIsLoading] = useState(false); const [isInitializing, setIsInitializing] = useState(true);
  useEffect(() => {
    if (!process.env.EXPO_PUBLIC_SUPABASE_URL || !process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY) { setIsInitializing(false); return; }
    const loadSession = async (session: Session | null) => { try { setUser(session ? await profileFromSession(session) : null); } catch { setUser(null); } finally { setIsInitializing(false); } };
    supabase.auth.getSession().then(({ data }) => loadSession(data.session));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => { loadSession(session); });
    return () => listener.subscription.unsubscribe();
  }, []);
  const signIn = async (email: string, senha: string) => { requireSupabase(); setIsLoading(true); try { const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha }); if (error || !data.session) throw new Error(message(error)); setUser(await profileFromSession(data.session)); } finally { setIsLoading(false); } };
  const signUp = async (nome: string, email: string, senha: string, tipoPele: string) => { requireSupabase(); setIsLoading(true); try { const { data, error } = await supabase.auth.signUp({ email, password: senha, options: { data: { full_name: nome, skin_type: tipoPele } } }); if (error || !data.user) throw new Error(message(error)); if (!data.session) return 'verification_required' as const; setUser(await profileFromSession(data.session)); return 'authenticated' as const; } finally { setIsLoading(false); } };
  const signOut = async () => { requireSupabase(); const { error } = await supabase.auth.signOut(); if (error) throw new Error(message(error)); setUser(null); };
  const updatePreferences = async (preferences: { tema?: 'light' | 'dark'; notificacoes?: boolean }) => { if (!user) return; const update = { ...(preferences.tema ? { theme_mode: preferences.tema } : {}), ...(typeof preferences.notificacoes === 'boolean' ? { notifications_enabled: preferences.notificacoes } : {}) }; const { error } = await supabase.from('profiles').update(update).eq('id', user.id); if (error) throw new Error(message(error)); setUser(current => current ? { ...current, ...(preferences.tema ? { tema: preferences.tema } : {}), ...(typeof preferences.notificacoes === 'boolean' ? { notificacoes: preferences.notificacoes } : {}) } : null); };
  return <AuthContext.Provider value={{ user, isLoading, isInitializing, signIn, signUp, signOut, updatePreferences }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider'); return context; }

import { createContext, ReactNode, useContext, useState } from 'react';

export type User = {
  id: number;
  nome: string;
  email: string;
  tipo_pele?: string | null;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: (email: string, senha: string) => Promise<void>;
  signUp: (nome: string, email: string, senha: string, tipoPele: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2/divas-api').replace(/\/$/, '');

async function request(path: string, body: Record<string, string>) {
  let response: Response;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    response = await fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('A API demorou para responder. Confira se Apache e MySQL estão ligados.');
    }
    throw new Error('Não foi possível conectar ao servidor. Confira a URL da API.');
  } finally {
    clearTimeout(timeout);
  }

  const data = await response.json().catch(() => null);
  if (!data || typeof data !== 'object') {
    throw new Error('A API retornou uma resposta inválida. Confira a URL configurada.');
  }
  if (!response.ok || !data.success) {
    throw new Error(data.message ?? 'Não foi possível concluir a solicitação.');
  }
  return data;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const signIn = async (email: string, senha: string) => {
    setIsLoading(true);
    try {
      const data = await request('/login.php', { email, senha });
      setUser(data.user);
      setToken(data.token);
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (nome: string, email: string, senha: string, tipoPele: string) => {
    setIsLoading(true);
    try {
      const data = await request('/register.php', { nome, email, senha, tipo_pele: tipoPele });
      setUser(data.user);
      setToken(data.token);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return context;
}

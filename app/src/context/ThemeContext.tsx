import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryText: string;
  border: string;
  bannerBg: string;
  headerBg: string;
  subtle: string;
  accentSoft: string;
}

export const lightTheme: Theme = {
  mode: 'light',
  background: '#FFFFFF',
  surface: '#ffffff',
  text: '#30252A',
  textMuted: '#806671',
  primary: '#C74378',
  primaryText: '#ffffff',
  border: '#F0E6E9',
  bannerBg: '#FCEBF1',
  headerBg: '#FFFFFF',
  subtle: '#F8F3F5',
  accentSoft: '#FCEBF1',
};

export const darkTheme: Theme = {
  mode: 'dark',
  background: '#1a1014',
  surface: '#2a1820',
  text: '#f5e6ec',
  textMuted: '#b89aa6',
  primary: '#E91E63',
  primaryText: '#ffffff',
  border: '#3a2530',
  bannerBg: '#2a1820',
  headerBg: '#8a1144',
  subtle: '#24171C',
  accentSoft: '#321F28',
};

interface ThemeContextValue {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  const toggleTheme = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'));
  return (
    <ThemeContext.Provider value={{ theme, isDark: mode === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}

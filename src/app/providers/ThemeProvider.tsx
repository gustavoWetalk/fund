'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';

type Mode = 'light' | 'dark' | 'system';
interface ThemeContextType {
  mode: Mode;
  setMode: (m: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be inside ThemeProvider');
  return ctx;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('system');

  // carrega do localStorage
  useEffect(() => {
    const stored = localStorage.getItem('themeMode') as Mode | null;
    if (stored) setMode(stored);
  }, []);

  // persiste sempre que muda
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // calcula algoritmo do antd
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;
  const algorithm =
    mode === 'light'
      ? defaultAlgorithm
      : mode === 'dark'
      ? darkAlgorithm
      : window.matchMedia('(prefers-color-scheme: dark)').matches
      ? darkAlgorithm
      : defaultAlgorithm;

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ConfigProvider   theme={{
          algorithm,
          components: {
            Menu: {
              itemSelectedBg: '#9254de',
              itemSelectedColor: '#FFFFFF',
              itemHoverBg: '#b37feb',
              itemHoverColor: '#FFFFFF',
            },
          },
        }}>{children}</ConfigProvider>
    </ThemeContext.Provider>
  );
}

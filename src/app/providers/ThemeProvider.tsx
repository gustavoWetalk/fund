// src/app/providers/ThemeProvider.tsx
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import type { MappingAlgorithm } from 'antd/es/theme/interface';

type Mode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { defaultAlgorithm, darkAlgorithm } = antdTheme;

  const [mode, setMode] = useState<Mode>('system');
  const [algorithms, setAlgorithms] = useState<MappingAlgorithm[]>(
    // SSR e render inicial no cliente usam sempre light
    [defaultAlgorithm]
  );

  // 1) ao montar no cliente, lê do localStorage e calcula algoritmo
  useEffect(() => {
    const stored = localStorage.getItem('themeMode') as Mode | null;
    const initialMode = stored ?? 'system';
    setMode(initialMode);

    let chosenAlg: MappingAlgorithm;
    if (initialMode === 'light') {
      chosenAlg = defaultAlgorithm;
    } else if (initialMode === 'dark') {
      chosenAlg = darkAlgorithm;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      chosenAlg = prefersDark ? darkAlgorithm : defaultAlgorithm;
    }
    setAlgorithms([chosenAlg]);
  }, [defaultAlgorithm, darkAlgorithm]);

  // 2) sempre que `mode` mudar, persiste e recalcula
  useEffect(() => {
    localStorage.setItem('themeMode', mode);

    let chosenAlg: MappingAlgorithm;
    if (mode === 'light') {
      chosenAlg = defaultAlgorithm;
    } else if (mode === 'dark') {
      chosenAlg = darkAlgorithm;
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      chosenAlg = prefersDark ? darkAlgorithm : defaultAlgorithm;
    }
    setAlgorithms([chosenAlg]);
  }, [mode, defaultAlgorithm, darkAlgorithm]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ConfigProvider
        theme={{
          algorithm: algorithms,
          token: {
            colorPrimary: '#9254de',
            colorSuccess: '#54de92',
          },
          components: {
            Button: {
              borderRadius: 8,
            },
            Menu: {
              itemSelectedBg: '#9254de',
              itemSelectedColor: '#FFFFFF',
              itemHoverBg: '#b37feb',
              itemHoverColor: '#FFFFFF',
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

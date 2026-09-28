import { createContext } from 'react';

// Theme primitives only — no components, so Fast Refresh stays happy.
export const ThemeContext = createContext(null);

export const THEME_KEY = 'folio_theme_v1';

export const getSystemTheme = () =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

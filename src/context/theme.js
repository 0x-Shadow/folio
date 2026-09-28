import { createContext } from 'react';

// Theme primitives only — no components, so Fast Refresh stays happy.
// The provider is in ThemeContext.jsx, the hook in hooks/useTheme.js.
export const ThemeContext = createContext(null);

// The same key is read by the small script in index.html that sets the theme
// before the page first paints. If you change one, change both.
export const THEME_KEY = 'folio_theme_v1';

export const getSystemTheme = () =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

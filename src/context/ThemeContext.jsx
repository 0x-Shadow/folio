import { useCallback, useEffect, useState } from 'react';
import { read, write } from '../lib/storage';
import { ThemeContext, THEME_KEY, getSystemTheme } from './theme';

// How long the cross-fade runs for. Must stay in step with the transition
// lengths on `.theme-animating` in index.css.
const CROSSFADE_MS = 500;

const applyTheme = (theme, animate) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  if (animate) {
    root.classList.add('theme-animating');
    window.setTimeout(() => root.classList.remove('theme-animating'), CROSSFADE_MS);
  }
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => read(THEME_KEY, null) ?? getSystemTheme());

  useEffect(() => {
    applyTheme(theme, false);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!read(THEME_KEY, null)) setTheme(getSystemTheme());
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      write(THEME_KEY, next);
      applyTheme(next, true);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};

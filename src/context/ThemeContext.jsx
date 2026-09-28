import { useCallback, useEffect, useState } from 'react';
import { read, write } from '../lib/storage';
import { ThemeContext, THEME_KEY, getSystemTheme } from './theme';

const applyTheme = (theme, animate) => {
  const root = document.documentElement;
  root.setAttribute('data-theme', theme);
  if (animate) {
    root.classList.add('theme-animating');
    window.setTimeout(() => root.classList.remove('theme-animating'), 550);
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
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

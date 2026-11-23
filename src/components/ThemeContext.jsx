import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Thème du site public : « dark » (noir, par défaut) ou « light » (beige des cartes).
 * Le choix est mémorisé dans le navigateur ; index.html l'applique avant le premier rendu.
 */
const ThemeContext = createContext({ theme: 'dark', setTheme: () => {}, toggleTheme: () => {} });

const readTheme = () => {
  try {
    return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(readTheme);

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // stockage indisponible (navigation privée) : le choix vaut pour la session
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

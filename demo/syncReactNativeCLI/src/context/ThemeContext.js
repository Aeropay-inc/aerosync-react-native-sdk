import React, { createContext, useState, useContext } from 'react';
import { MD2LightTheme, MD2DarkTheme } from 'react-native-paper';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme(prev => !prev);

  const theme = isDarkTheme ? MD2DarkTheme : MD2LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

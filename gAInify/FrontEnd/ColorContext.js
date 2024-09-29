import React, { useState, createContext, useContext } from 'react';
import { lightTheme, darkTheme } from './colors'; // Adjust the path if necessary
// Create a ColorContext
const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };

  return (
    <ColorContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => useContext(ColorContext);

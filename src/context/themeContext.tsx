'use client'
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({
  theme: 'light',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (_theme: string) => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.add(savedTheme)
  }, []);

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.replace(theme, newTheme)
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


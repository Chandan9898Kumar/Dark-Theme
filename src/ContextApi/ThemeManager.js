import React, { useState, useEffect, useContext, createContext } from "react";

const ThemeContext = createContext();

/**
 * The `useThemeContext` function returns the current theme context using the `useContext` hook.
 * @returns The `useThemeContext` custom hook is being returned, which utilizes the `useContext` hook
 * to access the `ThemeContext`.
 */
export const useThemeContext = () => {
  return useContext(ThemeContext);
};

const ThemeManager = ({ children }) => {
  const [isThemeDark, setIsThemeDark] = useState(
    JSON.parse(localStorage.getItem("isThemeDark")) || false
  );

  localStorage.setItem("isThemeDark", JSON.stringify(isThemeDark));

  const toggleTheme = () => {
    setIsThemeDark(!isThemeDark);
  };

  const THEME = isThemeDark ? "dark" : "light";

  useEffect(() => {
    window.document.documentElement.setAttribute("data-theme", THEME);
  }, [THEME]);

  return (
    <>
      <ThemeContext.Provider value={{ isThemeDark, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};

export default ThemeManager;

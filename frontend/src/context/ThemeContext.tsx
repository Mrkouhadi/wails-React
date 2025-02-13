import { createContext, useContext, useEffect, useState } from "react";
import { SavePreferences, GetPreferences } from "../../wailsjs/go/main/App";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await GetPreferences();
        setTheme(preferences.theme || "light");
        document.documentElement.classList.toggle(
          "dark",
          preferences.theme === "dark"
        );
      } catch (error) {
        console.error("Error loading theme preferences:", error);
      }
    };
    loadPreferences();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    try {
      await SavePreferences({ language: "", theme: newTheme });
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

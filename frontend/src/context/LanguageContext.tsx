import { createContext, useContext, useEffect, useState } from "react";
import i18next from "i18next"; // ✅ Import directly
import { SavePreferences, GetPreferences } from "../../wailsjs/go/main/App";

type LanguageContextType = {
  language: string;
  changeLanguage: (lng: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>(i18next.language); // ✅ Get initial language from i18n

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await GetPreferences();
        const savedLanguage = preferences.language || "en"; // Default to English
        setLanguage(savedLanguage);
        i18next.changeLanguage(savedLanguage); // ✅ Corrected
      } catch (error) {
        console.error("Error loading language preferences:", error);
      }
    };
    loadPreferences();
  }, []);

  const changeLanguage = async (lng: string) => {
    try {
      setLanguage(lng);
      i18next.changeLanguage(lng); // ✅ Corrected
      await SavePreferences({ language: lng, theme: "" });
    } catch (error) {
      console.error("Error saving language preference:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

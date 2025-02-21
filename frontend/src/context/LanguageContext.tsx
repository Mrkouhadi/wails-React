import { createContext, useContext, useEffect, useState } from "react";
import i18next from "i18next";
import { SavePreferences, GetPreferences } from "../../wailsjs/go/main/App";
import { useToast } from "./ToastContext";

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
  const [language, setLanguage] = useState<string>(i18next.language);
  const { showToast } = useToast();
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await GetPreferences();
        setLanguage(preferences.language);
        i18next.changeLanguage(preferences.language);
      } catch (error) {
        showToast(
          "Error loading language preferences. ERROR:" + error,
          "error"
        );
      }
    };
    loadPreferences();
  }, []);

  const changeLanguage = async (lng: string) => {
    try {
      setLanguage(lng);
      i18next.changeLanguage(lng);
      await SavePreferences({ language: lng, theme: "" });
    } catch (error) {
      showToast("Error saving language preferences. ERROR:" + error, "error");
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

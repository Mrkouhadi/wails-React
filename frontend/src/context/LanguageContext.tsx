import { createContext, useContext, useEffect, useState } from "react";
import i18next from "i18next";
import { SavePreferences, GetPreferences } from "../../wailsjs/go/main/App";
import { LanguageModal } from "../components";

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
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await GetPreferences();
        if (!preferences.language) {
          // No language set, show the modal
          setShowLanguageModal(true);
        } else {
          // Language already set, update state
          setLanguage(preferences.language);
          i18next.changeLanguage(preferences.language);
        }
      } catch (error) {
        console.error("Error loading language preferences:", error);
      }
    };
    loadPreferences();
  }, []);

  const changeLanguage = async (lng: string) => {
    try {
      setLanguage(lng);
      i18next.changeLanguage(lng);
      await SavePreferences({ language: lng, theme: "" });
      // If the modal was open, close it after a language is chosen
      if (showLanguageModal) setShowLanguageModal(false);
    } catch (error) {
      console.error("Error saving language preference:", error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
      {showLanguageModal && <LanguageModal onLanguageSelect={changeLanguage} />}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};

import { useTranslation } from "react-i18next";
import { SavePreferences, GetPreferences } from "../../wailsjs/go/main/App";
import { useEffect } from "react";

const LanguageSwitcher = () => {
  const [_, i18n] = useTranslation("global");
  // Save preferences when the language changes
  const ChangeLanguageHandler = async (lng: string) => {
    try {
      i18n.changeLanguage(lng);
      await SavePreferences({ language: lng, theme: "" });
    } catch (error) {
      console.error("Error saving preferences:", error);
    }
  };
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await GetPreferences();
        i18n.changeLanguage(preferences.language);
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    };
    loadPreferences();
  }, []);

  return (
    <div className="flex items-center">
      <div className="p-1 bg-gray-100 shadow rounded-full min-w-32 flex items-center justify-center text-sm">
        <button
          className={`${
            i18n.language === "en" && "bg-gray-400 text-white"
          } h-8 w-16 p-1 duration-200 flex items-center justify-center rounded-full cursor-pointer`}
          onClick={() => ChangeLanguageHandler("en")}
        >
          English
        </button>
        <button
          className={`${
            i18n.language === "zh-CN" && "bg-gray-400 text-white"
          } h-8 w-16 duration-200 flex items-center justify-center rounded-full cursor-pointer`}
          onClick={() => ChangeLanguageHandler("zh-CN")}
        >
          中文
        </button>
        <button
          className={`${
            i18n.language === "fr" && "bg-gray-400 text-white"
          } h-8 w-16 duration-200 flex items-center justify-center rounded-full cursor-pointer`}
          onClick={() => ChangeLanguageHandler("fr")}
        >
          Français
        </button>
        <button
          className={`${
            i18n.language === "de" && "bg-gray-400 text-white"
          } h-8 w-16 duration-200 flex items-center justify-center rounded-full cursor-pointer`}
          onClick={() => ChangeLanguageHandler("de")}
        >
          Deutsch
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;

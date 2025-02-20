import { useLanguage } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center">
      <div className="p-1 bg-surface dark:bg-dark-surface text-dark-background dark:text-background shadow rounded-full min-w-32 flex items-center justify-center text-sm">
        {["en", "zh-CN", "fr", "de"].map((lng) => (
          <button
            key={lng}
            className={`${
              language === lng
                ? "bg-secondary dark:bg-secondary text-background dark:text-dark-background"
                : ""
            } h-8 w-16 p-1 duration-200 flex items-center justify-center rounded-full cursor-pointer`}
            onClick={() => changeLanguage(lng)}
          >
            {lng === "en"
              ? "English"
              : lng === "zh-CN"
              ? "中文"
              : lng === "fr"
              ? "Français"
              : "Deutsch"}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;

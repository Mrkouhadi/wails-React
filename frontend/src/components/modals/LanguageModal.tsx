import React, { useState } from "react";

type LanguageModalProps = {
  onLanguageSelect: (language: string) => void;
};

const languages = [
  { code: "en", label: "English" },
  { code: "zh-CN", label: "中文" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

const LanguageModal: React.FC<LanguageModalProps> = ({ onLanguageSelect }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

  const handleSelect = () => {
    onLanguageSelect(selectedLanguage);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-surface dark:bg-dark-surface bg-opacity-50">
      <div className="bg-background dark:bg-gray-800 rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4 text-text-primary dark:text-dark-text-primary text-center">
          Choose Your Language
        </h2>
        <div className="space-y-2 mb-6">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`w-full px-4 py-2 rounded-full text-sm transition-colors duration-200 border border-border
                ${
                  selectedLanguage === lang.code
                    ? "bg-primary text-background"
                    : "bg-background text-dark-background dark:bg-dark-background dark:text-background"
                }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleSelect}
          className="w-full py-2 bg-primary text-background rounded-full shadow hover:bg-accent transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default LanguageModal;

import { useEffect, useState } from "react";
import { SavePreferences, GetPreferences } from "../../wailsjs/go/main/App";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeToggler = () => {
  const [theme, setTheme] = useState<string>("");

  // Theme switcher handler
  const handleThemeSwitch = async (th: string) => {
    setTheme(th);
    try {
      // Save the updated theme to preferences file
      await SavePreferences({ language: "", theme: th });
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  // Load preferences (theme and language)
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const preferences = await GetPreferences();
        setTheme(preferences.theme); // Set theme based on saved preferences

        // Optionally, apply the theme to the document
        if (preferences.theme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    };
    loadPreferences();
  }, []);

  // Apply theme to the document when theme changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="p-1 bg-gray-100 shadow rounded-full w-32 flex items-center justify-center text-sm">
      <p
        onClick={() => handleThemeSwitch("dark")}
        className={`${
          theme === "dark" && "bg-gray-400 text-white"
        } h-8 w-16 duration-200 flex items-center justify-center rounded-full cursor-pointer`}
      >
        <MoonIcon className="h-6 w-6" />
      </p>
      <p
        onClick={() => handleThemeSwitch("light")}
        className={`${
          theme === "light" && "bg-gray-400 text-white"
        } h-8 w-16 duration-200 flex items-center justify-center rounded-full cursor-pointer`}
      >
        <SunIcon className="h-6 w-6" />
      </p>
    </div>
  );
};

export default ThemeToggler;

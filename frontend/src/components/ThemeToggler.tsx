import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";

const ThemeToggler = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-1 bg-gray-100 shadow rounded-full w-32 flex items-center justify-center text-sm">
      <p
        onClick={toggleTheme}
        className={`${
          theme === "dark" && "bg-gray-400 text-white"
        } h-8 w-16 duration-200 flex items-center justify-center rounded-full cursor-pointer`}
      >
        <MoonIcon className="h-6 w-6" />
      </p>
      <p
        onClick={toggleTheme}
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

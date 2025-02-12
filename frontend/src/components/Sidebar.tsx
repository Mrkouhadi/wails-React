import Logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CogIcon, HomeIcon } from "@heroicons/react/24/outline";

type Props = {};

const Sidebar = (props: Props) => {
  const [t] = useTranslation("global");

  const linkClasses =
    "flex flex-col items-center gap-1 text-[14px] hover:text-gray-200 group relative overflow-x-hidden hover:overflow-x-visible";
  const activeClasses = "bg-red-500 text-gray-200 rounded-full";

  return (
    <aside className="flex flex-col items-center justify-between bg-transparent">
      <img className="w-12 h-12 mb-8 rounded-full" src={Logo} alt="Logo" />
      <nav className="flex flex-col items-center gap-8 p-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          <div className="relative flex items-center justify-center">
            <div className="group">
              <div className="group-hover:bg-red-500 dark:text-white rounded-full p-2">
                <HomeIcon className="h-6 w-6 " />
              </div>
              <span className="z-50 absolute left-16 top-1/2 transform -translate-y-1/2 rounded-lg bg-gray-900 text-gray-200 dark:bg-gray-200 dark:text-gray-900 text-xs px-3 py-1 rounded-lgopacity-0 group-hover:opacity-100 transition-opacity w-max max-w-[150px]">
                {t("links.home")}
              </span>
            </div>
          </div>
        </NavLink>

        <NavLink
          to="/setting"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          <div className="relative flex items-center justify-center">
            <div className="group">
              <div className="group-hover:bg-red-500 dark:text-white rounded-full p-2">
                <CogIcon className="h-6 w-6" />
              </div>
              <span className="z-50 absolute left-16 top-1/2 transform -translate-y-1/2 rounded-lg bg-gray-900 text-gray-200 dark:bg-gray-200 dark:text-gray-900 text-xs px-3 py-1 rounded-lgopacity-0 group-hover:opacity-100 transition-opacity w-max max-w-[150px]">
                {t("links.setting")}
              </span>
            </div>
          </div>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;

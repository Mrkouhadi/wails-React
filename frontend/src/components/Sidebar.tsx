import Logo from "../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CogIcon, HomeIcon } from "@heroicons/react/24/outline";

type Props = {};

const Sidebar = (props: Props) => {
  const [t] = useTranslation("global");

  const linkClasses =
    "flex flex-col items-center gap-1 text-[14px] dark:text-background group relative overflow-x-hidden hover:overflow-x-visible";
  const activeClasses = "bg-primary text-background rounded-full";

  return (
    <aside className="flex flex-col items-center bg-surface dark:bg-dark-surface h-screen py-2">
      <img className="w-12 h-12 mb-8" src={Logo} alt="Logo" />
      <nav className="flex flex-col items-center gap-8 p-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? activeClasses : ""} ${linkClasses} `
          }
        >
          <div className="relative flex items-center justify-center">
            <div className="">
              <div className="p-2">
                <HomeIcon className="h-6 w-6" />
              </div>
              <span className="z-50 absolute left-16 top-1/2 transform -translate-y-1/2 rounded-lg bg-dark-background text-background dark:bg-background dark:text-dark-background text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity w-max max-w-[150px]">
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
            <div className="">
              <div className="p-2">
                <CogIcon className="h-6 w-6" />
              </div>
              <span className="z-50 absolute left-16 top-1/2 transform -translate-y-1/2 rounded-lg bg-dark-background text-background dark:bg-background dark:text-dark-background text-xs px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity w-max max-w-[150px]">
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

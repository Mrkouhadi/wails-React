import React from "react";
import App from "./App";
import "./assets/Globals.css";

// set up the locales of the app (Multi-language)
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import global_en from "./locales/en/global.json";
import global_fr from "./locales/fr/global.json";
import global_zh from "./locales/zh/global.json";
import global_de from "./locales/de/global.json";
i18next.init({
  interpolation: { escapeValue: true },
  lng: "en",
  resources: {
    en: { global: global_en },
    de: { global: global_de },
    fr: { global: global_fr },
    zh: { global: global_zh },
  },
});

// rendering the app
import ReactDOM from "react-dom/client";
import ContextProvider from "./context/ContextProvider";
ReactDOM.createRoot(
  document.getElementById("wails-root-ui") as HTMLElement
).render(
  <React.StrictMode>
    <ContextProvider>
      <I18nextProvider i18n={i18next}>
        <App />
      </I18nextProvider>
    </ContextProvider>
  </React.StrictMode>
);

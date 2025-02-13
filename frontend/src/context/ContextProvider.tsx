import React from "react";
import { ToastProvider } from "./ToastContext";
import { ThemeProvider } from "./ThemeContext";
import { LanguageProvider } from "./LanguageContext";

type Props = {
  children: React.ReactNode;
};

const ContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <ToastProvider>
      <LanguageProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </LanguageProvider>
    </ToastProvider>
  );
};

export default ContextProvider;

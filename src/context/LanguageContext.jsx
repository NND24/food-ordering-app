"use client";
import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext({ lang: "vi", setLang: () => {} });

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState("vi");

  useEffect(() => {
    const stored = localStorage.getItem("app_language") || "vi";
    setLangState(stored);
  }, []);

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem("app_language", newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

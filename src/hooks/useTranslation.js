"use client";
import { useLanguage } from "../context/LanguageContext";
import vi from "../locales/vi.json";
import en from "../locales/en.json";

const translations = { vi, en };

export const useTranslation = () => {
  const { lang, setLang } = useLanguage();

  const t = (key) => {
    const keys = key.split(".");
    let result = translations[lang] ?? translations["vi"];
    for (const k of keys) {
      if (result == null) return key;
      result = result[k];
    }
    return result ?? key;
  };

  return { t, lang, setLang };
};

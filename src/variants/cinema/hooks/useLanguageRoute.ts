import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { DEFAULT_LANGUAGE, isSupportedLanguage, type Language } from "@shared/i18n";

export function useLanguageRoute(): Language {
  const { lang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();
  const current: Language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;

  useEffect(() => {
    if (i18n.language !== current) {
      void i18n.changeLanguage(current);
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = current;
    }
  }, [current, i18n]);

  return current;
}

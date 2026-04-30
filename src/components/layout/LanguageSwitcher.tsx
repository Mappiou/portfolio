import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type Language } from "../../i18n";
import { sketchbook } from "../../styles/sketchbook";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const current = useLanguageRoute();
  const location = useLocation();

  function pathFor(lang: Language): string {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${lang}`;
    segments[0] = lang;
    return `/${segments.join("/")}`;
  }

  return (
    <nav
      aria-label={t("nav.language")}
      style={{ fontFamily: "Caveat, cursive" }}
      className="text-2xl flex gap-3 items-baseline"
    >
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isActive = lang === current;
        return (
          <Link
            key={lang}
            to={pathFor(lang)}
            aria-current={isActive ? "page" : undefined}
            aria-label={t(`language.${lang}`)}
            className={
              isActive
                ? "underline decoration-wavy decoration-2 underline-offset-4"
                : "opacity-50 hover:opacity-100 transition"
            }
            style={isActive ? { textDecorationColor: sketchbook.red } : undefined}
          >
            {t(`language.${lang}_short`).toLowerCase()}
          </Link>
        );
      })}
    </nav>
  );
}

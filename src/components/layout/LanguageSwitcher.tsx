import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type Language } from "../../i18n";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { palette } from "../../styles/palette";

type Theme = "light" | "dark";

type Props = {
  theme?: Theme;
};

export function LanguageSwitcher({ theme = "light" }: Props) {
  const { t } = useTranslation();
  const current = useLanguageRoute();
  const location = useLocation();

  function pathFor(lang: Language): string {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${lang}`;
    segments[0] = lang;
    return `/${segments.join("/")}${location.hash}`;
  }

  const colors =
    theme === "light"
      ? {
          bg: palette.white50,
          activeBg: "#FFFFFF",
          textActive: palette.textPrimary,
          textInactive: palette.textSecondary,
        }
      : {
          bg: "rgba(168,225,197,0.08)",
          activeBg: "rgba(168,225,197,0.18)",
          textActive: palette.textQuarterly,
          textInactive: "rgba(168,225,197,0.7)",
        };

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className="inline-flex rounded-full backdrop-blur-md text-xs font-medium"
      style={{
        background: colors.bg,
        padding: 4,
        boxShadow:
          theme === "light"
            ? "0 1px 0 rgba(255,255,255,0.4) inset, 0 2px 12px rgba(0,0,0,0.04)"
            : "0 1px 0 rgba(168,225,197,0.1) inset, 0 2px 12px rgba(0,0,0,0.2)",
      }}
    >
      {SUPPORTED_LANGUAGES.map((lang) => {
        const isActive = lang === current;
        return (
          <Link
            key={lang}
            to={pathFor(lang)}
            aria-current={isActive ? "page" : undefined}
            aria-label={t(`language.${lang}`)}
            className="rounded-full transition"
            style={{
              padding: "5px 12px",
              color: isActive ? colors.textActive : colors.textInactive,
              background: isActive ? colors.activeBg : "transparent",
              textDecoration: "none",
              fontWeight: isActive ? 600 : 500,
            }}
          >
            {t(`language.${lang}_short`)}
          </Link>
        );
      })}
    </div>
  );
}

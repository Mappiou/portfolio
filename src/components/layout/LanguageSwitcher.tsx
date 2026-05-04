import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type Language } from "../../i18n";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { palette } from "../../styles/palette";
import { FlagFor } from "../ui/FlagIcons";

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
          textActive: palette.textPrimary,
          textInactive: palette.textSecondary,
          shadow: "0 1px 0 rgba(255,255,255,0.4) inset, 0 2px 12px rgba(0,0,0,0.04)",
        }
      : {
          bg: "rgba(168,225,197,0.08)",
          textActive: palette.textQuarterly,
          textInactive: "rgba(168,225,197,0.7)",
          shadow: "0 1px 0 rgba(168,225,197,0.1) inset, 0 2px 12px rgba(0,0,0,0.2)",
        };

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className="inline-flex rounded-full backdrop-blur-md text-xs font-medium"
      style={{
        background: colors.bg,
        padding: 4,
        gap: 2,
        boxShadow: colors.shadow,
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
            className="relative inline-flex items-center justify-center rounded-full overflow-hidden transition"
            style={{
              padding: "5px 12px",
              color: isActive ? colors.textActive : colors.textInactive,
              textDecoration: "none",
              fontWeight: isActive ? 700 : 500,
              minWidth: 38,
              isolation: "isolate",
            }}
          >
            {/* Flag background */}
            <span
              aria-hidden="true"
              className="absolute inset-0 transition"
              style={{
                opacity: isActive ? 0.85 : 0.35,
                zIndex: 0,
              }}
            >
              <FlagFor lang={lang} className="block w-full h-full" />
            </span>
            {/* White scrim for text readability (on top of flag, behind text) */}
            <span
              aria-hidden="true"
              className="absolute inset-0 transition"
              style={{
                background: isActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.7)",
                zIndex: 1,
              }}
            />
            {/* Text label */}
            <span
              className="relative"
              style={{
                zIndex: 2,
                textShadow: isActive ? "0 1px 0 rgba(255,255,255,0.5)" : undefined,
              }}
            >
              {t(`language.${lang}_short`)}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

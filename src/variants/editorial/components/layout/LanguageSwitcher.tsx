import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type Language } from "@shared/i18n";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { palette, tokens } from "../../styles/palette";

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
          bg: "rgba(245,237,224,0.85)",
          textActive: palette.textPrimary,
          textInactive: palette.textSecondary,
          border: palette.hairline,
          activeBg: palette.cream,
        }
      : {
          bg: "rgba(31,26,20,0.55)",
          textActive: palette.cream,
          textInactive: "rgba(250,245,235,0.7)",
          border: "rgba(250,245,235,0.15)",
          activeBg: "rgba(184,92,58,0.18)",
        };

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className="inline-flex"
      style={{
        background: colors.bg,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: `1px solid ${colors.border}`,
        padding: 3,
        gap: 2,
        borderRadius: 999,
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
            className="inline-flex items-center justify-center transition"
            style={{
              padding: "5px 12px",
              minWidth: 38,
              color: isActive ? colors.textActive : colors.textInactive,
              background: isActive ? colors.activeBg : "transparent",
              textDecoration: "none",
              fontFamily: tokens.fontMono,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              fontWeight: isActive ? 500 : 400,
              borderRadius: 999,
              borderBottom: isActive ? `1px solid ${palette.teal}` : "1px solid transparent",
            }}
          >
            {t(`language.${lang}_short`)}
          </Link>
        );
      })}
    </div>
  );
}

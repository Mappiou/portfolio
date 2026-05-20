import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGUAGES, type Language } from "@shared/i18n";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { palette, tokens } from "../../styles/palette";

type Theme = "light" | "dark";

type Props = {
  theme?: Theme;
};

export function LanguageSwitcher({ theme = "dark" }: Props) {
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
        }
      : {
          bg: "rgba(14,13,11,0.55)",
          textActive: palette.teal,
          textInactive: "rgba(239,233,221,0.65)",
        };

  return (
    <div
      role="group"
      aria-label={t("nav.language")}
      className="inline-flex backdrop-blur-md"
      style={{
        background: colors.bg,
        padding: 4,
        gap: 2,
        border: "1px solid rgba(239,233,221,0.12)",
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
            className="inline-flex items-center justify-center transition hover:!text-[#D9A648]"
            style={{
              padding: "5px 12px",
              color: isActive ? colors.textActive : colors.textInactive,
              textDecoration: "none",
              fontFamily: tokens.fontMono,
              fontSize: 10,
              letterSpacing: "0.18em",
              fontWeight: isActive ? 500 : 400,
              minWidth: 38,
            }}
          >
            {t(`language.${lang}_short`)}
          </Link>
        );
      })}
    </div>
  );
}

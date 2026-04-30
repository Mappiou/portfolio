import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { palette } from "../../styles/palette";

type Theme = "light" | "dark";

type Props = {
  theme?: Theme;
};

export function PillNav({ theme = "light" }: Props) {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const location = useLocation();

  const home = `/${lang}`;
  const isHome = location.pathname === home || location.pathname === `${home}/`;

  const items = [
    { to: home, label: t("nav.home"), active: isHome },
    {
      to: `${home}#projects`,
      label: t("nav.projects"),
      active: location.hash === "#projects",
    },
    {
      to: `${home}#contact`,
      label: t("nav.contact"),
      active: location.hash === "#contact",
    },
  ];

  const colors =
    theme === "light"
      ? {
          bg: palette.white50,
          textPrimary: palette.textPrimary,
          textSecondary: palette.textSecondary,
          activeBg: "#FFFFFF",
        }
      : {
          bg: "rgba(168,225,197,0.08)",
          textPrimary: palette.textQuarterly,
          textSecondary: "rgba(168, 225, 197, 0.7)",
          activeBg: "rgba(168,225,197,0.18)",
        };

  return (
    <nav className="relative z-30 flex justify-center pt-6" aria-label={t("nav.home")}>
      <ul
        className="flex items-center rounded-full backdrop-blur-md"
        style={{
          background: colors.bg,
          padding: 10,
          gap: 4,
          listStyle: "none",
          boxShadow:
            theme === "light"
              ? "0 1px 0 rgba(255,255,255,0.4) inset, 0 4px 24px rgba(0,0,0,0.04)"
              : "0 1px 0 rgba(168,225,197,0.1) inset, 0 4px 24px rgba(0,0,0,0.2)",
          margin: 0,
        }}
      >
        {items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              aria-current={item.active ? "page" : undefined}
              className="rounded-full transition-all"
              style={{
                padding: "6px 18px",
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: 15,
                color: item.active ? colors.textPrimary : colors.textSecondary,
                background: item.active ? colors.activeBg : "transparent",
                fontWeight: item.active ? 600 : 500,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

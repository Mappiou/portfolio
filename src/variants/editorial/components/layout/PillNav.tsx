import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { palette, tokens } from "../../styles/palette";
import { VariantSwitchButton } from "./VariantSwitchButton";

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
          bg: "rgba(245,237,224,0.85)",
          textActive: palette.textPrimary,
          textInactive: palette.textSecondary,
          activeBorder: palette.teal,
          border: palette.hairline,
        }
      : {
          bg: "rgba(31,26,20,0.55)",
          textActive: palette.cream,
          textInactive: "rgba(250,245,235,0.7)",
          activeBorder: palette.teal,
          border: "rgba(250,245,235,0.15)",
        };

  return (
    <nav className="relative z-30 flex justify-center pt-7" aria-label={t("nav.home")}>
      <ul
        className="flex items-center"
        style={{
          background: colors.bg,
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: `1px solid ${colors.border}`,
          padding: "6px 10px",
          gap: 4,
          listStyle: "none",
          borderRadius: 999,
          margin: 0,
        }}
      >
        {items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              aria-current={item.active ? "page" : undefined}
              className="transition-all hover:text-[color:var(--terracotta)]"
              style={
                {
                  padding: "6px 14px",
                  fontFamily: tokens.fontMono,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: item.active ? colors.textActive : colors.textInactive,
                  background: "transparent",
                  fontWeight: item.active ? 500 : 400,
                  textDecoration: "none",
                  borderBottom: item.active
                    ? `1px solid ${colors.activeBorder}`
                    : `1px solid transparent`,
                  display: "inline-block",
                  "--terracotta": palette.teal,
                } as React.CSSProperties
              }
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li style={{ marginLeft: 8, listStyle: "none" }}>
          <VariantSwitchButton />
        </li>
      </ul>
    </nav>
  );
}

import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { palette, tokens } from "../../styles/palette";
import { VariantSwitchButton } from "./VariantSwitchButton";
import { VARIANT } from "../../lib/variant";
import { scrollToHashTarget } from "@shared/hooks/useHashScroll";
import type { MouseEvent } from "react";

type Theme = "light" | "dark";

type Props = {
  theme?: Theme;
};

export function PillNav({ theme = "dark" }: Props) {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const location = useLocation();

  const home = `/${VARIANT}/${lang}`;
  const isHome = location.pathname === home || location.pathname === `${home}/`;

  const handleHashClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) return;
    e.preventDefault();
    if (scrollToHashTarget(hash)) {
      window.history.pushState(null, "", `${location.pathname}${hash}`);
    }
  };

  const items = [
    { to: home, label: t("nav.home"), active: isHome && !location.hash },
    {
      to: `${home}#job-lincoln`,
      label: t("nav.experience"),
      active: location.hash === "#job-lincoln",
      hash: "#job-lincoln",
    },
    {
      to: `${home}#projects`,
      label: t("nav.projects"),
      active: location.hash === "#projects",
      hash: "#projects",
    },
    {
      to: `${home}#contact`,
      label: t("nav.contact"),
      active: location.hash === "#contact",
      hash: "#contact",
    },
  ];

  // Dark variant always per redesign brief; "light" mapping preserved for legacy usage
  const colors =
    theme === "light"
      ? {
          bg: palette.white50,
          textPrimary: palette.textPrimary,
          textSecondary: palette.textSecondary,
          activeBg: "rgba(239,233,221,0.12)",
        }
      : {
          bg: "rgba(14,13,11,0.55)",
          textPrimary: palette.textPrimary,
          textSecondary: "rgba(239,233,221,0.65)",
          activeBg: "rgba(217,166,72,0.18)",
        };

  return (
    <nav className="relative z-30 flex justify-center items-center gap-6 pt-6" aria-label={t("nav.home")}>
      <Link
        to="/"
        aria-label="Retour au choix de portfolio"
        style={{
          fontFamily: tokens.fontTitle,
          fontStyle: "italic",
          fontSize: 15,
          letterSpacing: "0.02em",
          color: colors.textSecondary,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
        className="transition-opacity hover:opacity-100 opacity-70"
      >
        Mathieu Diep
      </Link>
      <ul
        className="flex items-center backdrop-blur-md"
        style={{
          background: colors.bg,
          padding: 8,
          gap: 4,
          listStyle: "none",
          border: "1px solid rgba(239,233,221,0.12)",
          margin: 0,
        }}
      >
        {items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              onClick={item.hash ? (e) => handleHashClick(e, item.hash) : undefined}
              aria-current={item.active ? "page" : undefined}
              className="transition-all hover:!text-[#D9A648]"
              style={{
                padding: "6px 16px",
                fontFamily: tokens.fontMono,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: item.active ? palette.teal : colors.textSecondary,
                background: item.active ? colors.activeBg : "transparent",
                fontWeight: 400,
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <a
            href="/cv/Mathieu_Diep_CV.pdf"
            download="Mathieu_Diep_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-all hover:!text-[#D9A648]"
            style={{
              padding: "6px 16px",
              fontFamily: tokens.fontMono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: colors.textSecondary,
              background: "transparent",
              fontWeight: 400,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            {t("nav.cv", { defaultValue: "CV" })}
          </a>
        </li>
        <li style={{ marginLeft: 8, listStyle: "none" }}>
          <VariantSwitchButton />
        </li>
      </ul>
    </nav>
  );
}

import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { palette, tokens } from "../../styles/palette";
import { VARIANT } from "../../lib/variant";
import { scrollToHashTarget } from "@shared/hooks/useHashScroll";

type Item = {
  key: string;
  to: string;
  label: string;
  hash?: string;
  active: boolean;
  icon: ReactNode;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
};

const IconUp = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const IconClock = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const IconStack = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
  </svg>
);

const IconPaperPlane = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 2L11 13" />
    <path d="M22 2l-7 20-4-9-9-4z" />
  </svg>
);

export function SideDock() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const location = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);

  const home = `/${VARIANT}/${lang}`;
  const isHome = location.pathname === home || location.pathname === `${home}/`;

  const handleHashClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) return;
    e.preventDefault();
    if (scrollToHashTarget(hash)) {
      window.history.pushState(null, "", `${location.pathname}${hash}`);
    }
  };

  const handleUpClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash) {
      window.history.pushState(null, "", location.pathname);
    }
  };

  const items: Item[] = [
    {
      key: "top",
      to: home,
      label: t("nav.top", { defaultValue: "Haut" }),
      active: isHome && !location.hash,
      icon: IconUp,
      onClick: handleUpClick,
    },
    {
      key: "experience",
      to: `${home}#job-lincoln`,
      label: t("nav.experience"),
      hash: "#job-lincoln",
      active: location.hash === "#job-lincoln",
      icon: IconClock,
    },
    {
      key: "projects",
      to: `${home}#projects`,
      label: t("nav.projects"),
      hash: "#projects",
      active: location.hash === "#projects",
      icon: IconStack,
    },
    {
      key: "contact",
      to: `${home}#contact`,
      label: t("nav.contact"),
      hash: "#contact",
      active: location.hash === "#contact",
      icon: IconPaperPlane,
    },
  ];

  return (
    <nav
      role="navigation"
      aria-label={t("nav.sideDock", { defaultValue: "Navigation rapide" })}
      className="hidden md:flex flex-col"
      style={{
        position: "fixed",
        right: "clamp(12px, 1.5vw, 20px)",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 25,
        gap: 12,
      }}
    >
      {items.map((item) => {
        const isHovered = hovered === item.key;
        return (
          <div
            key={item.key}
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "flex-end" }}
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                right: "calc(100% + 10px)",
                top: "50%",
                transform: "translateY(-50%)",
                fontFamily: tokens.fontMono,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: palette.textPrimary,
                background: "rgba(250,245,235,0.92)",
                border: `1px solid ${palette.hairline}`,
                padding: "5px 9px",
                whiteSpace: "nowrap",
                opacity: isHovered ? 1 : 0,
                transition: "opacity 0.18s ease",
                pointerEvents: "none",
              }}
            >
              {item.label}
            </span>
            <Link
              to={item.to}
              onClick={
                item.onClick
                  ? item.onClick
                  : item.hash
                  ? (e) => handleHashClick(e, item.hash!)
                  : undefined
              }
              aria-label={item.label}
              aria-current={item.active ? "page" : undefined}
              onFocus={() => setHovered(item.key)}
              onBlur={() => setHovered(null)}
              className="transition-all"
              style={{
                width: 44,
                height: 44,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: tokens.radiusLg,
                background: item.active ? "rgba(139,111,71,0.14)" : "rgba(250,245,235,0.85)",
                border: `1px solid ${item.active ? palette.teal : palette.hairline}`,
                color: isHovered || item.active ? palette.teal : palette.textPrimary,
                textDecoration: "none",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              {item.icon}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}

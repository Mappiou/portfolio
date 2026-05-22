import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X, Download, ArrowLeftRight } from "lucide-react";
import { palette, tokens } from "../../styles/palette";
import { SUPPORTED_LANGUAGES, type Language } from "@shared/i18n";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { useVariantPreference } from "@shared/hooks/useVariantPreference";
import { scrollToHashTarget } from "@shared/hooks/useHashScroll";
import { VARIANT } from "../../lib/variant";

export function MobileHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const currentLang = useLanguageRoute();
  const { lang } = useParams<{ lang: string }>();
  const { set } = useVariantPreference();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const home = `/${VARIANT}/${currentLang}`;
  const isHome =
    location.pathname === home || location.pathname === `${home}/`;

  const navItems = [
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

  const handleHashClick = (e: MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (!isHome) return;
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => {
      if (scrollToHashTarget(hash)) {
        window.history.pushState(null, "", `${location.pathname}${hash}`);
      }
    }, 0);
  };

  function pathForLang(target: Language): string {
    const segments = location.pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${VARIANT}/${target}`;
    segments[0] = VARIANT;
    segments[1] = target;
    return `/${segments.join("/")}${location.hash}`;
  }

  const handleVariantSwitch = () => {
    const targetLang = lang ?? "fr";
    set({ variant: "cinema", lang: targetLang });
    navigate(`/cinema/${targetLang}`);
  };

  return (
    <>
      <div
        className="md:hidden flex items-center justify-between"
        style={{
          padding: "16px 20px",
          background: "rgba(245,237,224,0.92)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          borderBottom: `1px solid ${palette.hairline}`,
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <Link
          to="/"
          aria-label="Retour au choix de portfolio"
          style={{
            fontFamily: tokens.fontItalic,
            fontStyle: "italic",
            fontSize: 16,
            color: palette.textPrimary,
            textDecoration: "none",
            opacity: 0.9,
            display: "inline-flex",
            alignItems: "center",
            minHeight: 44,
            padding: "10px 4px",
          }}
        >
          Mathieu Diep
        </Link>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t("nav.home")}
          aria-expanded={open}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 44,
            height: 44,
            background: "transparent",
            color: palette.textPrimary,
            border: `1px solid ${palette.hairlineStrong}`,
            cursor: "pointer",
          }}
        >
          <Menu size={20} />
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-0"
          style={{
            background: palette.cream,
            zIndex: 60,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{
              padding: "16px 20px",
              borderBottom: `1px solid ${palette.hairline}`,
            }}
          >
            <span
              style={{
                fontFamily: tokens.fontMono,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: palette.teal,
              }}
            >
              Editorial
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                background: "transparent",
                color: palette.textPrimary,
                border: `1px solid ${palette.hairlineStrong}`,
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </div>

          <nav
            aria-label={t("nav.home")}
            style={{ padding: "24px 20px 12px" }}
          >
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {navItems.map((item) => (
                <li key={item.label} style={{ marginBottom: 4 }}>
                  <Link
                    to={item.to}
                    onClick={item.hash ? (e) => handleHashClick(e, item.hash) : undefined}
                    aria-current={item.active ? "page" : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      minHeight: 56,
                      padding: "14px 4px",
                      fontFamily: tokens.fontTitle,
                      fontStyle: "italic",
                      fontWeight: 400,
                      fontSize: 28,
                      letterSpacing: "-0.01em",
                      color: item.active ? palette.teal : palette.textPrimary,
                      textDecoration: "none",
                      borderBottom: `1px solid ${palette.hairline}`,
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li style={{ marginBottom: 4 }}>
                <a
                  href="/cv/Mathieu_Diep_CV.pdf"
                  download="Mathieu_Diep_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    minHeight: 56,
                    padding: "14px 4px",
                    fontFamily: tokens.fontTitle,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 28,
                    letterSpacing: "-0.01em",
                    color: palette.textPrimary,
                    textDecoration: "none",
                    borderBottom: `1px solid ${palette.hairline}`,
                  }}
                >
                  {t("nav.cv", { defaultValue: "CV" })}
                </a>
              </li>
              <li style={{ marginBottom: 4 }}>
                <a
                  href="/cv/Mathieu_Diep_CV.pdf"
                  download
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    minHeight: 56,
                    padding: "14px 4px",
                    fontFamily: tokens.fontTitle,
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: 28,
                    letterSpacing: "-0.01em",
                    color: palette.textPrimary,
                    textDecoration: "none",
                    borderBottom: `1px solid ${palette.hairline}`,
                  }}
                >
                  <Download size={20} aria-hidden="true" />
                  <span>{t("nav.downloadCv")}</span>
                </a>
              </li>
            </ul>
          </nav>

          <div style={{ padding: "20px" }}>
            <p
              style={{
                fontFamily: tokens.fontMono,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: palette.textSecondary,
                marginBottom: 12,
              }}
            >
              {t("nav.language")}
            </p>
            <div
              role="group"
              aria-label={t("nav.language")}
              style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
            >
              {SUPPORTED_LANGUAGES.map((l) => {
                const isActive = l === currentLang;
                return (
                  <Link
                    key={l}
                    to={pathForLang(l)}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={t(`language.${l}`)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 64,
                      minHeight: 44,
                      padding: "10px 18px",
                      fontFamily: tokens.fontMono,
                      fontSize: 12,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: isActive ? palette.teal : palette.textPrimary,
                      background: isActive
                        ? "rgba(139,111,71,0.12)"
                        : "transparent",
                      border: `1px solid ${
                        isActive ? palette.teal : palette.hairlineStrong
                      }`,
                      textDecoration: "none",
                      borderRadius: 4,
                    }}
                  >
                    {t(`language.${l}_short`)}
                  </Link>
                );
              })}
            </div>
          </div>

          <div style={{ padding: "12px 20px 32px" }}>
            <button
              type="button"
              onClick={handleVariantSwitch}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                width: "100%",
                minHeight: 52,
                padding: "14px 18px",
                background: "rgba(139,111,71,0.08)",
                color: palette.teal,
                border: `1px solid ${palette.teal}`,
                fontFamily: tokens.fontMono,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                borderRadius: 4,
              }}
            >
              <ArrowLeftRight size={14} aria-hidden="true" />
              <span>{t("variantSwitch.toCinema")}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

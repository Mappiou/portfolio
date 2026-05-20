import { Outlet, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { palette, tokens } from "../../styles/palette";
import { AuraCanvas } from "../ui/AuraCanvas";
import { PillNav } from "./PillNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Footer } from "./Footer";
import { useVariantPreference } from "@shared/hooks/useVariantPreference";
import { VARIANT } from "../../lib/variant";

export function Layout() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const { set } = useVariantPreference();

  useEffect(() => {
    if (lang === "fr" || lang === "en" || lang === "es") {
      set({ variant: VARIANT, lang });
    }
  }, [lang, set]);

  return (
    <div
      style={{
        background: palette.beige,
        color: palette.textPrimary,
        fontFamily: tokens.fontBody,
        fontWeight: 300,
        minHeight: "100dvh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <a href="#main-content" className="skip-link">
        {t("nav.home")} ↓
      </a>

      <AuraCanvas
        colors={["rgba(217,166,72,0.10)", "rgba(201,122,92,0.08)", "rgba(111,168,144,0.06)"]}
        opacity={0.5}
      />

      <header className="relative z-30">
        <PillNav theme="dark" />
        <div className="absolute right-6 top-7" style={{ zIndex: 31 }}>
          <LanguageSwitcher theme="dark" />
        </div>
      </header>

      <main id="main-content" className="relative z-10">
        <Outlet />
      </main>

      <Footer theme="dark" />
    </div>
  );
}

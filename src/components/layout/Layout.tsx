import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { palette, tokens } from "../../styles/palette";
import { AuraCanvas } from "../ui/AuraCanvas";
import { PillNav } from "./PillNav";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Footer } from "./Footer";

export function Layout() {
  const { t } = useTranslation();
  return (
    <div
      style={{
        background: palette.beige,
        color: palette.textPrimary,
        fontFamily: tokens.fontBody,
        minHeight: "100dvh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <a href="#main-content" className="skip-link">
        {t("nav.home")} ↓
      </a>

      <AuraCanvas colors={[palette.mint, palette.rust, palette.lilac]} opacity={0.5} />

      <header className="relative z-30">
        <PillNav theme="light" />
        <div className="absolute right-6 top-7" style={{ zIndex: 31 }}>
          <LanguageSwitcher theme="light" />
        </div>
      </header>

      <main id="main-content" className="relative z-10">
        <Outlet />
      </main>

      <Footer theme="light" />
    </div>
  );
}

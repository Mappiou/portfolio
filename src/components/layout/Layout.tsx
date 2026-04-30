import { Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { sketchbook, paperBackground } from "../../styles/sketchbook";

export function Layout() {
  const { t } = useTranslation();
  return (
    <div
      className="min-h-dvh"
      style={{
        background: `${sketchbook.paper} url("${paperBackground}")`,
        color: sketchbook.ink,
        fontFamily: "Lora, Georgia, serif",
      }}
    >
      <a className="skip-link" href="#main-content">
        {t("nav.home")} ↓
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Analytics } from "@vercel/analytics/react";
import { Chooser } from "@shared/components/Chooser";
import { CinemaApp } from "./variants/cinema/routes";
import { EditorialApp } from "./variants/editorial/routes";

function AnimatedRoutes() {
  const location = useLocation();
  const segment = location.pathname.split("/")[1] || "root";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={segment}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Chooser />} />
          <Route path="/cinema/*" element={<CinemaApp />} />
          <Route path="/editorial/*" element={<EditorialApp />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("meta.siteTitle");
    document.documentElement.lang = i18n.language;
  }, [t, i18n.language]);

  return (
    <BrowserRouter>
      <AnimatedRoutes />
      <Analytics />
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { DEFAULT_LANGUAGE, isSupportedLanguage } from "./i18n";

function detectInitialLanguage(): string {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  const stored = window.localStorage.getItem("i18nextLng");
  if (stored && isSupportedLanguage(stored)) return stored;
  const nav = window.navigator.language.slice(0, 2).toLowerCase();
  return isSupportedLanguage(nav) ? nav : DEFAULT_LANGUAGE;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`/${detectInitialLanguage()}`} replace />} />
        <Route path="/:lang" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/:projectId" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

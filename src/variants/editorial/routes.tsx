import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { useDetectInitialLanguage } from "@shared/hooks/useDetectInitialLanguage";

export function EditorialApp() {
  const lang = useDetectInitialLanguage();
  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/editorial/${lang}`} replace />} />
      <Route path=":lang" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects/:projectId" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

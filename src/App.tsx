import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Chooser } from "@shared/components/Chooser";
import { CinemaApp } from "./variants/cinema/routes";
import { EditorialApp } from "./variants/editorial/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chooser />} />
        <Route path="/cinema/*" element={<CinemaApp />} />
        <Route path="/editorial/*" element={<EditorialApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

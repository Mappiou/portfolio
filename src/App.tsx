import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { CinemaApp } from "./variants/cinema/routes";
import { EditorialApp } from "./variants/editorial/routes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cinema/*" element={<CinemaApp />} />
        <Route path="/editorial/*" element={<EditorialApp />} />
        <Route path="/" element={<Navigate to="/cinema" replace />} />
        <Route path="*" element={<Navigate to="/cinema" replace />} />
      </Routes>
      <Analytics />
    </BrowserRouter>
  );
}

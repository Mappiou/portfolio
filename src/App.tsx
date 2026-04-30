import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PreviewIndex from "./pages/PreviewIndex";
import VariantA from "./variants/VariantA";
import VariantB from "./variants/VariantB";
import VariantC from "./variants/VariantC";
import VariantD from "./variants/VariantD";
import VariantE from "./variants/VariantE";
import VariantF from "./variants/VariantF";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/preview" replace />} />
        <Route path="/preview" element={<PreviewIndex />} />
        <Route path="/preview/a-pastel" element={<VariantA />} />
        <Route path="/preview/b-memphis" element={<VariantB />} />
        <Route path="/preview/c-sketchbook" element={<VariantC />} />
        <Route path="/preview/d-y2k" element={<VariantD />} />
        <Route path="/preview/e-minimal-light" element={<VariantE />} />
        <Route path="/preview/f-minimal-dark" element={<VariantF />} />
        <Route path="*" element={<Navigate to="/preview" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

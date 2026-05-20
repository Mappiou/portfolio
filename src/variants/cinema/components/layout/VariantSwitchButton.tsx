import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";
import { useVariantPreference } from "@shared/hooks/useVariantPreference";
import { palette } from "../../styles/palette";

export function VariantSwitchButton() {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { set } = useVariantPreference();

  const handleClick = () => {
    const targetLang = lang ?? "fr";
    set({ variant: "editorial", lang: targetLang });
    navigate(`/editorial/${targetLang}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Voir l'autre vue (editorial)"
      title="Changer de portfolio"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        background: palette.beigeDeep,
        color: palette.teal,
        border: "1px solid rgba(217,166,72,0.25)",
        padding: "0.5rem 0.9rem",
        borderRadius: "999px",
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        fontSize: "0.78rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      <ArrowLeftRight size={14} />
      <span>Voir l'autre vue</span>
    </button>
  );
}

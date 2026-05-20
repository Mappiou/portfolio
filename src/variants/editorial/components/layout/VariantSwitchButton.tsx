import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftRight } from "lucide-react";
import { useVariantPreference } from "@shared/hooks/useVariantPreference";
import { palette } from "../../styles/palette";

export function VariantSwitchButton() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const { set } = useVariantPreference();

  const handleClick = () => {
    const targetLang = lang ?? "fr";
    set({ variant: "cinema", lang: targetLang });
    navigate(`/cinema/${targetLang}`);
  };

  const label = t("variantSwitch.toCinema");

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={t("variantSwitch.tooltip")}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        background: palette.cream,
        color: palette.teal,
        border: `1px solid ${palette.hairlineStrong}`,
        padding: "0.5rem 0.9rem",
        borderRadius: "4px",
        fontFamily: "'Inter Tight', system-ui, sans-serif",
        fontSize: "0.78rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      <ArrowLeftRight size={14} />
      <span>{label}</span>
    </button>
  );
}

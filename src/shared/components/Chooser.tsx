import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useVariantPreference, type Variant } from "@shared/hooks/useVariantPreference";
import { useDetectInitialLanguage, type SupportedLang } from "@shared/hooks/useDetectInitialLanguage";
import { LanguageDropdown } from "./LanguageDropdown";
import "./Chooser.css";

const CONFIG: Record<Variant, {
  image: string;
  title: string;
  tagline: string;
  cta: string;
  fontTitle: string;
  ctaColor: string;
  gradient: string;
  textColor: string;
  ariaLabel: string;
}> = {
  cinema: {
    image: "/shared/chooser/cinema.webp",
    title: "CINEMA",
    tagline: "Sombre, artistique et cinématique",
    cta: "Entrer",
    fontTitle: "'Cormorant Garamond', Georgia, serif",
    ctaColor: "#D9A648",
    gradient: "linear-gradient(180deg, rgba(14,13,11,0) 0%, rgba(14,13,11,0.7) 100%)",
    textColor: "#EFE9DD",
    ariaLabel: "Portfolio Cinema — sombre et cinématique",
  },
  editorial: {
    image: "/shared/chooser/editorial.webp",
    title: "EDITORIAL",
    tagline: "Clair, joyeux et magazine",
    cta: "Entrer",
    fontTitle: "'Newsreader', Georgia, serif",
    ctaColor: "#A04A2D",
    gradient: "linear-gradient(180deg, rgba(245,237,224,0) 0%, rgba(245,237,224,0.85) 100%)",
    textColor: "#1F1A14",
    ariaLabel: "Portfolio Editorial — clair et magazine",
  },
};

const ORDER: Variant[] = ["cinema", "editorial"];

export function Chooser() {
  const navigate = useNavigate();
  const { get, set } = useVariantPreference();
  const detectedLang = useDetectInitialLanguage();
  const previous = get();
  const [lang, setLang] = useState<SupportedLang>(
    (previous?.lang as SupportedLang) ?? detectedLang
  );
  const [hovered, setHovered] = useState<Variant | null>(null);

  const enter = (variant: Variant) => {
    set({ variant, lang });
    navigate(`/${variant}/${lang}`);
  };

  return (
    <main style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
      <h1
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          padding: 0,
          margin: -1,
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        Choisis ton portfolio
      </h1>

      <div
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.5rem",
          zIndex: 10,
          color: "#fff",
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(6px)",
          padding: "0.45rem 1rem",
          borderRadius: "999px",
        }}
      >
        <LanguageDropdown
          value={lang}
          onChange={(next) => setLang(next as SupportedLang)}
        />
      </div>

      <div className="chooser-split">
        {ORDER.map((key, idx) => {
          const config = CONFIG[key];
          const isHovered = hovered === key;
          const isDimmed = hovered !== null && hovered !== key;
          return (
            <motion.button
              key={key}
              type="button"
              aria-label={config.ariaLabel}
              onClick={() => enter(key)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              className="chooser-half"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                flex: isHovered ? 1.1 : 1,
                filter: isDimmed ? "brightness(0.6)" : "brightness(1)",
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: idx * 0.1,
              }}
              style={{
                position: "relative",
                border: "none",
                cursor: "pointer",
                padding: 0,
                backgroundImage: `url(${config.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: config.textColor,
                fontFamily: config.fontTitle,
                overflow: "hidden",
                flex: 1,
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: config.gradient }} />
              <div
                style={{
                  position: "relative",
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "4rem 2rem",
                  gap: "1rem",
                }}
              >
                {previous?.variant === key && (
                  <span
                    style={{
                      fontFamily: "'Inter Tight', system-ui, sans-serif",
                      fontSize: "0.85rem",
                      opacity: 0.75,
                      letterSpacing: "0.05em",
                    }}
                  >
                    ↪ Ta dernière visite
                  </span>
                )}
                <span style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 600, letterSpacing: "0.05em" }}>
                  {config.title}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter Tight', system-ui, sans-serif",
                    fontSize: "1.1rem",
                    opacity: 0.9,
                    textAlign: "center",
                    maxWidth: "32ch",
                  }}
                >
                  {config.tagline}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter Tight', system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: config.ctaColor,
                    marginTop: "0.5rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {config.cta} →
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </main>
  );
}

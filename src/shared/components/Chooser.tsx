import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useVariantPreference, type Variant } from "@shared/hooks/useVariantPreference";
import { useDetectInitialLanguage, type SupportedLang } from "@shared/hooks/useDetectInitialLanguage";
import frLocale from "@shared/i18n/locales/fr.json";
import enLocale from "@shared/i18n/locales/en.json";
import esLocale from "@shared/i18n/locales/es.json";
import { LanguageDropdown } from "./LanguageDropdown";
import "./Chooser.css";

const LOCALES = {
  fr: frLocale,
  en: enLocale,
  es: esLocale,
} as const;

const VISUAL: Record<Variant, {
  image: string;
  fontTitle: string;
  ctaColor: string;
  gradient: string;
  textColor: string;
}> = {
  cinema: {
    image: "/shared/chooser/cinema.webp",
    fontTitle: "'Cormorant Garamond', Georgia, serif",
    ctaColor: "#D9A648",
    gradient: "linear-gradient(180deg, rgba(14,13,11,0) 0%, rgba(14,13,11,0.7) 100%)",
    textColor: "#EFE9DD",
  },
  editorial: {
    image: "/shared/chooser/editorial.webp",
    fontTitle: "'Newsreader', Georgia, serif",
    ctaColor: "#A04A2D",
    gradient: "linear-gradient(180deg, rgba(245,237,224,0) 0%, rgba(245,237,224,0.85) 100%)",
    textColor: "#1F1A14",
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

  const t = LOCALES[lang].chooser;

  const enter = (variant: Variant) => {
    set({ variant, lang });
    navigate(`/${variant}/${lang}`);
  };

  return (
    <main style={{ height: "100vh", width: "100vw", overflow: "hidden", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: "1.25rem",
          left: "1.5rem",
          right: "1.5rem",
          zIndex: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "1rem",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            color: "#fff",
            maxWidth: "min(60ch, 60%)",
            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
          }}
        >
          <h1
            style={{
              fontFamily: "'Inter Tight', system-ui, sans-serif",
              fontSize: "clamp(1.15rem, 2vw, 1.65rem)",
              fontWeight: 600,
              letterSpacing: "0.02em",
              margin: 0,
            }}
          >
            {t.heading}
          </h1>
          <p
            style={{
              fontFamily: "'Inter Tight', system-ui, sans-serif",
              fontSize: "clamp(0.85rem, 1.15vw, 1rem)",
              opacity: 0.9,
              margin: "0.2rem 0 0",
            }}
          >
            {t.subtitle}
          </p>
        </div>
        <div
          style={{
            color: "#fff",
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(6px)",
            padding: "0.45rem 1rem",
            borderRadius: "999px",
            pointerEvents: "auto",
          }}
        >
          <LanguageDropdown
            value={lang}
            onChange={(next) => setLang(next as SupportedLang)}
          />
        </div>
      </div>

      <div className="chooser-split">
        {ORDER.map((key, idx) => {
          const visual = VISUAL[key];
          const copy = t[key];
          const isHovered = hovered === key;
          const isDimmed = hovered !== null && hovered !== key;
          return (
            <motion.button
              key={key}
              type="button"
              aria-label={copy.aria}
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
                backgroundImage: `url(${visual.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: visual.textColor,
                fontFamily: visual.fontTitle,
                overflow: "hidden",
                flex: 1,
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: visual.gradient }} />
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
                    ↪ {t.lastVisit}
                  </span>
                )}
                <span style={{ fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 600, letterSpacing: "0.05em" }}>
                  {copy.title}
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
                  {copy.tagline}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter Tight', system-ui, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: visual.ctaColor,
                    marginTop: "0.5rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t.cta} →
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </main>
  );
}

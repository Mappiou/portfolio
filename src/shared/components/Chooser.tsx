import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useVariantPreference, type Variant } from "@shared/hooks/useVariantPreference";
import { detectInitialLanguage, type SupportedLang } from "@shared/lib/detectInitialLanguage";
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
  background: string;
  ink: string;
  accent: string;
  fontTitle: string;
  pillBg: string;
  pillBgHover: string;
  pillFg: string;
  hairline: string;
  watermarkColor: string;
}> = {
  editorial: {
    background: "#F5EDE0",
    ink: "#1F1A14",
    accent: "#8B6F47",
    fontTitle: "'Newsreader', Georgia, serif",
    pillBg: "#1F1A14",
    pillBgHover: "#8B6F47",
    pillFg: "#F5EDE0",
    hairline: "rgba(31, 26, 20, 0.22)",
    watermarkColor: "rgba(31, 26, 20, 0.06)",
  },
  cinema: {
    background: "linear-gradient(180deg, #0E0D0B 0%, #050403 100%)",
    ink: "#EFE9DD",
    accent: "#D9A648",
    fontTitle: "'Cormorant Garamond', Georgia, serif",
    pillBg: "#D9A648",
    pillBgHover: "#EFC974",
    pillFg: "#0E0D0B",
    hairline: "rgba(239, 233, 221, 0.18)",
    watermarkColor: "rgba(239, 233, 221, 0.06)",
  },
};

// Editorial on the LEFT, cinema on the RIGHT.
const ORDER: Variant[] = ["editorial", "cinema"];

export function Chooser() {
  const navigate = useNavigate();
  const { get, set } = useVariantPreference();
  const detectedLang = detectInitialLanguage();
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
    <main className="chooser-root">
      <motion.header
        className="chooser-masthead"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="chooser-masthead__brand">{t.masthead}</div>
        <div className="chooser-masthead__rule" aria-hidden />
        <div className="chooser-masthead__instruction">
          {t.instructionLead}{" "}
          <strong>{t.instructionAction}</strong>{" "}
          {t.instructionTrail}
        </div>
      </motion.header>

      <div className="chooser-langbar">
        <LanguageDropdown
          value={lang}
          onChange={(next) => setLang(next as SupportedLang)}
        />
      </div>

      <div className="chooser-spread">
        {ORDER.map((key, idx) => {
          const visual = VISUAL[key];
          const copy = t[key];
          const isHovered = hovered === key;
          const isDimmed = hovered !== null && hovered !== key;
          const isLast = previous?.variant === key;
          const watermarkNumber = idx === 0 ? "01" : "02";
          const arrow = key === "editorial" ? "→" : "←";

          return (
            <motion.button
              key={key}
              type="button"
              aria-label={copy.aria}
              onClick={() => enter(key)}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
              className={`chooser-cover chooser-cover--${key}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: isHovered ? -6 : 0,
                flex: isHovered ? 1.07 : 1,
                filter: isDimmed
                  ? "brightness(0.72) saturate(0.85)"
                  : "brightness(1) saturate(1)",
              }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15 + idx * 0.1,
              }}
              style={{
                background: visual.background,
                color: visual.ink,
                fontFamily: visual.fontTitle,
              }}
            >
              <div
                className="chooser-cover__top"
                style={{ borderBottomColor: visual.hairline }}
              >
                <span
                  className="chooser-cover__issue"
                  style={{ color: visual.accent }}
                >
                  {copy.issueLabel}
                </span>
                <span className="chooser-cover__attribution">Mathieu Diep</span>
              </div>

              <div className="chooser-cover__title-block">
                {isLast && (
                  <span
                    className="chooser-cover__chip"
                    style={{ color: visual.accent }}
                  >
                    <span aria-hidden>↪</span> {t.lastVisit}
                  </span>
                )}
                <div className="chooser-cover__kicker">— {copy.kicker} —</div>
                <h2 className="chooser-cover__title">
                  {copy.title.map((line, i) => (
                    <span key={i} className="chooser-cover__title-line">
                      {line}
                      {i === copy.title.length - 1 && (
                        <span
                          className="chooser-cover__title-dot"
                          style={{ color: visual.accent }}
                        >
                          .
                        </span>
                      )}
                    </span>
                  ))}
                </h2>
                <p className="chooser-cover__tagline">{copy.tagline}</p>
              </div>

              <div className="chooser-cover__footer">
                {key === "editorial" && (
                  <span className="chooser-cover__footer-label">
                    {copy.footerLabel}
                  </span>
                )}
                <span
                  className="chooser-cover__pill"
                  style={{
                    background: isHovered ? visual.pillBgHover : visual.pillBg,
                    color: visual.pillFg,
                  }}
                >
                  {key === "cinema" && (
                    <span
                      aria-hidden
                      className="chooser-cover__pill-arrow chooser-cover__pill-arrow--left"
                      style={{
                        transform: isHovered ? "translateX(-4px)" : "translateX(0)",
                      }}
                    >
                      {arrow}
                    </span>
                  )}
                  <span>{copy.cta}</span>
                  {key === "editorial" && (
                    <span
                      aria-hidden
                      className="chooser-cover__pill-arrow chooser-cover__pill-arrow--right"
                      style={{
                        transform: isHovered ? "translateX(4px)" : "translateX(0)",
                      }}
                    >
                      {arrow}
                    </span>
                  )}
                </span>
                {key === "cinema" && (
                  <span className="chooser-cover__footer-label">
                    {copy.footerLabel}
                  </span>
                )}
              </div>

              <div
                className="chooser-cover__watermark"
                style={{ color: visual.watermarkColor }}
                aria-hidden
              >
                {watermarkNumber}
              </div>
            </motion.button>
          );
        })}

        <div className="chooser-spine" aria-hidden />
      </div>
    </main>
  );
}

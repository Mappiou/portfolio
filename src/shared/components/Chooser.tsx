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
  background: string;
  accent: string;
  fontTitle: string;
  textColor: string;
  taglineColor: string;
}> = {
  cinema: {
    background:
      "radial-gradient(ellipse 85% 70% at 50% 35%, #1f1b16 0%, #0d0c0a 55%, #050403 100%)",
    accent: "#D9A648",
    fontTitle: "'Cormorant Garamond', Georgia, serif",
    textColor: "#EFE9DD",
    taglineColor: "rgba(239,233,221,0.65)",
  },
  editorial: {
    background:
      "radial-gradient(ellipse 85% 70% at 50% 35%, #FAF5EB 0%, #EFE2C9 60%, #DCC9A2 100%)",
    accent: "#A04A2D",
    fontTitle: "'Newsreader', Georgia, serif",
    textColor: "#1F1A14",
    taglineColor: "rgba(31,26,20,0.6)",
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
    <main className="chooser-root">
      <div className="chooser-langbar">
        <LanguageDropdown
          value={lang}
          onChange={(next) => setLang(next as SupportedLang)}
        />
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
              className={`chooser-half chooser-half--${key}`}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              animate={{
                opacity: 1,
                x: 0,
                flex: isHovered ? 1.08 : 1,
                filter: isDimmed ? "brightness(0.5)" : "brightness(1)",
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: idx * 0.08,
              }}
              style={{
                background: visual.background,
                color: visual.textColor,
                fontFamily: visual.fontTitle,
              }}
            >
              <div className="chooser-half__grain" aria-hidden />

              <div className="chooser-half__bottom">
                {previous?.variant === key && (
                  <span
                    className="chooser-half__chip"
                    style={{ color: visual.taglineColor }}
                  >
                    <span aria-hidden>↪</span> {t.lastVisit}
                  </span>
                )}
                <span
                  className="chooser-half__title"
                  style={{ color: visual.textColor }}
                >
                  {copy.title}
                </span>
                <span
                  className="chooser-half__tagline"
                  style={{ color: visual.taglineColor }}
                >
                  {copy.tagline}
                </span>
                <span
                  className="chooser-half__cta"
                  style={{
                    color: visual.accent,
                    borderColor: visual.accent,
                  }}
                >
                  <span>{t.cta}</span>
                  <span
                    aria-hidden
                    className="chooser-half__cta-arrow"
                    style={{
                      transform: isHovered ? "translateX(6px)" : "translateX(0)",
                    }}
                  >
                    →
                  </span>
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="chooser-divider" aria-hidden />

      <motion.div
        className="chooser-curator"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      >
        <span className="chooser-curator__kicker">{t.kicker}</span>
        <h1 className="chooser-curator__heading">{t.heading}</h1>
        <p className="chooser-curator__subtitle">{t.subtitle}</p>
        <div className="chooser-curator__prompt" aria-hidden>
          <span className="chooser-curator__prompt-arrow chooser-curator__prompt-arrow--left">
            ←
          </span>
          <span className="chooser-curator__prompt-label">{t.prompt}</span>
          <span className="chooser-curator__prompt-arrow chooser-curator__prompt-arrow--right">
            →
          </span>
        </div>
      </motion.div>
    </main>
  );
}

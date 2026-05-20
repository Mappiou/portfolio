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
  accent: string;
  fontTitle: string;
  textColor: string;
  taglineColor: string;
}> = {
  cinema: {
    image: "/shared/chooser/cinema.webp",
    accent: "#D9A648",
    fontTitle: "'Cormorant Garamond', Georgia, serif",
    textColor: "#EFE9DD",
    taglineColor: "rgba(239,233,221,0.72)",
  },
  editorial: {
    image: "/shared/chooser/editorial.webp",
    accent: "#A04A2D",
    fontTitle: "'Newsreader', Georgia, serif",
    textColor: "#1F1A14",
    taglineColor: "rgba(31,26,20,0.65)",
  },
};

// Editorial on top, cinema on bottom — vertical split.
const ORDER: Variant[] = ["editorial", "cinema"];

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
              initial={{ opacity: 0, y: idx === 0 ? -30 : 30 }}
              animate={{
                opacity: 1,
                y: 0,
                flex: isHovered ? 1.08 : 1,
                filter: isDimmed ? "brightness(0.55) saturate(0.7)" : "brightness(1) saturate(1)",
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
                delay: idx * 0.08,
              }}
              style={{
                backgroundImage: `url(${visual.image})`,
                color: visual.textColor,
                fontFamily: visual.fontTitle,
              }}
            >
              <div className="chooser-half__tint" aria-hidden />
              <div className="chooser-half__grain" aria-hidden />

              <div className="chooser-half__caption">
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

      <div className="chooser-curator-wrap">
        <motion.div
          className="chooser-curator"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        >
          <span className="chooser-curator__kicker">{t.kicker}</span>
          <h1 className="chooser-curator__heading">{t.heading}</h1>
          <p className="chooser-curator__subtitle">{t.subtitle}</p>
          <div className="chooser-curator__prompt" aria-hidden>
            <span className="chooser-curator__prompt-arrow chooser-curator__prompt-arrow--up">
              ↑
            </span>
            <span className="chooser-curator__prompt-label">{t.prompt}</span>
            <span className="chooser-curator__prompt-arrow chooser-curator__prompt-arrow--down">
              ↓
            </span>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

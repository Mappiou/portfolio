import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { palette, tokens } from "../../styles/palette";
import { experiences } from "../../data/experiences";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import type { Experience } from "../../data/types";
import type { Language } from "../../i18n";

export function TimelineSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="timeline"
      className="relative z-10 mx-auto px-6 pb-24"
      style={{ maxWidth: tokens.pageMaxWidth }}
      aria-labelledby="timeline-heading"
    >
      <h2
        id="timeline-heading"
        className="text-center mb-3"
        style={{
          fontFamily: tokens.fontTitle,
          fontWeight: 600,
          fontSize: "clamp(36px, 4.5vw, 64px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: palette.textPrimary,
        }}
      >
        <Trans
          i18nKey="timeline.title"
          components={{
            italic: (
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontFamily: tokens.fontItalic,
                }}
              />
            ),
          }}
        />
      </h2>
      <p className="text-center text-sm mb-10 italic" style={{ color: palette.textSecondary }}>
        {t("timeline.expandHint")}
      </p>

      <div className="flex flex-col gap-3.5">
        {experiences.map((entry) => (
          <TimelineEntry
            key={entry.id}
            entry={entry}
            lang={lang}
            isOpen={openId === entry.id}
            onToggle={() => setOpenId((cur) => (cur === entry.id ? null : entry.id))}
          />
        ))}
      </div>

      <p
        className="text-center text-sm mt-6"
        style={{ color: palette.textSecondary, fontStyle: "italic" }}
      >
        {t("timeline.note")}
      </p>
    </section>
  );
}

type EntryProps = {
  entry: Experience;
  lang: Language;
  isOpen: boolean;
  onToggle: () => void;
};

function TimelineEntry({ entry, lang, isOpen, onToggle }: EntryProps) {
  const { t } = useTranslation();
  const panelId = `exp-panel-${entry.id}`;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full flex items-center gap-4 md:gap-8 px-5 md:px-7 py-3.5 md:py-4 rounded-full text-left cursor-pointer transition-all hover:scale-[1.005]"
        style={{
          background: palette.teal,
          color: palette.textTertiary,
          border: 0,
          fontFamily: tokens.fontBody,
        }}
      >
        <span
          style={{
            fontFamily: tokens.fontTitle,
            fontSize: "clamp(15px, 1.4vw, 20px)",
            fontWeight: 500,
            flex: "0 0 max-content",
            letterSpacing: "-0.01em",
            minWidth: 130,
          }}
        >
          {entry.period[lang]}
        </span>
        <span
          style={{
            fontSize: "clamp(15px, 1.3vw, 19px)",
            fontWeight: 600,
            flex: "1 1 auto",
          }}
        >
          {entry.company}
        </span>
        <span
          className="hidden md:inline"
          style={{
            fontSize: "clamp(13px, 1vw, 16px)",
            color: palette.textQuarterly,
            flex: "0 0 auto",
            textAlign: "right",
          }}
        >
          {entry.role[lang]}
        </span>
        <ChevronDown
          size={18}
          aria-hidden="true"
          style={{
            transition: "transform 0.25s ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            color: palette.textQuarterly,
            flex: "0 0 auto",
          }}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div
              className="mt-2 px-6 md:px-8 py-6 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(14,83,77,0.10)",
              }}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
                <h3
                  style={{
                    fontFamily: tokens.fontTitle,
                    fontWeight: 600,
                    fontSize: "clamp(20px, 2vw, 26px)",
                    letterSpacing: "-0.02em",
                    color: palette.textPrimary,
                  }}
                >
                  {entry.role[lang]}{" "}
                  <span style={{ color: palette.textSecondary, fontWeight: 400 }}>
                    · {entry.company}
                  </span>
                </h3>
                <span
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(14,83,77,0.08)",
                    color: palette.textPrimary,
                    fontWeight: 500,
                  }}
                >
                  <MapPin size={12} aria-hidden="true" />
                  {entry.location}
                </span>
              </div>

              <p
                className="italic mb-4"
                style={{
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: palette.textSecondary,
                }}
              >
                {entry.description[lang]}
              </p>

              {entry.bullets.length > 0 && (
                <ul className="space-y-2 mb-5" style={{ listStyle: "none", padding: 0 }}>
                  {entry.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex gap-3 items-baseline"
                      style={{
                        fontSize: 15,
                        lineHeight: 1.55,
                        color: palette.textPrimary,
                      }}
                    >
                      <span style={{ color: palette.teal, fontWeight: 700 }}>✱</span>
                      <span>{b[lang]}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div>
                <p
                  className="text-xs uppercase tracking-[0.15em] mb-2"
                  style={{ color: palette.textSecondary, fontWeight: 600 }}
                >
                  {t("timeline.stackLabel")}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {entry.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full px-2.5 py-0.5 text-xs"
                      style={{
                        background: "rgba(14,83,77,0.08)",
                        color: palette.textPrimary,
                        fontWeight: 500,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { palette, tokens } from "../../styles/palette";
import { experiences } from "@shared/data/experiences";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import type { Experience } from "@shared/types";
import type { Language } from "@shared/i18n";

const photoSeedFor: Record<string, string> = {
  hexamind: "hexamind-office",
  lincoln: "lincoln-paris",
  capgemini: "capgemini-blockchain",
  aubay: "aubay-music",
  "orange-labs": "orange-labs-health",
};

const captionFor: Record<string, string> = {
  hexamind: "Atelier IA — Hexamind, Paris / Remote.",
  lincoln: "Mission Orange — Lincoln, Paris.",
  capgemini: "Stage Data / Blockchain — Toulouse.",
  aubay: "Stage Recherche IA — Aubay, Paris.",
  "orange-labs": "Stage R&D — Orange Labs, Caen.",
};

export function TimelineSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="timeline"
      className="relative z-10 mx-auto px-6 md:px-10"
      style={{
        maxWidth: tokens.pageMaxWidth,
        paddingTop: "clamp(80px, 11vw, 140px)",
        paddingBottom: "clamp(80px, 11vw, 140px)",
      }}
      aria-labelledby="timeline-heading"
    >
      <div
        className="flex items-baseline justify-between mb-16 pb-6"
        style={{ borderBottom: `1px solid ${palette.hairline}` }}
      >
        <h2
          id="timeline-heading"
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(40px, 5.5vw, 72px)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: palette.textPrimary,
            margin: 0,
            fontFeatureSettings: '"ss01", "ss02"',
          }}
        >
          <Trans
            i18nKey="timeline.title"
            components={{
              italic: (
                <span
                  style={{
                    fontStyle: "italic",
                    color: palette.teal,
                  }}
                />
              ),
            }}
          />
        </h2>
        <span
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.textSecondary,
            whiteSpace: "nowrap",
          }}
        >
          01 / 03 — {t("timeline.note")}
        </span>
      </div>

      <p
        className="text-sm mb-12"
        style={{
          color: palette.textSecondary,
          fontFamily: tokens.fontItalic,
          fontStyle: "italic",
        }}
      >
        {t("timeline.expandHint")}
      </p>

      <div className="flex flex-col" style={{ gap: "clamp(72px, 9vw, 120px)" }}>
        {experiences.map((entry, i) => (
          <TimelineEntry
            key={entry.id}
            entry={entry}
            index={i}
            lang={lang}
            isOpen={openId === entry.id}
            onToggle={() => setOpenId((cur) => (cur === entry.id ? null : entry.id))}
          />
        ))}
      </div>
    </section>
  );
}

type EntryProps = {
  entry: Experience;
  index: number;
  lang: Language;
  isOpen: boolean;
  onToggle: () => void;
};

function TimelineEntry({ entry, index, lang, isOpen, onToggle }: EntryProps) {
  const { t } = useTranslation();
  const panelId = `exp-panel-${entry.id}`;
  const photoSeed = photoSeedFor[entry.id] ?? entry.id;
  const caption = captionFor[entry.id] ?? entry.company;
  const variant = index % 2 === 0 ? "a" : "b"; // a: photo left, b: photo right

  const num = String(index + 1).padStart(2, "0");
  const total = "05";

  const photoBlock = (
    <div>
      <div className="overflow-hidden" style={{ aspectRatio: "7 / 5" }}>
        <img
          src={`https://picsum.photos/seed/${photoSeed}/700/500`}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "sepia(8%) saturate(110%)",
          }}
        />
      </div>
      <p
        className="mt-3"
        style={{
          fontFamily: tokens.fontItalic,
          fontStyle: "italic",
          fontSize: 14,
          color: palette.textSecondary,
        }}
      >
        — {caption}
      </p>
    </div>
  );

  const contentBlock = (
    <div>
      <p
        className="mb-6"
        style={{
          fontFamily: tokens.fontMono,
          fontSize: 11,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: palette.teal,
          fontWeight: 500,
        }}
      >
        {num} / {total}
      </p>
      <h3
        style={{
          fontFamily: tokens.fontTitle,
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "clamp(32px, 4vw, 52px)",
          lineHeight: 1.02,
          letterSpacing: "-0.025em",
          color: palette.textPrimary,
          margin: 0,
          marginBottom: 14,
          fontFeatureSettings: '"ss01", "ss02"',
        }}
      >
        {entry.company}<span style={{ color: palette.teal }}>.</span>
      </h3>
      <p
        style={{
          fontFamily: tokens.fontMono,
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: palette.textSecondary,
          marginBottom: 8,
        }}
      >
        {entry.role[lang]}
      </p>
      <p
        className="mb-7 pb-6"
        style={{
          fontFamily: tokens.fontItalic,
          fontStyle: "italic",
          fontSize: 15,
          color: palette.textSecondary,
          borderBottom: `1px solid ${palette.hairline}`,
        }}
      >
        {entry.period[lang]} · {entry.location[lang]}
      </p>
      <p
        className="mb-7"
        style={{
          fontSize: 17,
          lineHeight: 1.6,
          color: palette.textPrimary,
        }}
      >
        {entry.description[lang]}
      </p>

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="inline-flex items-center gap-2 mb-4 transition-all"
        style={{
          background: "transparent",
          border: 0,
          padding: 0,
          cursor: "pointer",
          fontFamily: tokens.fontMono,
          fontSize: 11,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: palette.teal,
          fontWeight: 500,
        }}
      >
        {isOpen ? `— ${t("timeline.collapse")}` : `→ ${t("timeline.expand")}`}
      </button>

      <AnimatePresence initial={false}>
        {isOpen && entry.bullets.length > 0 && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <ul className="mt-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {entry.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex gap-3"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: palette.textPrimary,
                    paddingLeft: 0,
                    marginBottom: 8,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{ color: palette.teal, fontWeight: 500, flexShrink: 0 }}
                  >
                    —
                  </span>
                  <span>{b[lang]}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="mt-8 pt-5"
        style={{
          borderTop: `1px solid ${palette.hairline}`,
          fontFamily: tokens.fontMono,
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: palette.textSecondary,
          lineHeight: 1.8,
        }}
      >
        {entry.stack.join(" · ")}
      </div>
    </div>
  );

  return (
    <article className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
      {variant === "a" ? (
        <>
          <div className="md:col-span-5">{photoBlock}</div>
          <div className="md:col-span-6 md:col-start-7">{contentBlock}</div>
        </>
      ) : (
        <>
          <div className="md:col-span-6 md:order-1">{contentBlock}</div>
          <div className="md:col-span-5 md:col-start-8 md:order-2">{photoBlock}</div>
        </>
      )}
    </article>
  );
}

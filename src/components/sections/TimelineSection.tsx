import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { palette, tokens } from "../../styles/palette";
import { experiences } from "../../data/experiences";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { ChapterCard } from "../ui/ChapterCard";
import type { Experience } from "../../data/types";
import type { Language } from "../../i18n";

const photoSeedFor: Record<string, string> = {
  hexamind: "hexamind-cinema",
  lincoln: "lincoln-cinema",
  capgemini: "capgemini-cinema",
  aubay: "aubay-cinema",
  "orange-labs": "orange-cinema",
};

export function TimelineSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="timeline" className="relative w-full" aria-labelledby="timeline-heading">
      <ChapterCard
        chapter="CHAPITRE 02"
        bgSrc="https://picsum.photos/seed/office-dark/1800/600"
        headingId="timeline-heading"
        title={
          <>
            <Trans
              i18nKey="timeline.title"
              components={{
                italic: <span style={{ fontStyle: "italic" }} />,
              }}
            />
            <span style={{ color: palette.teal }}>.</span>
          </>
        }
      />

      <div className="relative w-full" style={{ padding: "100px 0 180px" }}>
        <div className="mx-auto px-6" style={{ maxWidth: 1440 }}>
          <p
            className="text-center mb-12 italic"
            style={{
              fontFamily: tokens.fontTitle,
              fontStyle: "italic",
              fontSize: 18,
              color: palette.textSecondary,
            }}
          >
            {t("timeline.expandHint")}
          </p>

          <div className="flex flex-col">
            {experiences.map((entry, i) => (
              <TimelineEntry
                key={entry.id}
                entry={entry}
                index={i}
                isLast={i === experiences.length - 1}
                lang={lang}
                isOpen={openId === entry.id}
                onToggle={() => setOpenId((cur) => (cur === entry.id ? null : entry.id))}
              />
            ))}
          </div>

          <p
            className="text-center mt-12"
            style={{
              fontFamily: tokens.fontMono,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: palette.textSecondary,
            }}
          >
            {t("timeline.note")}
          </p>
        </div>
      </div>
    </section>
  );
}

type EntryProps = {
  entry: Experience;
  index: number;
  isLast: boolean;
  lang: Language;
  isOpen: boolean;
  onToggle: () => void;
};

function TimelineEntry({ entry, index, isLast, lang, isOpen, onToggle }: EntryProps) {
  const { t } = useTranslation();
  const panelId = `exp-panel-${entry.id}`;
  const num = String(index + 1).padStart(2, "0");
  const seed = photoSeedFor[entry.id] ?? `${entry.id}-cinema`;

  return (
    <article
      className="grid grid-cols-12 gap-8 md:gap-12 items-center work-row"
      style={{
        padding: "80px 0",
        borderTop: "1px solid rgba(239,233,221,0.12)",
        borderBottom: isLast ? "1px solid rgba(239,233,221,0.12)" : undefined,
      }}
    >
      <div className="col-span-12 md:col-span-5">
        <div
          className="cinema-frame"
          style={{
            aspectRatio: "3 / 2",
            width: "100%",
          }}
        >
          <img
            src={`https://picsum.photos/seed/${seed}/600/400`}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-7">
        <div
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 96,
            lineHeight: 1,
            color: palette.textSecondary,
            letterSpacing: "-0.02em",
            marginBottom: 20,
            transition: "color 0.6s ease",
          }}
          className="hover:!text-[#D9A648]"
        >
          {num}
        </div>
        <h3
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 40,
            lineHeight: 1.1,
            color: palette.textPrimary,
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          {entry.company}
          <span style={{ color: palette.teal }}>.</span>
        </h3>
        <p
          style={{
            fontFamily: tokens.fontBody,
            fontWeight: 400,
            fontSize: 16,
            color: palette.textPrimary,
            opacity: 0.85,
            marginBottom: 6,
          }}
        >
          {entry.role[lang]}
        </p>
        <p
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 12,
            color: palette.textSecondary,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            marginBottom: 24,
          }}
        >
          {entry.location[lang]} · {entry.period[lang]}
        </p>
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            color: palette.textPrimary,
            opacity: 0.85,
            marginBottom: 24,
            maxWidth: 540,
            fontFamily: tokens.fontBody,
            fontWeight: 300,
          }}
        >
          {entry.description[lang]}
        </p>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="inline-flex items-center gap-2 transition-all"
          style={{
            background: "transparent",
            border: "1px solid rgba(239,233,221,0.25)",
            color: palette.textPrimary,
            padding: "10px 22px",
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            marginBottom: 24,
          }}
        >
          {isOpen ? t("timeline.collapse") : t("timeline.expand")}
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
              {entry.bullets.length > 0 && (
                <ul
                  className="mb-6"
                  style={{ listStyle: "none", padding: 0, marginTop: 12 }}
                >
                  {entry.bullets.map((b, i) => (
                    <li
                      key={i}
                      style={{
                        position: "relative",
                        paddingLeft: 28,
                        marginBottom: 8,
                        fontSize: 16,
                        lineHeight: 1.6,
                        color: palette.textPrimary,
                        opacity: 0.78,
                        fontFamily: tokens.fontBody,
                        fontWeight: 300,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: 0,
                          color: palette.teal,
                          opacity: 0.7,
                        }}
                      >
                        →
                      </span>
                      {b[lang]}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div
          style={{
            paddingTop: 20,
            borderTop: "1px solid rgba(239,233,221,0.12)",
            fontFamily: tokens.fontMono,
            fontSize: 11,
            color: palette.textSecondary,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
          }}
        >
          {entry.stack.join(" · ")}
        </div>
      </div>
    </article>
  );
}

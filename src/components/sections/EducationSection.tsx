import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Plane, Sprout, ChevronDown, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { palette, tokens } from "../../styles/palette";
import { education } from "../../data/education";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import type { Education } from "../../data/types";
import type { Language } from "../../i18n";

const iconFor: Record<Education["kind"], ReactNode> = {
  milestone: <Sprout size={14} />,
  exchange: <Plane size={14} />,
  degree: <GraduationCap size={14} />,
};

const tintFor: Record<Education["kind"], string> = {
  milestone: palette.mint,
  exchange: palette.lilac,
  degree: palette.yellow,
};

export function EducationSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const [openId, setOpenId] = useState<string | null>(null);

  // Sort chronologically (already sorted in the data, but stable just in case)
  const entries = [...education].sort((a, b) => a.year - b.year);

  return (
    <section
      id="education"
      className="relative z-10 mx-auto px-6 pb-24"
      style={{ maxWidth: tokens.pageMaxWidth }}
      aria-labelledby="education-heading"
    >
      <div className="text-center mb-3">
        <p
          className="inline-block px-4 py-1.5 rounded-full mb-4"
          style={{
            background: "rgba(255,255,255,0.55)",
            color: palette.textSecondary,
            fontSize: 13,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          ✱ {t("education.kicker")}
        </p>
        <h2
          id="education-heading"
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
            i18nKey="education.title"
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
      </div>
      <p className="text-center text-sm mb-12 italic" style={{ color: palette.textSecondary }}>
        {t("education.expandHint")}
      </p>

      {/* Vertical timeline */}
      <ol className="relative mx-auto" style={{ maxWidth: 760, listStyle: "none", padding: 0 }}>
        {/* Vertical line */}
        <span
          aria-hidden="true"
          className="absolute"
          style={{
            left: 23,
            top: 12,
            bottom: 12,
            width: 2,
            background: `linear-gradient(180deg, ${palette.teal}30 0%, ${palette.teal}50 50%, ${palette.teal}30 100%)`,
            borderRadius: 2,
          }}
        />
        {entries.map((entry) => (
          <TimelineEntry
            key={entry.id}
            entry={entry}
            lang={lang}
            isOpen={openId === entry.id}
            onToggle={() => setOpenId((cur) => (cur === entry.id ? null : entry.id))}
          />
        ))}
      </ol>
    </section>
  );
}

type EntryProps = {
  entry: Education;
  lang: Language;
  isOpen: boolean;
  onToggle: () => void;
};

function TimelineEntry({ entry, lang, isOpen, onToggle }: EntryProps) {
  const tint = tintFor[entry.kind];
  const panelId = `edu-panel-${entry.id}`;

  return (
    <li className="relative" style={{ paddingLeft: 64, paddingBottom: 28 }}>
      {/* Dot on the line */}
      <span
        className="absolute z-10 inline-flex items-center justify-center rounded-full"
        style={{
          left: 12,
          top: 4,
          width: 24,
          height: 24,
          background: tint,
          color: palette.textPrimary,
          border: `3px solid ${palette.beige}`,
          boxShadow: `0 0 0 1.5px ${palette.teal}50`,
        }}
        aria-hidden="true"
      >
        {iconFor[entry.kind]}
      </span>

      {/* Clickable header */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full text-left rounded-2xl px-4 py-3 transition-all hover:bg-white/40 cursor-pointer"
        style={{
          background: isOpen ? "rgba(255,255,255,0.55)" : "transparent",
          border: 0,
          fontFamily: tokens.fontBody,
        }}
      >
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <p
            className="text-xs uppercase tracking-[0.18em] font-semibold"
            style={{ color: palette.textSecondary }}
          >
            {entry.period[lang]}
          </p>
          <ChevronDown
            size={16}
            aria-hidden="true"
            style={{
              transition: "transform 0.25s ease",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              color: palette.textSecondary,
              opacity: 0.6,
            }}
          />
        </div>
        <h3
          className="mt-1.5"
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: 600,
            fontSize: "clamp(18px, 1.7vw, 23px)",
            letterSpacing: "-0.015em",
            lineHeight: 1.2,
            color: palette.textPrimary,
          }}
        >
          {entry.title[lang]}
          {entry.flag && (
            <span aria-hidden="true" style={{ marginLeft: 8, fontSize: "0.85em" }}>
              {entry.flag}
            </span>
          )}
        </h3>
        <p
          className="mt-1 italic"
          style={{
            fontSize: 14,
            color: palette.textSecondary,
            lineHeight: 1.5,
          }}
        >
          {entry.summary[lang]}
        </p>
      </button>

      {/* Expanded panel with description + photo */}
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
              className="mt-2 px-4 md:px-5 py-5 rounded-2xl grid grid-cols-1 md:grid-cols-[1fr_180px] gap-5 items-start"
              style={{
                background: "rgba(255,255,255,0.55)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(14,83,77,0.10)",
              }}
            >
              <div>
                <p
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full mb-3"
                  style={{
                    background: "rgba(14,83,77,0.08)",
                    color: palette.textPrimary,
                    fontWeight: 500,
                  }}
                >
                  <MapPin size={12} aria-hidden="true" />
                  {entry.school} · {entry.location}
                </p>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: palette.textPrimary,
                  }}
                >
                  {entry.description[lang]}
                </p>
              </div>

              <PhotoSlot
                photoSrc={entry.photoSrc}
                flag={entry.flag}
                tint={tint}
                alt={entry.location}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

function PhotoSlot({
  photoSrc,
  flag,
  tint,
  alt,
}: {
  photoSrc?: string;
  flag?: string;
  tint: string;
  alt: string;
}) {
  if (photoSrc) {
    return (
      <img
        src={photoSrc}
        alt={alt}
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          objectFit: "cover",
          borderRadius: 16,
        }}
      />
    );
  }
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-2xl"
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        background: `linear-gradient(135deg, ${tint} 0%, rgba(255,255,255,0.4) 100%)`,
      }}
      aria-hidden="true"
    >
      {flag && (
        <span
          style={{
            fontSize: 48,
            filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.12))",
          }}
        >
          {flag}
        </span>
      )}
      <span
        className="absolute bottom-2 right-3 text-[10px]"
        style={{
          color: "rgba(14,83,77,0.55)",
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
        }}
      >
        photo
      </span>
    </div>
  );
}

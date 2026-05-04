import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Plane,
  Sprout,
  Briefcase,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { ReactNode } from "react";
import { palette, tokens } from "../../styles/palette";
import { education } from "../../data/education";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import type { Education } from "../../data/types";
import type { Language } from "../../i18n";

const iconFor: Record<Education["kind"], ReactNode> = {
  milestone: <Sprout size={14} />,
  exchange: <Plane size={14} />,
  internship: <Briefcase size={14} />,
  degree: <GraduationCap size={14} />,
};

const tintFor: Record<Education["kind"], string> = {
  milestone: palette.mint,
  exchange: palette.lilac,
  internship: palette.rust,
  degree: palette.yellow,
};

const STEP_WIDTH = 180;

export function EducationSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const entries = [...education].sort((a, b) => a.year - b.year);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openEntry = openIndex !== null ? entries[openIndex] : null;

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
      <p
        className="text-center text-sm mb-10 italic flex items-center justify-center gap-2"
        style={{ color: palette.textSecondary }}
      >
        <ChevronLeft size={14} aria-hidden="true" />
        <span>{t("education.expandHint")}</span>
        <ChevronRight size={14} aria-hidden="true" />
      </p>

      {/* Horizontal scrollable timeline */}
      <div
        className="relative overflow-x-auto overflow-y-hidden pb-4"
        style={{
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            width: entries.length * STEP_WIDTH + 80,
            minWidth: "100%",
            paddingTop: 80,
            paddingBottom: 80,
            paddingLeft: 40,
            paddingRight: 40,
          }}
        >
          {/* Horizontal line */}
          <span
            aria-hidden="true"
            className="absolute"
            style={{
              top: "50%",
              left: 64,
              right: 64,
              height: 2,
              transform: "translateY(-1px)",
              background: `linear-gradient(90deg, ${palette.teal}30 0%, ${palette.teal}50 50%, ${palette.teal}30 100%)`,
              borderRadius: 2,
            }}
          />

          <ol
            className="relative grid"
            style={{
              gridTemplateColumns: `repeat(${entries.length}, ${STEP_WIDTH}px)`,
              listStyle: "none",
              padding: 0,
              margin: 0,
              alignItems: "center",
            }}
          >
            {entries.map((entry, i) => {
              const isOpen = openIndex === i;
              const isAbove = i % 2 === 0;
              return (
                <TimelineStep
                  key={entry.id}
                  entry={entry}
                  lang={lang}
                  isAbove={isAbove}
                  isOpen={isOpen}
                  onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
                />
              );
            })}
          </ol>
        </div>
      </div>

      {/* Detail panel under the timeline */}
      <AnimatePresence initial={false} mode="wait">
        {openEntry && (
          <motion.div
            key={openEntry.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
            className="mt-4 mx-auto"
          >
            <DetailPanel entry={openEntry} lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

type StepProps = {
  entry: Education;
  lang: Language;
  isAbove: boolean;
  isOpen: boolean;
  onToggle: () => void;
};

function TimelineStep({ entry, lang, isAbove, isOpen, onToggle }: StepProps) {
  const tint = tintFor[entry.kind];

  return (
    <li className="relative flex items-center justify-center" style={{ height: 24 }}>
      {/* Dot positioned on the line */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-label={`${entry.title[lang]} — ${entry.period[lang]}`}
        className="absolute z-10 inline-flex items-center justify-center rounded-full transition-all hover:scale-110 cursor-pointer"
        style={{
          width: isOpen ? 32 : 24,
          height: isOpen ? 32 : 24,
          background: tint,
          color: palette.textPrimary,
          border: `3px solid ${palette.beige}`,
          boxShadow: isOpen
            ? `0 0 0 4px ${tint}80, 0 4px 16px -2px rgba(14,83,77,0.25)`
            : `0 0 0 1.5px ${palette.teal}50`,
          padding: 0,
          fontFamily: tokens.fontBody,
        }}
      >
        {iconFor[entry.kind]}
      </button>

      {/* Header card — above or below the line, alternating */}
      <div
        className="absolute pointer-events-none"
        style={{
          [isAbove ? "bottom" : "top"]: 32,
          width: STEP_WIDTH - 16,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        {/* Connector tick from card to dot */}
        <span
          aria-hidden="true"
          className="absolute"
          style={{
            [isAbove ? "bottom" : "top"]: -8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1,
            height: 8,
            background: `${palette.teal}50`,
          }}
        />
        <p
          className="text-[10px] uppercase tracking-[0.18em] font-semibold"
          style={{ color: palette.textSecondary }}
        >
          {entry.period[lang]}
        </p>
        <p
          className="mt-0.5 leading-tight"
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: isOpen ? 700 : 600,
            fontSize: 13,
            letterSpacing: "-0.01em",
            color: palette.textPrimary,
          }}
        >
          {entry.title[lang].split(" — ")[0]}
          {entry.flag && (
            <span aria-hidden="true" style={{ marginLeft: 4 }}>
              {entry.flag}
            </span>
          )}
        </p>
      </div>
    </li>
  );
}

function DetailPanel({ entry, lang }: { entry: Education; lang: Language }) {
  const tint = tintFor[entry.kind];

  return (
    <div
      className="rounded-3xl px-6 md:px-8 py-6 grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-start"
      style={{
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(14,83,77,0.10)",
      }}
    >
      <div>
        <p
          className="text-xs uppercase tracking-[0.18em] font-semibold mb-2"
          style={{ color: palette.textSecondary }}
        >
          {entry.period[lang]}
        </p>
        <h3
          className="mb-3"
          style={{
            fontFamily: tokens.fontTitle,
            fontWeight: 600,
            fontSize: "clamp(20px, 2vw, 28px)",
            letterSpacing: "-0.02em",
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
          className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full mb-4"
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
            fontSize: 16,
            lineHeight: 1.65,
            color: palette.textPrimary,
          }}
        >
          {entry.description[lang]}
        </p>
      </div>
      <PhotoSlot photoSrc={entry.photoSrc} flag={entry.flag} tint={tint} alt={entry.location} />
    </div>
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
            fontSize: 56,
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

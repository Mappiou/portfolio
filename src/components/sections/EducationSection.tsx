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
  milestone: <Sprout size={16} />,
  exchange: <Plane size={16} />,
  internship: <Briefcase size={16} />,
  degree: <GraduationCap size={16} />,
};

const tintFor: Record<Education["kind"], string> = {
  milestone: palette.mint,
  exchange: palette.lilac,
  internship: palette.rust,
  degree: palette.yellow,
};

const labelKeyFor: Record<Education["kind"], string> = {
  milestone: "education.kind.milestone",
  exchange: "education.kind.exchange",
  internship: "education.kind.internship",
  degree: "education.kind.degree",
};

const TIMELINE_WIDTH = 1700; // total scroll width
const YEAR_START = 2015;
const YEAR_END = 2021;
const YEAR_SPAN = YEAR_END - YEAR_START; // 6
const CARD_WIDTH = 240;

function leftPercent(year: number): number {
  // Map year value (e.g. 2018.5) to a 0-100% horizontal position
  const t = (year - YEAR_START) / YEAR_SPAN;
  return Math.max(0, Math.min(1, t)) * 100;
}

export function EducationSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const entries = [...education].sort((a, b) => a.year - b.year);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openEntry = openIndex !== null ? entries[openIndex] : null;

  const years = Array.from({ length: YEAR_SPAN + 1 }, (_, i) => YEAR_START + i);

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

      {/* Horizontal scrollable area */}
      <div
        className="relative overflow-x-auto overflow-y-hidden -mx-6 px-6"
        style={{
          scrollbarWidth: "thin",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          className="relative mx-auto"
          style={{
            width: TIMELINE_WIDTH,
            minWidth: "100%",
            paddingTop: 0,
            paddingBottom: 0,
          }}
        >
          {/* TOP — Year ribbon (independent reference axis) */}
          <div
            className="relative mb-2"
            style={{
              height: 36,
              paddingLeft: CARD_WIDTH / 2,
              paddingRight: CARD_WIDTH / 2,
            }}
          >
            <div className="relative w-full h-full">
              {/* Year line */}
              <span
                aria-hidden="true"
                className="absolute"
                style={{
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: 1,
                  background: `${palette.teal}25`,
                }}
              />
              {years.map((y) => (
                <div
                  key={y}
                  className="absolute"
                  style={{
                    left: `${leftPercent(y)}%`,
                    top: 0,
                    transform: "translateX(-50%)",
                    textAlign: "center",
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="block mx-auto"
                    style={{
                      width: 1,
                      height: 12,
                      background: `${palette.teal}40`,
                    }}
                  />
                  <span
                    className="text-xs font-mono inline-block mt-1"
                    style={{
                      color: palette.textSecondary,
                      fontWeight: 600,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {y}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MAIN — Event timeline with cards alternating above/below */}
          <div
            className="relative"
            style={{
              height: 420,
              paddingLeft: CARD_WIDTH / 2,
              paddingRight: CARD_WIDTH / 2,
            }}
          >
            <div className="relative w-full h-full">
              {/* Main timeline line */}
              <span
                aria-hidden="true"
                className="absolute"
                style={{
                  top: "50%",
                  left: 0,
                  right: 0,
                  height: 2,
                  transform: "translateY(-1px)",
                  background: `linear-gradient(90deg, ${palette.teal}40 0%, ${palette.teal}60 50%, ${palette.teal}40 100%)`,
                  borderRadius: 2,
                }}
              />

              {entries.map((entry, i) => (
                <TimelineEvent
                  key={entry.id}
                  entry={entry}
                  lang={lang}
                  isAbove={i % 2 === 0}
                  isOpen={openIndex === i}
                  labelKey={labelKeyFor[entry.kind]}
                  onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
                />
              ))}
            </div>
          </div>
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
            className="mt-6 mx-auto"
          >
            <DetailPanel entry={openEntry} lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

type EventProps = {
  entry: Education;
  lang: Language;
  isAbove: boolean;
  isOpen: boolean;
  labelKey: string;
  onToggle: () => void;
};

function TimelineEvent({ entry, lang, isAbove, isOpen, labelKey, onToggle }: EventProps) {
  const { t } = useTranslation();
  const tint = tintFor[entry.kind];
  const left = `${leftPercent(entry.year)}%`;

  return (
    <div
      className="absolute"
      style={{
        left,
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: CARD_WIDTH,
        height: "100%",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Dot — sits on the line */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={`${entry.title[lang]} — ${entry.period[lang]}`}
          className="absolute z-20 inline-flex items-center justify-center rounded-full transition-all hover:scale-110 cursor-pointer"
          style={{
            width: isOpen ? 36 : 28,
            height: isOpen ? 36 : 28,
            background: tint,
            color: palette.textPrimary,
            border: `3px solid ${palette.beige}`,
            boxShadow: isOpen
              ? `0 0 0 5px ${tint}80, 0 4px 16px -2px rgba(14,83,77,0.25)`
              : `0 0 0 1.5px ${palette.teal}50`,
            padding: 0,
            fontFamily: tokens.fontBody,
          }}
        >
          {iconFor[entry.kind]}
        </button>

        {/* Connector tick */}
        <span
          aria-hidden="true"
          className="absolute z-10"
          style={{
            top: isAbove ? "calc(50% - 60px)" : "calc(50% + 18px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: 1,
            height: 42,
            background: `${palette.teal}40`,
          }}
        />

        {/* Card — above or below the line */}
        <div
          className="absolute"
          style={{
            [isAbove ? "bottom" : "top"]: "calc(50% + 60px)",
            left: 0,
            right: 0,
          }}
        >
          <EventCard
            entry={entry}
            lang={lang}
            tint={tint}
            labelKey={labelKey}
            t={t}
            isOpen={isOpen}
            onToggle={onToggle}
          />
        </div>
      </div>
    </div>
  );
}

type EventCardProps = {
  entry: Education;
  lang: Language;
  tint: string;
  labelKey: string;
  t: ReturnType<typeof useTranslation>["t"];
  isOpen: boolean;
  onToggle: () => void;
};

function EventCard({ entry, lang, tint, labelKey, t, isOpen, onToggle }: EventCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full text-center rounded-2xl p-4 transition-all cursor-pointer hover:-translate-y-0.5"
      style={{
        background: isOpen ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: `1px solid ${isOpen ? `${tint}` : "rgba(14,83,77,0.10)"}`,
        boxShadow: isOpen
          ? `0 8px 24px -10px rgba(14,83,77,0.25)`
          : `0 4px 12px -4px rgba(14,83,77,0.06)`,
        fontFamily: tokens.fontBody,
      }}
    >
      <p
        className="text-[10px] uppercase tracking-[0.18em] font-bold mb-2"
        style={{ color: tint, filter: "saturate(2) brightness(0.55)" }}
      >
        {t(labelKey)}
      </p>
      <CardBody entry={entry} lang={lang} />
    </button>
  );
}

function CardBody({ entry, lang }: { entry: Education; lang: Language }) {
  // Different layout per kind
  switch (entry.kind) {
    case "exchange": {
      // Country in HUGE serif + flag emoji
      const country = entry.location;
      return (
        <>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span
              style={{
                fontFamily: tokens.fontTitle,
                fontWeight: 700,
                fontSize: "clamp(28px, 2.8vw, 40px)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: palette.textPrimary,
              }}
            >
              {country}
            </span>
            {entry.flag && (
              <span aria-hidden="true" style={{ fontSize: 32 }}>
                {entry.flag}
              </span>
            )}
          </div>
          <p className="italic text-xs" style={{ color: palette.textSecondary }}>
            {entry.summary[lang]}
          </p>
        </>
      );
    }

    case "internship": {
      // Company name big + location + duration
      const company = entry.school; // "Orange Labs", "Aubay", "Capgemini"
      const duration = entry.period[lang].split("·")[1]?.trim() ?? entry.period[lang];
      return (
        <>
          <p
            className="mb-1"
            style={{
              fontFamily: tokens.fontTitle,
              fontWeight: 700,
              fontSize: "clamp(20px, 2vw, 26px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: palette.textPrimary,
            }}
          >
            {company}
          </p>
          <p
            className="text-xs flex items-center justify-center gap-1.5 mb-1"
            style={{ color: palette.textSecondary }}
          >
            <MapPin size={11} aria-hidden="true" />
            <span>{entry.location.split(",")[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{duration}</span>
          </p>
        </>
      );
    }

    case "degree": {
      // Degree title — split on em-dash, keep the short part
      const fullTitle = entry.title[lang];
      const short = fullTitle.includes(" — ") ? fullTitle.split(" — ")[0] : fullTitle;
      return (
        <>
          <p
            style={{
              fontFamily: tokens.fontTitle,
              fontWeight: 700,
              fontSize: "clamp(18px, 1.8vw, 22px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: palette.textPrimary,
            }}
          >
            {short}
          </p>
          <p className="text-xs mt-1.5 italic" style={{ color: palette.textSecondary }}>
            {entry.school.replace(/^.*— /, "").split(" · ")[0]}
          </p>
        </>
      );
    }

    case "milestone":
    default:
      return (
        <>
          <p
            style={{
              fontFamily: tokens.fontTitle,
              fontWeight: 700,
              fontSize: "clamp(18px, 1.8vw, 22px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              color: palette.textPrimary,
            }}
          >
            {entry.title[lang]}
          </p>
          <p className="text-xs mt-1.5 italic" style={{ color: palette.textSecondary }}>
            {entry.period[lang]}
          </p>
        </>
      );
  }
}

function DetailPanel({ entry, lang }: { entry: Education; lang: Language }) {
  const tint = tintFor[entry.kind];

  return (
    <div
      className="rounded-3xl px-6 md:px-8 py-6 grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-start"
      style={{
        background: "rgba(255,255,255,0.7)",
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
            fontSize: "clamp(22px, 2.2vw, 30px)",
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

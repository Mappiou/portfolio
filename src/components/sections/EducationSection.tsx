import { useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Plane, Sprout, Briefcase, ChevronDown, MapPin } from "lucide-react";
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

const lineGradient = `linear-gradient(180deg, ${palette.teal}30 0%, ${palette.teal}50 50%, ${palette.teal}30 100%)`;

export function EducationSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const [openId, setOpenId] = useState<string | null>(null);

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

      <ol className="relative mx-auto" style={{ maxWidth: 900, listStyle: "none", padding: 0 }}>
        {/* Mobile vertical line — left at 23px */}
        <span
          aria-hidden="true"
          className="absolute md:hidden"
          style={{
            left: 23,
            top: 12,
            bottom: 12,
            width: 2,
            background: lineGradient,
            borderRadius: 2,
          }}
        />
        {/* Desktop vertical line — centered */}
        <span
          aria-hidden="true"
          className="hidden md:block absolute"
          style={{
            left: "50%",
            top: 12,
            bottom: 12,
            width: 2,
            marginLeft: -1,
            background: lineGradient,
            borderRadius: 2,
          }}
        />
        {entries.map((entry, i) => (
          <TimelineEntry
            key={entry.id}
            entry={entry}
            lang={lang}
            isLeft={i % 2 === 0}
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
  isLeft: boolean;
  isOpen: boolean;
  onToggle: () => void;
};

function TimelineEntry({ entry, lang, isLeft, isOpen, onToggle }: EntryProps) {
  const tint = tintFor[entry.kind];
  const panelId = `edu-panel-${entry.id}`;

  return (
    <li className="relative md:grid md:grid-cols-2 md:gap-x-12" style={{ paddingBottom: 28 }}>
      {/* Dot — sits on top of the vertical line */}
      <span
        className="absolute z-10 inline-flex items-center justify-center rounded-full left-3 md:left-1/2 md:-translate-x-1/2"
        style={{
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

      {/* Content cell — col-1 (left) on even index, col-2 (right) on odd */}
      <div
        className={`pl-16 md:pl-0 md:pr-0 ${
          isLeft ? "md:col-start-1 md:text-right" : "md:col-start-2 md:text-left"
        }`}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="w-full rounded-2xl px-4 py-3 transition-all hover:bg-white/40 cursor-pointer"
          style={{
            background: isOpen ? "rgba(255,255,255,0.55)" : "transparent",
            border: 0,
            fontFamily: tokens.fontBody,
            textAlign: isLeft ? "left" : "left", // mobile keeps left-align
          }}
        >
          <div
            className={`flex items-baseline gap-3 flex-wrap ${isLeft ? "md:flex-row-reverse" : ""}`}
          >
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
            className={`mt-1.5 ${isLeft ? "md:text-right" : "md:text-left"}`}
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
            className={`mt-1 italic ${isLeft ? "md:text-right" : "md:text-left"}`}
            style={{
              fontSize: 14,
              color: palette.textSecondary,
              lineHeight: 1.5,
            }}
          >
            {entry.summary[lang]}
          </p>
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
                className="mt-2 px-4 md:px-5 py-5 rounded-2xl text-left"
                style={{
                  background: "rgba(255,255,255,0.55)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(14,83,77,0.10)",
                }}
              >
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
                  className="mb-4"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: palette.textPrimary,
                  }}
                >
                  {entry.description[lang]}
                </p>
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
      </div>
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
          aspectRatio: "16 / 9",
          objectFit: "cover",
          borderRadius: 12,
        }}
      />
    );
  }
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden rounded-xl"
      style={{
        width: "100%",
        aspectRatio: "16 / 9",
        background: `linear-gradient(135deg, ${tint} 0%, rgba(255,255,255,0.4) 100%)`,
      }}
      aria-hidden="true"
    >
      {flag && (
        <span
          style={{
            fontSize: 40,
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

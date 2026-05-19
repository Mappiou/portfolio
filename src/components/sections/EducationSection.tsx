import { useState, useRef, useEffect } from "react";
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
  ChevronDown,
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
  job: <Briefcase size={14} />,
  travel: <Plane size={14} />,
};

// kind-based dot colours, mapped to the warm editorial palette
const tintFor: Record<Education["kind"], string> = {
  milestone: palette.mint,
  degree: palette.mint,
  internship: palette.rust,
  exchange: palette.lilac,
  job: palette.teal,
  travel: palette.yellow,
};

// Card background tints — soft alpha of the kind colour
const cardBgFor: Record<Education["kind"], string> = {
  milestone: "rgba(199, 192, 168, 0.32)", // mint warm
  degree: "rgba(199, 192, 168, 0.32)",
  internship: "rgba(160, 74, 45, 0.16)", // rust
  exchange: "rgba(212, 181, 199, 0.36)", // lilac
  job: "rgba(184, 92, 58, 0.16)", // teal/terracotta
  travel: "rgba(232, 215, 79, 0.24)", // yellow
};

const cardBgOpenFor: Record<Education["kind"], string> = {
  milestone: "rgba(199, 192, 168, 0.55)",
  degree: "rgba(199, 192, 168, 0.55)",
  internship: "rgba(160, 74, 45, 0.28)",
  exchange: "rgba(212, 181, 199, 0.58)",
  job: "rgba(184, 92, 58, 0.28)",
  travel: "rgba(232, 215, 79, 0.42)",
};

const TIMELINE_WIDTH = 2800;
const YEAR_START = 2015;
const YEAR_END = 2026;
const YEAR_SPAN = YEAR_END - YEAR_START;
const CARD_WIDTH = 200;

function leftPercent(year: number): number {
  const t = (year - YEAR_START) / YEAR_SPAN;
  return Math.max(0, Math.min(1, t)) * 100;
}

export function EducationSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const entries = [...education].sort((a, b) => a.year - b.year);
  const initialIndex = Math.max(
    0,
    entries.findIndex((e) => e.id === "exchange-china"),
  );
  const [openIndex, setOpenIndex] = useState<number>(initialIndex);
  const [edgePad, setEdgePad] = useState(0);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isProgrammaticRef = useRef(false);
  const programmaticTimerRef = useRef<number | null>(null);
  const centeredRef = useRef(false);

  const computeActiveIndex = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const pad = Math.max(0, scroller.clientWidth / 2 - CARD_WIDTH / 2);
    const innerStart = pad + CARD_WIDTH / 2;
    const usableWidth = Math.max(1, TIMELINE_WIDTH - CARD_WIDTH);
    const scrollCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    const ratio = Math.max(0, Math.min(1, (scrollCenter - innerStart) / usableWidth));
    const yearAtCenter = YEAR_START + ratio * YEAR_SPAN;
    let closest = 0;
    let minDist = Infinity;
    entries.forEach((entry, i) => {
      const dist = Math.abs(entry.year - yearAtCenter);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setOpenIndex(closest);
  };

  const onScroll = () => {
    if (isProgrammaticRef.current) return;
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      computeActiveIndex();
    });
  };

  useEffect(() => {
    const update = () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const pad = Math.max(0, scroller.clientWidth / 2 - CARD_WIDTH / 2);
      setEdgePad(pad);
    };
    update();
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (programmaticTimerRef.current !== null) {
        window.clearTimeout(programmaticTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (edgePad === 0 || centeredRef.current) return;
    centeredRef.current = true;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const entry = entries[initialIndex];
    if (!entry) return;
    const innerStart = edgePad + CARD_WIDTH / 2;
    const usableWidth = TIMELINE_WIDTH - CARD_WIDTH;
    const targetCenter = innerStart + ((entry.year - YEAR_START) / YEAR_SPAN) * usableWidth;
    scroller.scrollLeft = Math.max(0, targetCenter - scroller.clientWidth / 2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgePad]);

  const scrollToEntry = (index: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const entry = entries[index];
    if (!entry) return;
    const pad = Math.max(0, scroller.clientWidth / 2 - CARD_WIDTH / 2);
    const innerStart = pad + CARD_WIDTH / 2;
    const usableWidth = TIMELINE_WIDTH - CARD_WIDTH;
    const targetCenter = innerStart + ((entry.year - YEAR_START) / YEAR_SPAN) * usableWidth;
    setOpenIndex(index);
    isProgrammaticRef.current = true;
    scroller.scrollTo({
      left: Math.max(0, targetCenter - scroller.clientWidth / 2),
      behavior: "smooth",
    });
    if (programmaticTimerRef.current !== null) {
      window.clearTimeout(programmaticTimerRef.current);
    }
    programmaticTimerRef.current = window.setTimeout(() => {
      isProgrammaticRef.current = false;
    }, 700);
  };

  const openEntry = entries[openIndex];

  const years = Array.from({ length: YEAR_SPAN + 1 }, (_, i) => YEAR_START + i);

  return (
    <section
      id="education"
      className="relative z-10 mx-auto px-6 md:px-10"
      style={{
        maxWidth: tokens.pageMaxWidth,
        paddingTop: "clamp(48px, 7vw, 88px)",
        paddingBottom: "clamp(48px, 7vw, 88px)",
      }}
      aria-labelledby="education-heading"
    >
      <div
        className="flex items-baseline justify-between mb-8 pb-5"
        style={{ borderBottom: `1px solid ${palette.hairline}` }}
      >
        <h2
          id="education-heading"
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
            i18nKey="education.title"
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
          § {t("education.kicker").toUpperCase()}
        </span>
      </div>

      <p
        className="text-sm mb-6 flex items-center gap-2"
        style={{
          color: palette.textSecondary,
          fontFamily: tokens.fontItalic,
          fontStyle: "italic",
        }}
      >
        <ChevronLeft size={14} aria-hidden="true" />
        <span>{t("education.expandHint")}</span>
        <ChevronRight size={14} aria-hidden="true" />
      </p>

      <div
        className="relative"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: palette.beige,
          paddingTop: 8,
          paddingBottom: 8,
          borderBottom: `1px solid ${palette.hairline}`,
        }}
      >
        <div
          ref={scrollerRef}
          onScroll={onScroll}
          className="relative overflow-x-auto overflow-y-hidden -mx-6 px-6"
          style={{
            scrollbarWidth: "thin",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <div className="flex" style={{ width: "max-content" }}>
            <div aria-hidden="true" className="shrink-0" style={{ width: edgePad }} />
            <div
              className="relative shrink-0"
              style={{
                width: TIMELINE_WIDTH,
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              {/* TOP — Year ribbon */}
              <div
                className="relative mb-1"
                style={{
                  height: 24,
                  paddingLeft: CARD_WIDTH / 2,
                  paddingRight: CARD_WIDTH / 2,
                }}
              >
                <div className="relative w-full h-full">
                  <span
                    aria-hidden="true"
                    className="absolute"
                    style={{
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: 1,
                      background: palette.hairline,
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
                          height: 8,
                          background: palette.hairlineStrong,
                        }}
                      />
                      <span
                        className="inline-block mt-0.5"
                        style={{
                          fontFamily: tokens.fontMono,
                          fontSize: 9,
                          color: palette.textSecondary,
                          fontWeight: 400,
                          letterSpacing: "0.08em",
                        }}
                      >
                        {y}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* MAIN — Event timeline */}
              <div
                className="relative"
                style={{
                  height: 160,
                  paddingLeft: CARD_WIDTH / 2,
                  paddingRight: CARD_WIDTH / 2,
                }}
              >
                <div className="relative w-full h-full">
                  <span
                    aria-hidden="true"
                    className="absolute"
                    style={{
                      top: "50%",
                      left: 0,
                      right: 0,
                      height: 1,
                      transform: "translateY(-0.5px)",
                      background: palette.hairlineStrong,
                    }}
                  />

                  {entries.map((entry, i) => (
                    <TimelineEvent
                      key={entry.id}
                      entry={entry}
                      lang={lang}
                      isAbove={i % 2 === 0}
                      isOpen={openIndex === i}
                      onToggle={() => scrollToEntry(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="shrink-0" style={{ width: edgePad }} />
          </div>
        </div>

        {/* Cursor overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{
            top: 0,
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 1,
            background: `linear-gradient(180deg, rgba(184,92,58,0) 0%, rgba(184,92,58,0.35) 18%, rgba(184,92,58,0.65) 50%, rgba(184,92,58,0.35) 82%, rgba(184,92,58,0) 100%)`,
            zIndex: 25,
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute flex items-center justify-center rounded-full"
          style={{
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 26,
            height: 26,
            background: palette.teal,
            color: palette.cream,
            boxShadow: `0 4px 12px -2px rgba(184,92,58,0.45)`,
            zIndex: 26,
          }}
        >
          <ChevronDown size={14} strokeWidth={2.5} />
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {openEntry && (
          <motion.div
            key={openEntry.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
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
  onToggle: () => void;
};

function TimelineEvent({ entry, lang, isAbove, isOpen, onToggle }: EventProps) {
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
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={`${entry.title[lang]} — ${entry.period[lang]}`}
          className="absolute z-20 inline-flex items-center justify-center rounded-full transition-all hover:scale-110 cursor-pointer"
          style={{
            width: isOpen ? 22 : 18,
            height: isOpen ? 22 : 18,
            background: tint,
            color: palette.textPrimary,
            border: `2px solid ${palette.beige}`,
            boxShadow: isOpen
              ? `0 0 0 3px ${palette.teal}33, 0 3px 12px -2px rgba(31,26,20,0.18)`
              : `0 0 0 1px ${palette.hairlineStrong}`,
            padding: 0,
            fontFamily: tokens.fontBody,
          }}
        >
          {iconFor[entry.kind]}
        </button>

        <span
          aria-hidden="true"
          className="absolute z-10"
          style={{
            top: isAbove ? "calc(50% - 22px)" : "calc(50% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            width: 1,
            height: 14,
            background: palette.hairlineStrong,
          }}
        />

        <div
          className="absolute"
          style={{
            [isAbove ? "bottom" : "top"]: "calc(50% + 24px)",
            left: 0,
            right: 0,
          }}
        >
          <EventCard
            entry={entry}
            lang={lang}
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
  isOpen: boolean;
  onToggle: () => void;
};

function EventCard({ entry, lang, isOpen, onToggle }: EventCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full text-center transition-all cursor-pointer hover:-translate-y-0.5"
      style={{
        background: isOpen ? cardBgOpenFor[entry.kind] : cardBgFor[entry.kind],
        border: `1px solid ${isOpen ? palette.hairlineStrong : palette.hairline}`,
        boxShadow: isOpen ? `0 6px 18px -10px rgba(31,26,20,0.25)` : "none",
        fontFamily: tokens.fontBody,
        borderRadius: 6,
        padding: "8px 10px",
      }}
    >
      <CardBody entry={entry} lang={lang} />
    </button>
  );
}

function CardBody({ entry, lang }: { entry: Education; lang: Language }) {
  const label = entry.shortTitle?.[lang] ?? entry.title[lang];
  const subtitle = entry.shortSubtitle?.[lang];
  return (
    <>
      <p
        style={{
          fontFamily: tokens.fontBody,
          fontWeight: 600,
          fontSize: 12,
          lineHeight: 1.2,
          letterSpacing: "-0.005em",
          color: palette.textPrimary,
          margin: 0,
        }}
      >
        {label}
        {entry.flag && (
          <span aria-hidden="true" style={{ marginLeft: 4 }}>
            {entry.flag}
          </span>
        )}
      </p>
      {subtitle && (
        <p
          style={{
            fontFamily: tokens.fontItalic,
            fontStyle: "italic",
            fontSize: 11,
            lineHeight: 1.25,
            color: palette.textSecondary,
            marginTop: 2,
          }}
        >
          {subtitle}
        </p>
      )}
    </>
  );
}

function DetailPanel({ entry, lang }: { entry: Education; lang: Language }) {
  const tint = tintFor[entry.kind];

  return (
    <div
      className="px-6 md:px-8 py-7 grid grid-cols-1 md:grid-cols-[1fr_240px] gap-6 items-start"
      style={{
        background: palette.cream,
        border: `1px solid ${palette.hairline}`,
        borderRadius: 6,
      }}
    >
      <div>
        <p
          className="mb-2"
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.teal,
            fontWeight: 500,
          }}
        >
          {entry.period[lang]}
        </p>
        <h3
          className="mb-3"
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(26px, 2.5vw, 34px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: palette.textPrimary,
            margin: 0,
            marginBottom: 12,
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
          className="inline-flex items-center gap-1.5 mb-5"
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: palette.textSecondary,
          }}
        >
          <MapPin size={12} aria-hidden="true" />
          {entry.school[lang]} · {entry.location[lang]}
        </p>
        <p
          style={{
            fontSize: 16,
            lineHeight: 1.7,
            color: palette.textPrimary,
          }}
        >
          {entry.description[lang]}
        </p>
        {entry.bullets && entry.bullets.length > 0 && (
          <ul className="mt-4 space-y-1.5" style={{ color: palette.textPrimary }}>
            {entry.bullets.map((b, idx) => (
              <li
                key={idx}
                className="flex gap-2"
                style={{ fontSize: 14, lineHeight: 1.55 }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    color: palette.teal,
                    fontFamily: tokens.fontMono,
                    flexShrink: 0,
                  }}
                >
                  ›
                </span>
                <span>{b[lang]}</span>
              </li>
            ))}
          </ul>
        )}
        {entry.stack && entry.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {entry.stack.map((s) => (
              <span
                key={s}
                style={{
                  fontFamily: tokens.fontMono,
                  fontSize: 10,
                  letterSpacing: "0.08em",
                  padding: "3px 8px",
                  border: `1px solid ${palette.hairline}`,
                  borderRadius: 4,
                  color: palette.textSecondary,
                  background: palette.beige,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
      <PhotoSlot
        photoSrc={entry.photoSrc}
        flag={entry.flag}
        tint={tint}
        alt={entry.location[lang]}
        seed={entry.id}
      />
    </div>
  );
}

function PhotoSlot({
  photoSrc,
  flag,
  tint,
  alt,
  seed,
}: {
  photoSrc?: string;
  flag?: string;
  tint: string;
  alt: string;
  seed: string;
}) {
  const src = photoSrc ?? `https://picsum.photos/seed/edu-${seed}/600/600`;
  return (
    <div className="overflow-hidden" style={{ width: "100%", aspectRatio: "1 / 1" }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "sepia(8%) saturate(110%)",
        }}
      />
      {flag && (
        <span
          aria-hidden="true"
          className="absolute"
          style={{
            display: "none",
            color: tint,
          }}
        >
          {flag}
        </span>
      )}
    </div>
  );
}

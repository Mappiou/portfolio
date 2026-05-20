import { useState, useRef, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { palette, tokens } from "../../styles/palette";
import { travels } from "../../data/travels";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import type { Travel } from "../../data/types";
import type { Language } from "../../i18n";

const tintFor: Record<Travel["region"], string> = {
  asia: palette.rust,
  amazon: palette.mint,
  andes: palette.lilac,
  altiplano: palette.yellow,
  atacama: palette.teal,
  "cone-sud": palette.lilac,
  brazil: palette.yellow,
  mexico: palette.rust,
};

const cardBgFor: Record<Travel["region"], string> = {
  asia: "rgba(160, 74, 45, 0.16)",
  amazon: "rgba(199, 192, 168, 0.32)",
  andes: "rgba(212, 181, 199, 0.36)",
  altiplano: "rgba(232, 215, 79, 0.24)",
  atacama: "rgba(184, 92, 58, 0.16)",
  "cone-sud": "rgba(212, 181, 199, 0.36)",
  brazil: "rgba(232, 215, 79, 0.24)",
  mexico: "rgba(160, 74, 45, 0.16)",
};

const cardBgOpenFor: Record<Travel["region"], string> = {
  asia: "rgba(160, 74, 45, 0.28)",
  amazon: "rgba(199, 192, 168, 0.55)",
  andes: "rgba(212, 181, 199, 0.58)",
  altiplano: "rgba(232, 215, 79, 0.42)",
  atacama: "rgba(184, 92, 58, 0.28)",
  "cone-sud": "rgba(212, 181, 199, 0.58)",
  brazil: "rgba(232, 215, 79, 0.42)",
  mexico: "rgba(160, 74, 45, 0.28)",
};

const TIMELINE_WIDTH = 2800;
const MONTH_START = 2;
const MONTH_END = 13;
const MONTH_SPAN = MONTH_END - MONTH_START;
const CARD_WIDTH = 220;

const monthTicks: { offset: number; label: string }[] = [
  { offset: 2, label: "Mar 23" },
  { offset: 3, label: "Avr" },
  { offset: 4, label: "Mai" },
  { offset: 5, label: "Juin" },
  { offset: 6, label: "Juil" },
  { offset: 7, label: "Août" },
  { offset: 8, label: "Sep" },
  { offset: 9, label: "Oct" },
  { offset: 10, label: "Nov" },
  { offset: 11, label: "Déc" },
  { offset: 12, label: "Jan 24" },
  { offset: 13, label: "Fév" },
];

function leftPercent(offset: number): number {
  const t = (offset - MONTH_START) / MONTH_SPAN;
  return Math.max(0, Math.min(1, t)) * 100;
}

export function TravelSection() {
  const { t } = useTranslation();
  const lang = useLanguageRoute();
  const entries = [...travels].sort((a, b) => a.monthOffset - b.monthOffset);
  const initialIndex = Math.max(0, entries.findIndex((e) => e.id === "peru"));
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
    const offsetAtCenter = MONTH_START + ratio * MONTH_SPAN;
    let closest = 0;
    let minDist = Infinity;
    entries.forEach((entry, i) => {
      const dist = Math.abs(entry.monthOffset - offsetAtCenter);
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
    const targetCenter =
      innerStart + ((entry.monthOffset - MONTH_START) / MONTH_SPAN) * usableWidth;
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
    const targetCenter =
      innerStart + ((entry.monthOffset - MONTH_START) / MONTH_SPAN) * usableWidth;
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

  return (
    <section
      id="travels"
      className="relative z-10 mx-auto px-6 md:px-10"
      style={{
        maxWidth: tokens.pageMaxWidth,
        paddingTop: "clamp(48px, 7vw, 88px)",
        paddingBottom: "clamp(48px, 7vw, 88px)",
      }}
      aria-labelledby="travels-heading"
    >
      <div
        className="flex items-baseline justify-between mb-8 pb-5"
        style={{ borderBottom: `1px solid ${palette.hairline}` }}
      >
        <h2
          id="travels-heading"
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
            i18nKey="travels.title"
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
          § {t("travels.kicker").toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 md:gap-10 mb-8">
        <p
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: palette.teal,
            margin: 0,
          }}
        >
          {t("travels.prologueLabel")} ·{" "}
          {t("travels.stops", { count: entries.length })}
        </p>
        <p
          style={{
            fontFamily: tokens.fontTitle,
            fontSize: "clamp(18px, 1.6vw, 22px)",
            lineHeight: 1.55,
            color: palette.textPrimary,
            margin: 0,
            maxWidth: 720,
          }}
        >
          {t("travels.prologue")}
        </p>
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
        <span>{t("travels.expandHint")}</span>
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
              {/* TOP — Month ribbon */}
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
                  {monthTicks.map((tick) => (
                    <div
                      key={tick.offset}
                      className="absolute"
                      style={{
                        left: `${leftPercent(tick.offset)}%`,
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
                          whiteSpace: "nowrap",
                        }}
                      >
                        {tick.label}
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
                    <TimelineStop
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
            <DetailPanel entry={openEntry} lang={lang} t={t} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

type StopProps = {
  entry: Travel;
  lang: Language;
  isAbove: boolean;
  isOpen: boolean;
  onToggle: () => void;
};

function TimelineStop({ entry, lang, isAbove, isOpen, onToggle }: StopProps) {
  const tint = tintFor[entry.region];
  const left = `${leftPercent(entry.monthOffset)}%`;

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
          aria-label={`${entry.country[lang]} — ${entry.period[lang]}`}
          className="absolute z-20 inline-flex items-center justify-center rounded-full transition-all hover:scale-110 cursor-pointer"
          style={{
            width: isOpen ? 24 : 18,
            height: isOpen ? 24 : 18,
            background: tint,
            color: palette.textPrimary,
            border: `2px solid ${palette.beige}`,
            boxShadow: isOpen
              ? `0 0 0 3px ${palette.teal}33, 0 3px 12px -2px rgba(31,26,20,0.18)`
              : `0 0 0 1px ${palette.hairlineStrong}`,
            padding: 0,
            fontFamily: tokens.fontBody,
            fontSize: 11,
          }}
        >
          <span aria-hidden="true">{entry.flag}</span>
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
          <StopCard entry={entry} lang={lang} isOpen={isOpen} onToggle={onToggle} />
        </div>
      </div>
    </div>
  );
}

type StopCardProps = {
  entry: Travel;
  lang: Language;
  isOpen: boolean;
  onToggle: () => void;
};

function StopCard({ entry, lang, isOpen, onToggle }: StopCardProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full text-center transition-all cursor-pointer hover:-translate-y-0.5"
      style={{
        background: isOpen ? cardBgOpenFor[entry.region] : cardBgFor[entry.region],
        border: `1px solid ${isOpen ? palette.hairlineStrong : palette.hairline}`,
        boxShadow: isOpen ? `0 6px 18px -10px rgba(31,26,20,0.25)` : "none",
        fontFamily: tokens.fontBody,
        borderRadius: 6,
        padding: "8px 10px",
      }}
    >
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
        {entry.country[lang]}
        <span aria-hidden="true" style={{ marginLeft: 4 }}>
          {entry.flag}
        </span>
      </p>
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
        {entry.period[lang]}
      </p>
    </button>
  );
}

function DetailPanel({
  entry,
  lang,
  t,
}: {
  entry: Travel;
  lang: Language;
  t: (k: string) => string;
}) {
  const tint = tintFor[entry.region];

  const thumbs = entry.photos.slice(1, 4);

  return (
    <div
      className="px-6 md:px-8 py-7 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 items-stretch"
      style={{
        background: palette.cream,
        border: `1px solid ${palette.hairline}`,
        borderRadius: 6,
      }}
    >
      <div className="flex flex-col">
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
            fontSize: "clamp(28px, 2.6vw, 38px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            color: palette.textPrimary,
            margin: 0,
            marginBottom: 12,
          }}
        >
          {entry.country[lang]}
          <span aria-hidden="true" style={{ marginLeft: 10, fontSize: "0.85em" }}>
            {entry.flag}
          </span>
        </h3>
        {entry.origin && (
          <p
            className="inline-flex items-center gap-1.5 mb-3"
            style={{
              fontFamily: tokens.fontMono,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: palette.textSecondary,
            }}
          >
            <MapPin size={12} aria-hidden="true" />
            {t("travels.originLabel")} · {entry.origin[lang]}
          </p>
        )}
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: palette.textPrimary,
            maxWidth: 540,
          }}
        >
          {entry.description[lang]}
        </p>
        {entry.highlights.length > 0 && (
          <div className="mt-4">
            <p
              className="mb-2"
              style={{
                fontFamily: tokens.fontMono,
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: palette.textSecondary,
              }}
            >
              § {t("travels.highlightsLabel")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {entry.highlights.map((h, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: tokens.fontMono,
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    padding: "4px 9px",
                    border: `1px solid ${palette.hairline}`,
                    borderRadius: 4,
                    color: palette.textSecondary,
                    background: palette.beige,
                  }}
                >
                  {h[lang]}
                </span>
              ))}
            </div>
          </div>
        )}
        {thumbs.length > 0 && (
          <div
            className="mt-6 grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${thumbs.length}, minmax(0, 1fr))`,
              maxWidth: 540,
            }}
          >
            {thumbs.map((p, idx) => {
              const src = p.src ?? `https://picsum.photos/seed/${p.seed}/480/480`;
              const a = p.caption?.[lang] ?? `${entry.country[lang]} — ${idx + 2}`;
              return (
                <div
                  key={p.seed}
                  className="overflow-hidden relative"
                  style={{ width: "100%", aspectRatio: "1 / 1" }}
                >
                  <img
                    src={src}
                    alt={a}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: "sepia(10%) saturate(110%)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <PhotoHero
        photo={entry.photos[0]}
        flag={entry.flag}
        tint={tint}
        alt={entry.country[lang]}
        lang={lang}
      />
    </div>
  );
}

function PhotoHero({
  photo,
  flag,
  tint,
  alt,
  lang,
}: {
  photo: Travel["photos"][number];
  flag: string;
  tint: string;
  alt: string;
  lang: Language;
}) {
  const src = photo.src ?? `https://picsum.photos/seed/${photo.seed}/720/960`;
  const heroAlt = photo.caption?.[lang] ?? alt;

  return (
    <div
      className="overflow-hidden relative"
      style={{ width: "100%", height: "100%", minHeight: 380 }}
    >
      <img
        src={src}
        alt={heroAlt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "sepia(10%) saturate(110%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute"
        style={{
          left: 14,
          bottom: 12,
          fontSize: 28,
          textShadow: "0 2px 6px rgba(0,0,0,0.35)",
          color: tint,
        }}
      >
        {flag}
      </span>
    </div>
  );
}


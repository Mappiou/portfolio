import { useState, useRef, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { palette, tokens } from "../../styles/palette";
import { travels } from "../../data/travels";
import { useLanguageRoute } from "../../hooks/useLanguageRoute";
import { ChapterCard } from "../ui/ChapterCard";
import type { Travel } from "../../data/types";
import type { Language } from "../../i18n";

const tintFor: Record<Travel["region"], string> = {
  asia: palette.rust,
  amazon: palette.mint,
  andes: palette.lilac,
  altiplano: palette.teal,
  atacama: palette.mint,
  "cone-sud": palette.lilac,
  brazil: palette.teal,
  mexico: palette.rust,
};

const cardBgFor: Record<Travel["region"], string> = {
  asia: "rgba(201, 122, 92, 0.10)",
  amazon: "rgba(111, 168, 144, 0.10)",
  andes: "rgba(168, 155, 176, 0.12)",
  altiplano: "rgba(217, 166, 72, 0.10)",
  atacama: "rgba(111, 168, 144, 0.10)",
  "cone-sud": "rgba(168, 155, 176, 0.12)",
  brazil: "rgba(217, 166, 72, 0.10)",
  mexico: "rgba(201, 122, 92, 0.10)",
};

const cardBgOpenFor: Record<Travel["region"], string> = {
  asia: "rgba(201, 122, 92, 0.22)",
  amazon: "rgba(111, 168, 144, 0.22)",
  andes: "rgba(168, 155, 176, 0.26)",
  altiplano: "rgba(217, 166, 72, 0.22)",
  atacama: "rgba(111, 168, 144, 0.22)",
  "cone-sud": "rgba(168, 155, 176, 0.26)",
  brazil: "rgba(217, 166, 72, 0.22)",
  mexico: "rgba(201, 122, 92, 0.22)",
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

const lineColor = "rgba(239,233,221,0.12)";
const lineStrong = "rgba(239,233,221,0.22)";

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
    <section id="travels" className="relative w-full" aria-labelledby="travels-heading">
      <ChapterCard
        chapter="CHAPITRE 04"
        bgSrc="https://picsum.photos/seed/travel-cinema-hero/1800/600"
        headingId="travels-heading"
        title={
          <>
            <Trans
              i18nKey="travels.title"
              components={{
                italic: <span style={{ fontStyle: "italic" }} />,
              }}
            />
            <span style={{ color: palette.teal }}>.</span>
          </>
        }
      />

      <div
        className="relative mx-auto px-6"
        style={{ padding: "70px 24px 126px", maxWidth: tokens.pageMaxWidth }}
      >
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-12 mb-12">
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
              fontStyle: "italic",
              fontSize: "clamp(20px, 2vw, 26px)",
              lineHeight: 1.55,
              color: palette.textPrimary,
              opacity: 0.85,
              margin: 0,
              maxWidth: 720,
            }}
          >
            {t("travels.prologue")}
          </p>
        </div>

        <p
          className="text-center mb-10 flex items-center justify-center gap-2"
          style={{
            fontFamily: tokens.fontTitle,
            fontStyle: "italic",
            fontSize: 18,
            color: palette.textSecondary,
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
            background: "#0e0d0b",
            paddingTop: 8,
            paddingBottom: 8,
            borderBottom: "1px solid rgba(239,233,221,0.12)",
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
                <div
                  className="relative mb-2"
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
                        background: lineColor,
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
                            height: 10,
                            background: lineStrong,
                          }}
                        />
                        <span
                          className="inline-block mt-1"
                          style={{
                            fontFamily: tokens.fontMono,
                            fontSize: 10,
                            color: palette.textSecondary,
                            letterSpacing: "0.14em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {tick.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

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
                        background: lineStrong,
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

          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              top: 0,
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 1,
              background:
                "linear-gradient(180deg, rgba(217,166,72,0) 0%, rgba(217,166,72,0.3) 15%, rgba(217,166,72,0.65) 50%, rgba(217,166,72,0.3) 85%, rgba(217,166,72,0) 100%)",
              zIndex: 25,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute flex items-center justify-center"
            style={{
              top: 6,
              left: "50%",
              transform: "translateX(-50%)",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: palette.teal,
              color: palette.beige,
              boxShadow: "0 4px 16px rgba(217,166,72,0.45)",
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
      </div>
    </section>
  );

  function TimelineStop({
    entry,
    lang,
    isAbove,
    isOpen,
    onToggle,
  }: {
    entry: Travel;
    lang: Language;
    isAbove: boolean;
    isOpen: boolean;
    onToggle: () => void;
  }) {
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
              width: isOpen ? 28 : 22,
              height: isOpen ? 28 : 22,
              background: tint,
              color: palette.beige,
              border: `2px solid ${palette.beige}`,
              boxShadow: isOpen
                ? `0 0 0 4px ${tint}55, 0 4px 16px -2px rgba(0,0,0,0.5)`
                : `0 0 0 1px rgba(239,233,221,0.18)`,
              padding: 0,
              fontFamily: tokens.fontBody,
              fontSize: 12,
            }}
          >
            <span aria-hidden="true">{entry.flag}</span>
          </button>

          <span
            aria-hidden="true"
            className="absolute z-10"
            style={{
              top: isAbove ? "calc(50% - 28px)" : "calc(50% + 12px)",
              left: "50%",
              transform: "translateX(-50%)",
              width: 1,
              height: 18,
              background: "rgba(239,233,221,0.18)",
            }}
          />

          <div
            className="absolute"
            style={{
              [isAbove ? "bottom" : "top"]: "calc(50% + 30px)",
              left: 0,
              right: 0,
            }}
          >
            <StopCard entry={entry} lang={lang} tint={tint} isOpen={isOpen} onToggle={onToggle} />
          </div>
        </div>
      </div>
    );
  }

  function StopCard({
    entry,
    lang,
    tint,
    isOpen,
    onToggle,
  }: {
    entry: Travel;
    lang: Language;
    tint: string;
    isOpen: boolean;
    onToggle: () => void;
  }) {
    return (
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-center transition-all cursor-pointer hover:-translate-y-0.5"
        style={{
          padding: "8px 10px",
          background: isOpen ? cardBgOpenFor[entry.region] : cardBgFor[entry.region],
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          border: `1px solid ${isOpen ? tint : "rgba(239,233,221,0.14)"}`,
          fontFamily: tokens.fontBody,
        }}
      >
        <p
          style={{
            fontFamily: tokens.fontBody,
            fontWeight: 500,
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
            fontFamily: tokens.fontTitle,
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
      className="px-6 md:px-8 py-7 grid grid-cols-1 md:grid-cols-[1fr_360px] gap-8 items-start"
      style={{
        background: "rgba(239,233,221,0.04)",
        border: "1px solid rgba(239,233,221,0.12)",
      }}
    >
      <div className="flex flex-col">
        <p
          style={{
            fontFamily: tokens.fontMono,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: palette.textSecondary,
            marginBottom: 12,
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
            fontSize: "clamp(28px, 2.8vw, 40px)",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            color: palette.teal,
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
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: palette.textSecondary,
            }}
          >
            <MapPin size={11} aria-hidden="true" />
            {t("travels.originLabel")} · {entry.origin[lang]}
          </p>
        )}
        <p
          style={{
            fontFamily: tokens.fontBody,
            fontWeight: 300,
            fontSize: 15,
            lineHeight: 1.65,
            color: palette.textPrimary,
            opacity: 0.85,
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
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: palette.textSecondary,
              }}
            >
              § {t("travels.highlightsLabel")}
            </p>
            <ul
              className="flex flex-wrap gap-1.5"
              style={{ listStyle: "none", paddingLeft: 0 }}
            >
              {entry.highlights.map((h, idx) => (
                <li
                  key={idx}
                  style={{
                    fontFamily: tokens.fontMono,
                    fontSize: 10,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: palette.textSecondary,
                    padding: "4px 9px",
                    border: `1px solid ${tint}55`,
                    background: "rgba(239,233,221,0.04)",
                  }}
                >
                  {h[lang]}
                </li>
              ))}
            </ul>
          </div>
        )}
        {thumbs.length > 0 && (
          <div
            className="mt-6 grid gap-2"
            style={{
              gridTemplateColumns: `repeat(${thumbs.length}, minmax(0, 1fr))`,
              maxWidth: 320,
            }}
          >
            {thumbs.map((p, idx) => {
              const src = p.src ?? `https://picsum.photos/seed/${p.seed}/240/240`;
              const a = p.caption?.[lang] ?? `${entry.country[lang]} — ${idx + 2}`;
              return (
                <div
                  key={p.seed}
                  className="cinema-frame relative"
                  style={{ width: "100%", aspectRatio: "1 / 1" }}
                >
                  <img src={src} alt={a} />
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
  const src = photo.src ?? `https://picsum.photos/seed/${photo.seed}/720/720`;
  const heroAlt = photo.caption?.[lang] ?? alt;

  return (
    <div
      className="cinema-frame relative"
      style={{ width: "100%", aspectRatio: "1 / 1" }}
    >
      <img src={src} alt={heroAlt} />
      <span
        aria-hidden="true"
        className="absolute"
        style={{
          left: 14,
          bottom: 12,
          fontSize: 28,
          color: tint,
          filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.5))",
          zIndex: 3,
        }}
      >
        {flag}
      </span>
    </div>
  );
}
